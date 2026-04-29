// ========== main.js - Главный контроллер ==========
// Инициализация, роутинг, общие функции

let currentUser = null;
let isAdminMode = false;

// ========== ОБЩИЕ ФУНКЦИИ ==========
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

// Делаем showToast глобальной для других модулей
window.showToast = showToast;

// Делаем глобальные ссылки для модулей
window.currentUser = null;
window.isAdminMode = false;

// ========== ОТРИСОВКА МОДУЛЕЙ ==========
function renderModulesGrid() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    
    // 👇 ВРЕМЕННО ДЛЯ ТЕСТА: адаптация открыта для всех
    const adaptationAvailable = true;
    
    const adaptationBadge = adaptationAvailable 
        ? '<span class="adaptation-status-badge">✓ Доступен</span>' 
        : '<span class="module-status locked-status">🔒 Закрыт</span>';
    
    grid.innerHTML = `
        <div class="module-card" data-module="training">
            <div class="module-icon">🎓</div>
            <div class="module-title">Обучение</div>
            <div class="module-desc">Бизнес-процесс, скрипты, тесты</div>
            <div class="module-status">✓ Доступен</div>
        </div>
        <div class="module-card" data-module="adaptation">
            <div class="module-icon">⚙️</div>
            <div class="module-title">Адаптация</div>
            <div class="module-desc">Работа с наставником, план KPI</div>
            ${adaptationBadge}
        </div>
        <div class="module-card locked" data-module="crm">
            <div class="module-icon">🎮</div>
            <div class="module-title">Тестовая CRM</div>
            <div class="module-desc">Скоро</div>
            <div class="module-status locked-status">🔒 Закрыто</div>
        </div>
        <div class="module-card" data-module="knowledge">
            <div class="module-icon">📚</div>
            <div class="module-title">База Знаний</div>
            <div class="module-desc">Статьи, скрипты, ответы на вопросы</div>
            <div class="module-status">✓ Доступен</div>
        </div>
    `;
    
    // Обработчики кликов
    document.querySelectorAll('.module-card').forEach(card => {
        card.onclick = () => {
            if (card.classList.contains('locked')) {
                showToast('Модуль пока недоступен');
                return;
            }
            const module = card.dataset.module;
            if (module === 'training') {
                showTraining();
            } else if (module === 'adaptation') {
                showAdaptation();
            } else if (module === 'knowledge') {
                if (typeof showKnowledge === 'function') {
                    showKnowledge();
                } else {
                    showToast('Модуль загружается...');
                }
            }
        };
    });
}

function showModulesGrid() {
    const trackContent = document.getElementById('trackContent');
    const modulesGrid = document.getElementById('modulesGrid');
    const backBtn = document.getElementById('backToModulesBtn');
    
    if (trackContent) trackContent.innerHTML = '';
    if (modulesGrid) modulesGrid.style.display = 'grid';
    if (backBtn) backBtn.style.display = 'none';
}

function showProfileCard() {
    if (!currentUser) return;
    
    let stats = { completedCount: 0, total: 6, avgGrade: 0 };
    try {
        stats = calculateTrainingStats();
    } catch(e) {
        console.log('Ошибка расчёта статистики:', e);
    }
    
    const trainingCompleted = stats.completedCount === stats.total;
    let adaptationHtml = '';
    
    if (trainingCompleted && adaptationStatus?.accepted === true) {
        adaptationHtml = '<div style="background:#dcfce7; padding:12px; border-radius:16px; margin-top:12px;">✅ Допущен к адаптации</div>';
    } else if (trainingCompleted && adaptationStatus?.accepted !== true) {
        adaptationHtml = '<div style="background:#fef9e3; padding:12px; border-radius:16px; margin-top:12px;">⏳ Ожидание решения администратора</div>';
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content">
            <h3>📇 Карточка сотрудника</h3>
            <p><strong>${currentUser.name || '—'}</strong><br>📞 ${currentUser.phone || '—'}</p>
            <hr>
            <p>📊 Прогресс: ${stats.completedCount}/${stats.total} блоков</p>
            <p>⭐ Средняя оценка: ${stats.avgGrade}</p>
            ${adaptationHtml}
            <button class="btn-primary" onclick="this.closest('.modal').remove()" style="margin-top:16px;">Закрыть</button>
        </div>
    `;
    document.body.appendChild(modal);
}

// ========== ИНИЦИАЛИЗАЦИЯ ПОРТАЛА ==========
async function initPortal(user) {
    currentUser = user;
    window.currentUser = user;
    isAdminMode = false;
    window.isAdminMode = false;
    
    // Скрываем админ-панель
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.classList.add('hidden');
    
    // Показываем портал
    const registrationScreen = document.getElementById('registrationScreen');
    const portalScreen = document.getElementById('portalScreen');
    if (registrationScreen) registrationScreen.style.display = 'none';
    if (portalScreen) portalScreen.classList.remove('hidden');
    
    // Заполняем приветствие
    const userNameBtn = document.getElementById('userNameBtn');
    const welcomeName = document.getElementById('welcomeName');
    if (userNameBtn) userNameBtn.innerText = user.name;
    if (welcomeName) welcomeName.innerText = user.name.split(' ')[0];
    
    // Загружаем прогресс обучения
    if (typeof loadTrainingProgress === 'function') {
        loadTrainingProgress();
    }
    
    // Загружаем статус адаптации
    if (typeof loadAdaptationStatus === 'function') {
        try {
            await loadAdaptationStatus();
        } catch(e) {
            console.log('Ошибка загрузки статуса адаптации:', e);
        }
    }
    
    // Отрисовываем модули
    renderModulesGrid();
    showModulesGrid();
    
    // Настраиваем обработчики
    const backBtn = document.getElementById('backToModulesBtn');
    if (backBtn) backBtn.onclick = () => showModulesGrid();
    
    const userNameBtnClick = document.getElementById('userNameBtn');
    if (userNameBtnClick) userNameBtnClick.onclick = () => showProfileCard();
}

// ========== СБРОС ==========
function resetUserProgress() {
    if (currentUser && !isAdminMode) {
        if (confirm('Сбросить весь прогресс обучения?')) {
            localStorage.removeItem(`training_${currentUser.phone}`);
            // Сбрасываем переменные, если они доступны
            if (typeof trainingCompleted !== 'undefined') {
                for (let i = 0; i < trainingCompleted.length; i++) {
                    trainingCompleted[i] = false;
                    trainingGrades[i] = 0;
                    if (bpBlocks && bpBlocks[i] && bpBlocks[i].hasTrainer) bpBlocks[i].trainerPassed = false;
                }
            }
            if (typeof saveTrainingProgress === 'function') {
                saveTrainingProgress();
            }
            location.reload();
        }
    } else if (isAdminMode) {
        if (confirm('Сбросить все данные портала? (очистка localStorage)')) {
            localStorage.clear();
            location.reload();
        }
    }
}

// ========== ОБРАБОТЧИКИ СОБЫТИЙ ==========
document.addEventListener('DOMContentLoaded', () => {
    // Кнопка регистрации
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.onclick = async () => {
            const name = document.getElementById('regName').value.trim();
            const phone = document.getElementById('regPhone').value.trim();
            
            if (!name || !phone) {
                alert('Заполните ФИО и телефон');
                return;
            }
            
            try {
                const user = await registerOrGetUser(name, phone);
                await initPortal(user);
            } catch (error) {
                console.error('Ошибка регистрации:', error);
                alert('Ошибка регистрации. Проверьте подключение к интернету и URL бэкенда.');
            }
        };
    }
    
    // Кнопка входа в админку
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
        adminLoginBtn.onclick = async () => {
            const pwd = prompt('Введите пароль администратора:');
            if (pwd === 'admin') {
                isAdminMode = true;
                window.isAdminMode = true;
                currentUser = null;
                window.currentUser = null;
                
                // Скрываем регистрацию, показываем портал
                const registrationScreen = document.getElementById('registrationScreen');
                const portalScreen = document.getElementById('portalScreen');
                if (registrationScreen) registrationScreen.style.display = 'none';
                if (portalScreen) portalScreen.classList.remove('hidden');
                
                // Скрываем модули и кнопку "Назад"
                const modulesGrid = document.getElementById('modulesGrid');
                const backBtn = document.getElementById('backToModulesBtn');
                const trackContent = document.getElementById('trackContent');
                if (modulesGrid) modulesGrid.style.display = 'none';
                if (backBtn) backBtn.style.display = 'none';
                if (trackContent) trackContent.innerHTML = '';
                
                // Показываем админ-панель
                const adminPanel = document.getElementById('adminPanel');
                if (adminPanel) adminPanel.classList.remove('hidden');
                
                // Загружаем админ-панель
                try {
                    if (typeof loadAdminPanel === 'function') {
                        await loadAdminPanel();
                        showToast('Добро пожаловать в админ-панель');
                    } else {
                        console.error('loadAdminPanel не определена');
                        if (adminPanel) adminPanel.innerHTML = '<p style="color:red;">Ошибка: модуль admin.js не загружен</p>';
                    }
                } catch (error) {
                    console.error('Ошибка загрузки админ-панели:', error);
                    if (adminPanel) adminPanel.innerHTML = '<p style="color:red;">Ошибка загрузки админ-панели</p>';
                }
            } else {
                alert('Неверный пароль');
            }
        };
    }
    
    // Кнопка сброса
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.onclick = () => resetUserProgress();
    }
});

// ========== АВТОВХОД ДЛЯ ПРОВЕРКИ ==========
// Проверяем сохранённого пользователя
const savedUser = localStorage.getItem('portalUser');
if (savedUser) {
    try {
        const user = JSON.parse(savedUser);
        if (user && user.name && user.phone) {
            // Автоматически входим, если есть сохранённый пользователь
            setTimeout(() => {
                initPortal(user).catch(e => console.error('Автовход не удался:', e));
            }, 100);
        }
    } catch(e) {
        console.error('Ошибка парсинга сохранённого пользователя:', e);
    }
}

// Делаем необходимые функции глобальными для доступа из других модулей
window.showModulesGrid = showModulesGrid;
window.renderModulesGrid = renderModulesGrid;
window.showProfileCard = showProfileCard;
window.showToast = showToast;
window.resetUserProgress = resetUserProgress;

console.log('✅ Портал готов!');
console.log('Для Cheat mode введите enableCheatMode()');