// ========== crm.js - Модуль Функционал CRM ==========

const crmBlocks = [
    { 
        id: 1, 
        title: "📞 Звонки/Обращения", 
        desc: "Управление входящими и исходящими звонками",
        content: "📌 **Основные правила работы со звонками:**\n\n1. Всегда отвечай на звонок максимум за 10 секунд.\n2. Представься и назови компанию: «РАЗ! ГРУЗЧИКИ, меня зовут [Имя]». ..."
    },
    { 
        id: 2, 
        title: "📋 Заявки", 
        desc: "Создание и ведение заявок в CRM",
        content: "📌 **Правила создания заявки в CRM:**\n\n1. Укажи точный адрес..."
    },
    { 
        id: 3, 
        title: "⭐ Рейтинг", 
        desc: "Система оценки исполнителей и менеджеров",
        content: "📌 **Как формируется рейтинг исполнителя:**..."
    },
    { 
        id: 4, 
        title: "👥 База исполнителя", 
        desc: "Управление базой грузчиков и водителей",
        content: "📌 **Что содержится в базе исполнителей:**..."
    }
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
    
    document.getElementById('backToModulesBtnCRM').onclick = () => {
        if (typeof window.showModulesGrid === 'function') {
            window.showModulesGrid();
        }
    };
    
    document.querySelectorAll('.bp-block-card').forEach(card => {
        card.onclick = () => {
            const id = parseInt(card.dataset.id);
            const block = crmBlocks.find(b => b.id === id);
            if (block) openCRMModal(block);
        };
    });
}

function openCRMModal(block) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    const formattedContent = block.content
        .replace(/📌 \*\*(.+?)\*\*/g, '<h4 style="margin:16px 0 8px 0;">📌 <strong>$1</strong></h4>')
        .replace(/\n\*\s(.+)/g, '<li style="margin-left:20px;">$1</li>')
        .replace(/\n/g, '<br>');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width:650px; width:100%;">
            <h3 style="margin-bottom:16px;">${block.title}</h3>
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px; max-height:60vh; overflow-y:auto;">
                ${formattedContent}
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
    const modulesGrid = document.getElementById('modulesGrid');
    const backBtn = document.getElementById('backToModulesBtn');
    const trackContent = document.getElementById('trackContent');
    
    if (modulesGrid) modulesGrid.style.display = 'none';
    if (backBtn) backBtn.style.display = 'inline-block';
    if (trackContent) trackContent.innerHTML = '<div style="text-align:center; padding:40px;">Загрузка...</div>';
    
    renderCRMModule();
}

// ✅ Глобальная функция (ВАЖНО!)
window.showCRM = showCRM;

console.log('✅ CRM модуль загружен');
