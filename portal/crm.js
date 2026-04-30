// ========== crm.js - Модуль Функционал CRM ==========

const crmBlocks = [
    { 
        id: 1, 
        title: "📞 Звонки/Обращения", 
        desc: "Управление входящими и исходящими звонками",
        videoUrl: "",
        videoText: "🎥 Здесь будет видео-обучение по работе со звонками и обращениями клиентов.\n\n📌 Основные темы:\n• Как правильно принимать звонок\n• Скрипты разговора\n• Фиксация обращения в CRM\n• Контроль качества"
    },
    { 
        id: 2, 
        title: "📋 Заявки", 
        desc: "Создание и ведение заявок в CRM",
        videoUrl: "",
        videoText: "🎥 Здесь будет видео-обучение по созданию и ведению заявок.\n\n📌 Основные темы:\n• Создание новой заявки\n• Заполнение полей\n• Прикрепление файлов\n• Отслеживание статусов"
    },
    { 
        id: 3, 
        title: "⭐ Рейтинг", 
        desc: "Система оценки исполнителей и менеджеров",
        videoUrl: "",
        videoText: "🎥 Здесь будет видео-обучение по системе рейтингов.\n\n📌 Основные темы:\n• Как формируется рейтинг\n• Что влияет на повышение/понижение\n• Где смотреть статистику"
    },
    { 
        id: 4, 
        title: "👥 База исполнителя", 
        desc: "Управление базой грузчиков и водителей",
        videoUrl: "",
        videoText: "🎥 Здесь будет видео-обучение по работе с базой исполнителей.\n\n📌 Основные темы:\n• Добавление нового исполнителя\n• Профиль исполнителя\n• Назначение на заявки\n• Оценка работы"
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
                <div style="background:#e2e8f0; border-radius:12px; padding:40px; text-align:center; margin-bottom:16px;">
                    🎥 Видео-обучение (будет добавлено позже)
                </div>
                <p style="white-space:pre-wrap;">${block.videoText}</p>
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
