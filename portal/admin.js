// ========== admin.js - Админ-панель (Портал 1.0) ==========

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
            <div id="adaptationTab" style="display:none;">${renderAdaptationAdminCards(users)}</div>
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
        initAdaptationCardHandlers();
        
    } catch (error) {
        console.error('Ошибка:', error);
        container.innerHTML = `<p style="color:red;">Ошибка: ${error.message}</p>`;
    }
}

// ========== ВКЛАДКА ОБУЧЕНИЕ ==========
function renderTrainingAdminTable(users) {
    let html = `
        <table class="admin-table">
            <thead>
                <tr>
                    <th>ФИО</th>
                    <th>Телефон</th>
                    <th>Блоков</th>
                    <th>Ср. оценка</th>
                    <th>Обучение пройдено</th>
                    <th>Допуск к адаптации</th>
                    <th>Дата допуска</th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (const user of users) {
        const blocksCompleted = user.blocks_completed || 0;
        const trainingCompleted = blocksCompleted >= 6;
        const isAccepted = user.accepted === true || user.accepted === 'true';
        const acceptedDate = user.accepted_date || '';
        const name = user.name || '—';
        const phone = String(user.phone || '—');
        const avgGrade = user.avg_grade || 0;
        
        html += `
            <tr data-phone="${phone}">
                <td>${name}</td>
                <td>${phone}</td>
                <td>${blocksCompleted}/6</td>
                <td>${avgGrade}</td>
                <td>${trainingCompleted ? '✅ Да' : '❌ Нет'}</td>
                <td>
                    <input type="checkbox" class="accept-checkbox" data-phone="${phone}" 
                        ${isAccepted ? 'checked' : ''} ${!trainingCompleted ? 'disabled' : ''}>
                 </td>
                <td>
                    <input type="date" class="accept-date" data-phone="${phone}" 
                        value="${acceptedDate}" ${!trainingCompleted ? 'disabled' : ''}>
                 </td>
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
            showToast(`Статус для ${phone} обновлён: ${accepted ? 'допущен к адаптации' : 'допуск отозван'}`);
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

// ========== ВСПОМОГАТЕЛЬНАЯ ФУНКЦИЯ ДЛЯ ID ==========
function getSafeId(phone) {
    return String(phone).replace(/[^a-zA-Z0-9]/g, '_');
}

// ========== ВКЛАДКА АДАПТАЦИЯ ==========
function renderAdaptationAdminCards(users) {
    const activeUsers = users.filter(u => u.accepted === true || u.accepted === 'true');
    
    if (activeUsers.length === 0) {
        return '<p style="padding:20px; text-align:center;">Нет стажёров, допущенных к адаптации</p>';
    }
    
    let html = `
        <style>
            .adaptation-card {
                background: white;
                border: 1px solid #e2e8f0;
                border-radius: 20px;
                padding: 20px;
                margin-bottom: 16px;
                cursor: pointer;
                transition: 0.2s;
            }
            .adaptation-card:hover {
                border-color: #22c55e;
                box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .adaptation-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-wrap: wrap;
                gap: 12px;
                margin-bottom: 16px;
            }
            .adaptation-name {
                font-size: 18px;
                font-weight: 700;
                color: #0f172a;
            }
            .adaptation-phone {
                font-size: 14px;
                color: #64748b;
            }
            .adaptation-week {
                background: #eef2ff;
                padding: 4px 12px;
                border-radius: 40px;
                font-size: 14px;
                font-weight: 500;
            }
            .adaptation-status {
                padding: 4px 12px;
                border-radius: 40px;
                font-size: 14px;
                font-weight: 500;
            }
            .status-on-track { background: #dcfce7; color: #15803d; }
            .status-behind { background: #fef9e3; color: #854d0e; }
            .adaptation-stats {
                display: flex;
                flex-wrap: wrap;
                gap: 20px;
                margin-top: 12px;
                padding-top: 12px;
                border-top: 1px solid #e2e8f0;
            }
            .stat-item {
                flex: 1;
                min-width: 100px;
            }
            .stat-label {
                font-size: 12px;
                color: #64748b;
                margin-bottom: 4px;
            }
            .stat-value {
                font-size: 16px;
                font-weight: 600;
            }
            .stat-plan {
                font-size: 11px;
                color: #94a3b8;
            }
            .detail-table {
                display: none;
                margin-top: 20px;
                padding-top: 20px;
                border-top: 1px solid #e2e8f0;
            }
            .detail-table.show {
                display: block;
            }
            .detail-table table {
                width: 100%;
                border-collapse: collapse;
            }
            .detail-table th, .detail-table td {
                border: 1px solid #e2e8f0;
                padding: 10px;
                text-align: center;
                font-size: 13px;
            }
            .detail-table th {
                background: #f1f5f9;
            }
            .fact-input {
                width: 80px;
                padding: 6px;
                border: 1px solid #cbd5e1;
                border-radius: 8px;
                text-align: center;
            }
            .save-row-btn {
                background: #22c55e;
                color: white;
                border: none;
                padding: 6px 12px;
                border-radius: 20px;
                cursor: pointer;
                font-size: 12px;
            }
            .save-row-btn:hover { background: #16a34a; }
        </style>
    `;
    
    for (const user of activeUsers) {
        const userName = user.name || '—';
        const userPhone = String(user.phone || '—');
        const safePhone = getSafeId(userPhone);
        const startDate = user.accepted_date ? new Date(user.accepted_date) : new Date();
        const now = new Date();
        const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
        let currentWeek = Math.floor(diffDays / 7) + 1;
        if (currentWeek < 1) currentWeek = 1;
        if (currentWeek > 4) currentWeek = 4;
        
        const statusClass = currentWeek <= 3 ? 'status-on-track' : 'status-behind';
        const statusText = currentWeek <= 3 ? '📈 В плане' : '⚠️ Отставание';
        
        html += `
            <div class="adaptation-card" data-phone="${userPhone}">
                <div class="adaptation-header">
                    <div>
                        <div class="adaptation-name">${userName}</div>
                        <div class="adaptation-phone">${userPhone}</div>
                    </div>
                    <div>
                        <span class="adaptation-week">📅 Неделя ${currentWeek} из 4</span>
                        <span class="adaptation-status ${statusClass}">${statusText}</span>
                    </div>
                </div>
                <div class="adaptation-stats">
                    <div class="stat-item">
                        <div class="stat-label">🎯 Текущий прогресс</div>
                        <div class="stat-value">${Math.round(currentWeek * 25)}%</div>
                        <div class="stat-plan">план: 100% за 4 недели</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">📅 Начало</div>
                        <div class="stat-value">${startDate.toLocaleDateString('ru-RU')}</div>
                    </div>
                    <div class="stat-item">
                        <div class="stat-label">⏳ Осталось недель</div>
                        <div class="stat-value">${4 - currentWeek}</div>
                    </div>
                </div>
                <div class="detail-table" id="detail-${safePhone}">
                    ${renderAdaptationDetailTable(user, currentWeek, safePhone)}
                </div>
            </div>
        `;
    }
    
    return html;
}

function renderAdaptationDetailTable(user, currentWeek, safePhone) {
    const blocks = [
        { name: "📞 Приём заявок", planCalls: 450, planConversion: 25, planRevenueNew: 100000, planRevenueTotal: 150000 },
        { name: "✅ Закрытие заявок", planCalls: 450, planConversion: 25, planRevenueNew: 100000, planRevenueTotal: 150000 },
        { name: "🔄 Повторная продажа", planCalls: 450, planConversion: 25, planRevenueNew: 100000, planRevenueTotal: 150000 }
    ];
    
    let html = `
        <h4 style="margin-bottom:16px;">📊 Детальная таблица показателей (за весь период)</h4>
        <table>
            <thead>
                <tr>
                    <th>Блок</th>
                    <th>📞 Звонки<br><span style="font-size:11px;">(план 450)</span></th>
                    <th>🎯 Конверсия %<br><span style="font-size:11px;">(план 25%)</span></th>
                    <th>💰 Касса от новых<br><span style="font-size:11px;">(план 100 000)</span></th>
                    <th>💰 Касса общая<br><span style="font-size:11px;">(план 150 000)</span></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
    `;
    
    for (const block of blocks) {
        html += `
            <tr data-block="${block.name}">
                <td style="text-align:left;"><strong>${block.name}</strong></td>
                <td><input type="number" class="fact-input fact-calls" value="0"> / ${block.planCalls}</td>
                <td><input type="number" class="fact-input fact-conversion" value="0"> / ${block.planConversion}%</td>
                <td><input type="number" class="fact-input fact-revenueNew" value="0"> / ${block.planRevenueNew.toLocaleString()} </td>
                <td><input type="number" class="fact-input fact-revenueTotal" value="0"> / ${block.planRevenueTotal.toLocaleString()} </td>
                <td><button class="save-row-btn">💾 Сохранить</button></td>
            </tr>
        `;
    }
    
    html += `
            </tbody>
        </table>
        <button id="saveAllBtn-${safePhone}" class="btn-primary" style="margin-top:16px;">💾 Сохранить всё</button>
    `;
    
    return html;
}

function initAdaptationCardHandlers() {
    // Клик по карточке для открытия/закрытия деталей
    document.querySelectorAll('.adaptation-card').forEach(card => {
        const phone = card.dataset.phone;
        const safePhone = getSafeId(phone);
        const detailDiv = document.getElementById(`detail-${safePhone}`);
        
        // Клик по карточке (не по кнопкам внутри)
        card.onclick = (e) => {
            if (e.target.tagName === 'BUTTON' || e.target.classList?.contains('fact-input')) return;
            if (detailDiv) {
                detailDiv.classList.toggle('show');
            }
        };
    });
    
    // Обработчики для кнопок "Сохранить" в каждой строке
    document.querySelectorAll('.save-row-btn').forEach(btn => {
        btn.onclick = async (e) => {
            e.stopPropagation();
            const row = btn.closest('tr');
            const card = btn.closest('.adaptation-card');
            const phone = card.dataset.phone;
            const blockName = row.dataset.block;
            
            const calls = parseInt(row.querySelector('.fact-calls')?.value) || 0;
            const conversion = parseInt(row.querySelector('.fact-conversion')?.value) || 0;
            const revenueNew = parseInt(row.querySelector('.fact-revenueNew')?.value) || 0;
            const revenueTotal = parseInt(row.querySelector('.fact-revenueTotal')?.value) || 0;
            
            // Сохраняем для всех 4 недель (суммарно за период)
            for (let week = 1; week <= 4; week++) {
                await updateAdaptationData(phone, week, blockName, calls, conversion, revenueNew, revenueTotal);
            }
            showToast(`Сохранено: ${blockName}`);
        };
    });
    
    // Обработчики для кнопок "Сохранить всё"
    document.querySelectorAll('[id^="saveAllBtn-"]').forEach(btn => {
        btn.onclick = async (e) => {
            e.stopPropagation();
            const card = btn.closest('.adaptation-card');
            const phone = card.dataset.phone;
            const rows = card.querySelectorAll('.detail-table tbody tr');
            let savedCount = 0;
            
            for (const row of rows) {
                const blockName = row.dataset.block;
                const calls = parseInt(row.querySelector('.fact-calls')?.value) || 0;
                const conversion = parseInt(row.querySelector('.fact-conversion')?.value) || 0;
                const revenueNew = parseInt(row.querySelector('.fact-revenueNew')?.value) || 0;
                const revenueTotal = parseInt(row.querySelector('.fact-revenueTotal')?.value) || 0;
                
                for (let week = 1; week <= 4; week++) {
                    await updateAdaptationData(phone, week, blockName, calls, conversion, revenueNew, revenueTotal);
                    savedCount++;
                }
            }
            showToast(`Сохранено ${savedCount} записей для ${phone}`);
        };
    });
}