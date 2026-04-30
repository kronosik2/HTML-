// ========== crm.js - Модуль Функционал CRM ==========

const crmBlocks = [
    { id: 1, title: "📞 Звонки/Обращения", desc: "Управление входящими и исходящими звонками", videoText: "Здесь будет видео-обучение по работе со звонками и обращениями клиентов. Как правильно принимать звонки, фиксировать обращения и передавать их в работу." },
    { id: 2, title: "📋 Заявки", desc: "Создание и ведение заявок в CRM", videoText: "Здесь будет видео-обучение по созданию и ведению заявок. Как заполнять все поля, прикреплять файлы и отслеживать статусы." },
    { id: 3, title: "⭐ Рейтинг", desc: "Система оценки исполнителей и менеджеров", videoText: "Здесь будет видео-обучение по системе рейтингов. Как формируется рейтинг исполнителя, что влияет на его изменение." },
    { id: 4, title: "👥 База исполнителя", desc: "Управление базой грузчиков и водителей", videoText: "Здесь будет видео-обучение по работе с базой исполнителей. Как добавлять новых, просматривать их профили и назначать на заявки." }
];

function renderCRMModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    let blocksHtml = '';
    for (const block of crmBlocks) {
        blocksHtml += `
            <div class="bp-block-card" data-id="${block.id}" style="margin-bottom:16px;">
                <div class="bp-card-title">${block.title}</div>
                <div class="bp-card-desc">${block.desc}</div>
                <div class="bp-card-status">
                    <span class="badge badge-warning">📖 Доступен</span>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="training-layout">
            <div class="bp-sidebar" style="width:100%;">
                <div style="margin-bottom:20px;">
                    <button class="btn-back" id="backToModulesBtnCRM">← Назад</button>
                </div>
                <h2 style="margin-bottom:8px;">🏢 Функционал CRM</h2>
                <p style="margin-bottom:24px; color:#64748b;">Управление звонками, заявками, рейтингом и базой исполнителей</p>
                <div class="bp-block-list">${blocksHtml}</div>
            </div>
        </div>
    `;
    
    document.getElementById('backToModulesBtnCRM').onclick = () => showModulesGrid();
    
    document.querySelectorAll('.bp-block-card').forEach(card => {
        card.onclick = () => {
            const id = parseInt(card.dataset.id);
            const block = crmBlocks.find(b => b.id === id);
            if (block) openCRMVideoModal(block);
        };
    });
}

function openCRMVideoModal(block) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:600px; width:100%;">
            <h3 style="margin-bottom:16px;">${block.title}</h3>
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px; line-height:1.6;">
                <p style="margin-bottom:12px;"><strong>📺 Видео-обучение:</strong></p>
                <p>${block.videoText}</p>
                <div style="background:#e2e8f0; border-radius:12px; padding:40px; text-align:center; margin-top:16px;">
                    🎥 Здесь будет видео-плеер
                </div>
            </div>
            <div style="display:flex; justify-content:flex-end;">
                <button class="btn-outline" id="closeModalBtn">Закрыть</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#closeModalBtn').onclick = () => modal.remove();
}

function showCRM() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    renderCRMModule();
}

window.showCRM = showCRM;
