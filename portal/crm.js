// ========== crm.js - Модуль Функционал CRM (с видео-сценариями) ==========

const crmBlocks = [
    {
        id: 1,
        title: "📞 Звонки / Обращения",
        desc: "Управление входящими и исходящими звонками",
        videoPlaceholder: true,
        script: `
🎥 **Здесь будет видео: «Звонки и обращения»**

📌 **Сценарий видео:**
• Записываем экран, поверх видео накладываем голос
• Рассказываем про звонки/обращения, виды звонков
• Как правильно взять звонок
• Чем отличаются звонок и обращение

📌 **Ключевые темы:**
• Виды звонков (входящие, исходящие, горячие, холодные)
• Структура идеального звонка
• Отличие звонка от обращения (заявка через сайт/чат)
• Практические примеры
        `
    },
    {
        id: 2,
        title: "📋 Заявки",
        desc: "Создание и ведение заявок в CRM",
        videoPlaceholder: true,
        script: `
🎥 **Здесь будет видео: «Работа с заявками»**

📌 **Сценарий видео:**
• Записываем экран, поверх видео накладываем голос
• Рассказываем, как составить заявку
• Где посмотреть стартовый ценник
• Рассказываем про статистику грузчиков и готовность

📌 **Ключевые темы:**
• Пошаговое создание заявки
• Откуда брать цены (справочник, калькулятор)
• Как оценить исполнителя (рейтинг, отзывы, готовность)
• Ошибки при создании заявок
        `
    },
    {
        id: 3,
        title: "⭐ Рейтинг",
        desc: "Система оценки исполнителей и менеджеров",
        videoPlaceholder: true,
        script: `
🎥 **Здесь будет видео: «Рейтинг и зарплата»**

📌 **Сценарий видео:**
• Записываем экран, поверх видео накладываем голос
• Рассказываем, как строится зарплата
• Проговариваем минимальный процент + оклад
• Как выполнить KPI и сколько процентов в общем может получиться
• Первые 3 месяца минимальный процент — 14%

📌 **Ключевые темы:**
• Формула расчёта зарплаты
• Что такое KPI и как его выполнить
• Процентная сетка и бонусы
• Особенности первого квартала
        `
    },
    {
        id: 4,
        title: "👥 База исполнителей",
        desc: "Управление базой грузчиков и водителей",
        videoPlaceholder: true,
        script: `
🎥 **Здесь будет видео: «База исполнителей»**

📌 **Сценарий видео:**
• Записываем экран, поверх видео накладываем голос
• Рассказываем, как работает вкладка «Исполнители»
• Кому лучше звонить и на что обращать внимание
• Как искать грузчиков и технику

📌 **Ключевые темы:**
• Интерфейс вкладки «Исполнители»
• Фильтры и сортировка
• На что смотреть в карточке исполнителя
• Как быстро найти свободную технику/бригаду
• Приоритеты при выборе (рейтинг, готовность, близость)
        `
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
        if (typeof showModulesGrid === 'function') {
            showModulesGrid();
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
    
    // Форматируем текст сценария
    const formattedScript = block.script
        .replace(/🎥 \*\*(.+?)\*\*/g, '<h3 style="color:#22c55e; margin-bottom:16px;">🎥 $1</h3>')
        .replace(/📌 \*\*(.+?)\*\*/g, '<h4 style="margin:20px 0 12px 0; color:#0f172a;">📌 <strong>$1</strong></h4>')
        .replace(/\n•\s(.+)/g, '<li style="margin-left:20px; margin-bottom:6px;">• $1</li>')
        .replace(/\n/g, '<br>');
    
    modal.innerHTML = `
        <div class="modal-content" style="max-width:650px; width:100%;">
            <h3 style="margin-bottom:8px;">${block.title}</h3>
            
            <!-- Заглушка под видео -->
            <div style="background:#1e293b; border-radius:20px; padding:40px; text-align:center; margin:20px 0; color:white;">
                <div style="font-size:48px; margin-bottom:16px;">🎥</div>
                <div style="font-size:18px; font-weight:600; margin-bottom:8px;">Видео-обучение</div>
                <div style="font-size:14px; opacity:0.7;">Скоро здесь появится видео</div>
                <div style="margin-top:16px; font-size:12px; opacity:0.5;">🎬 Запись экрана + голос</div>
            </div>
            
            <!-- Сценарий / описание -->
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px; max-height:50vh; overflow-y:auto;">
                ${formattedScript}
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

// Делаем глобальной
window.showCRM = showCRM;

console.log('✅ CRM модуль загружен (с видео-сценариями)');
