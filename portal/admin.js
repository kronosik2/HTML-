// ========== admin.js - Админ-панель (безопасная версия) ==========

async function loadAdminPanel() {
    const container = document.getElementById('adminTableContainer');
    if (!container) return;
    
    container.innerHTML = '<div style="text-align:center; padding:20px;">Загрузка данных...</div>';
    
    try {
        const users = await getAllUsers();
        console.log('Пользователи:', users);
        
        if (!users || users.length === 0) {
            container.innerHTML = '<p>Нет зарегистрированных стажёров</p>';
            return;
        }
        
        const html = `
            <div style="margin-bottom:16px;">
                <button id="tabTrainingBtn" class="btn-primary" style="margin-right:12px;">📚 Обучение</button>
                <button id="tabAdaptationBtn" class="btn-primary">📊 Адаптация</button>
            </div>
            <div id="trainingTab">${renderTrainingAdminTable(users)}</div>
            <div id="adaptationTab" style="display:none;">${renderAdaptationAdminTable(users)}</div>
        `;
        container.innerHTML = html;
        
        document.getElementById('tabTrainingBtn').onclick = () => {
            document.getElementById('trainingTab').style.display = 'block';
            document.getElementById('adaptationTab').style.display = 'none';
        };
        document.getElementById('tabAdaptationBtn').onclick = () => {
            document.getElementById('trainingTab').style.display = 'none';
            document.getElementById('adaptationTab').style.display = 'block';
        };
        
        initTrainingAdminHandlers();
        initAdaptationAdminHandlers();
        
    } catch (error) {
        console.error('Ошибка:', error);
        container.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
    }
}

function renderTrainingAdminTable(users) {
    let html = `
        <table class="admin-table">
            <thead>
                <tr><th>ФИО</th><th>Телефон</th><th>Блоков</th><th>Ср. оценка</th><th>Обучение пройдено</th><th>Допуск</th><th>Дата допуска</th></tr>
            </thead>
            <tbody>
    `;
    
    for (const user of users) {
        const blocksCompleted = user.blocks_completed || 0;
        const trainingCompleted = blocksCompleted >= 6;
        const isAccepted = user.accepted === true || user.accepted === 'true';
        const acceptedDate = user.accepted_date || '';
        const name = user.name || '—';
        const phone = user.phone || '—';
        const avgGrade = user.avg_grade || 0;
        
        html += `
            <tr data-phone="${phone}">
                <td>${name}</td>
                <td>${phone}</td>
                <td>${blocksCompleted}/6</td>
                <td>${avgGrade}</td>
                <td>${trainingCompleted ? '✅ Да' : '❌ Нет'}</td>
                <td><input type="checkbox" class="accept-checkbox" data-phone="${phone}" ${isAccepted ? 'checked' : ''} ${!trainingCompleted ? 'disabled' : ''}></td>
                <td><input type="date" class="accept-date" data-phone="${phone}" value="${acceptedDate}" ${!trainingCompleted ? 'disabled' : ''}></td>
            </tr>
        `;
    }
    
    html += '</tbody></table>';
    return html;
}

function initTrainingAdminHandlers() {
    document.querySelectorAll('.accept-checkbox').forEach(cb => {
        cb.onchange = async () => {
            const phone = cb.dataset.phone;
            const accepted = cb.checked;
            const row = cb.closest('tr');
            const dateInput = row.querySelector('.accept-date');
            let acceptedDate = dateInput ? dateInput.value : '';
            
            if (accepted && !acceptedDate) {
                acceptedDate = new Date().toISOString().slice(0, 10);
                if (dateInput) dateInput.value = acceptedDate;
            }
            
            await updateAcceptedStatus(phone, accepted, acceptedDate);
            showToast(`Статус для ${phone} обновлён`);
        };
    });
    
    document.querySelectorAll('.accept-date').forEach(dateInput => {
        dateInput.onchange = async () => {
            const phone = dateInput.dataset.phone;
            const acceptedDate = dateInput.value;
            const row = dateInput.closest('tr');
            const checkbox = row.querySelector('.accept-checkbox');
            const accepted = checkbox ? checkbox.checked : false;
            await updateAcceptedStatus(phone, accepted, acceptedDate);
            showToast(`Дата для ${phone} обновлена`);
        };
    });
}

function renderAdaptationAdminTable(users) {
    const activeUsers = users.filter(u => u.accepted === true || u.accepted === 'true');
    
    if (activeUsers.length === 0) {
        return '<p style="padding:20px;">Нет стажёров, допущенных к адаптации</p>';
    }
    
    let html = `
        <table class="admin-table">
            <thead>
                <tr><th>ФИО</th><th>Телефон</th><th>Дата допуска</th><th>Неделя</th><th>Блок</th><th>Звонки</th><th>Конверсия %</th><th>Касса руб</th></tr>
            </thead>
            <tbody>
    `;
    
    for (const user of activeUsers) {
        const startDate = user.accepted_date ? new Date(user.accepted_date) : new Date();
        const now = new Date();
        const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        let currentWeek = Math.floor(diffDays / 7) + 1;
        if (currentWeek < 1) currentWeek = 1;
        if (currentWeek > 4) currentWeek = 4;
        
        const blocks = [
            { name: "Приём заявок", planCalls: 100, planConversion: 30, planRevenue: 50000 },
            { name: "Закрытие заявок", planCalls: 80, planConversion: 70, planRevenue: 80000 },
            { name: "Повторная продажа", planCalls: 50, planConversion: 50, planRevenue: 120000 }
        ];
        
        for (const block of blocks) {
            html += `
                <tr data-phone="${user.phone}" data-week="${currentWeek}" data-block="${block.name}">
                    <td>${user.name || '—'}</td>
                    <td>${user.phone}</td>
                    <td>${user.accepted_date || '—'}</td>
                    <td>${currentWeek}</td>
                    <td>${block.name}</td>
                    <td><input type="number" class="fact-calls" value="0" style="width:70px;"> / ${block.planCalls}</td>
                    <td><input type="number" class="fact-conversion" value="0" style="width:70px;"> / ${block.planConversion}%</td>
                    <td><input type="number" class="fact-revenue" value="0" style="width:90px;"> / ${block.planRevenue}</td>
                </tr>
            `;
        }
    }
    
    html += '</tbody></tr>';
    html += '<button id="saveAdaptationFactsBtn" class="btn-primary" style="margin-top:16px;">💾 Сохранить</button>';
    return html;
}

function initAdaptationAdminHandlers() {
    const saveBtn = document.getElementById('saveAdaptationFactsBtn');
    if (saveBtn) {
        saveBtn.onclick = async () => {
            const rows = document.querySelectorAll('#adaptationTab tr[data-phone]');
            let saved = 0;
            for (const row of rows) {
                const phone = row.dataset.phone;
                const week = parseInt(row.dataset.week);
                const blockName = row.dataset.block;
                const calls = parseInt(row.querySelector('.fact-calls')?.value) || 0;
                const conversion = parseInt(row.querySelector('.fact-conversion')?.value) || 0;
                const revenue = parseInt(row.querySelector('.fact-revenue')?.value) || 0;
                await updateAdaptationData(phone, week, blockName, calls, conversion, revenue);
                saved++;
            }
            showToast(`Сохранено ${saved} записей`);
        };
    }
}