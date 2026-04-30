// ========== main.js - Главный контроллер ==========
// Инициализация, роутинг, общие функции
import { showTraining, loadTrainingProgress, calculateTrainingStats } from './training/index.js';
import { showAdaptation } from './adaptation.js';
import { showKnowledge } from './knowledge.js';
import { showCRM } from './crm.js';

let currentUser = null;
let isAdminMode = false;
let adaptationStatus = { accepted: false };

// ========== ОБЩИЕ ФУНКЦИИ ==========
function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

window.showToast = showToast;

// ========== ОТРИСОВКА МОДУЛЕЙ ==========
function renderModulesGrid() {
    const grid = document.getElementById('modulesGrid');
    if (!grid) return;
    
    const adaptationAvailable = true;
    const adaptationBadge = adaptationAvailable 
        ? '<span class="adaptation-status-badge">✓ Доступен</span>' 
        : '<span class="module-status locked-status">🔒 Закрыт</span>';
    
    grid.innerHTML = `
        <div class="module-card" data-module="crm">
            <div class="module-icon">🏢</div>
            <div class="module-title">Функционал CRM</div>
            <div class="module-desc">Звонки, заявки, рейтинг, база исполнителя</div>
            <div class="module-status">✓ Доступен</div>
        </div>
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
        <div class="module-card" data-module="knowledge">
            <div class="module-icon">📚</div>
            <div class="module-title">База Знаний</div>
            <div class="module-desc">Статьи, скрипты, ответы на вопросы</div>
            <div class="module-status">✓ Доступен</div>
        </div>
    `;
    
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
                showKnowledge();
            } else if (module === 'crm') {
                showCRM();
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
    
    let stats = { completedCount: 0, total: 7, avgGrade: 0 };
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
    
    const adminPanel = document.getElementById('adminPanel');
    if (adminPanel) adminPanel.classList.add('hidden');
    
    const registrationScreen = document.getElementById('registrationScreen');
    const portalScreen = document.getElementById('portalScreen');
    if (registrationScreen) registrationScreen.style.display = 'none';
    if (portalScreen) portalScreen.classList.remove('hidden');
    
    const userNameBtn = document.getElementById('userNameBtn');
    const welcomeName = document.getElementById('welcomeName');
    if (userNameBtn) userNameBtn.innerText = user.name;
    if (welcomeName) welcomeName.innerText = user.name.split(' ')[0];
    
    if (typeof loadTrainingProgress === 'function') {
        loadTrainingProgress();
    }
    
    if (typeof window.loadAdaptationStatus === 'function') {
        try {
            await window.loadAdaptationStatus();
            adaptationStatus = window.adaptationStatus || { accepted: false };
        } catch(e) {
            console.log('Ошибка загрузки статуса адаптации:', e);
        }
    }
    
    renderModulesGrid();
    showModulesGrid();
    
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
    
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
        adminLoginBtn.onclick = async () => {
            const pwd = prompt('Введите пароль администратора:');
            if (pwd === 'admin') {
                isAdminMode = true;
                window.isAdminMode = true;
                currentUser = null;
                window.currentUser = null;
                
                const registrationScreen = document.getElementById('registrationScreen');
                const portalScreen = document.getElementById('portalScreen');
                if (registrationScreen) registrationScreen.style.display = 'none';
                if (portalScreen) portalScreen.classList.remove('hidden');
                
                const modulesGrid = document.getElementById('modulesGrid');
                const backBtn = document.getElementById('backToModulesBtn');
                const trackContent = document.getElementById('trackContent');
                if (modulesGrid) modulesGrid.style.display = 'none';
                if (backBtn) backBtn.style.display = 'none';
                if (trackContent) trackContent.innerHTML = '';
                
                const adminPanel = document.getElementById('adminPanel');
                if (adminPanel) adminPanel.classList.remove('hidden');
                
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
    
    const resetBtn = document.getElementById('resetBtn');
    if (resetBtn) {
        resetBtn.onclick = () => resetUserProgress();
    }
});

// ========== АВТОВХОД ==========
const savedUser = localStorage.getItem('portalUser');
if (savedUser) {
    try {
        const user = JSON.parse(savedUser);
        if (user && user.name && user.phone) {
            setTimeout(() => {
                initPortal(user).catch(e => console.error('Автовход не удался:', e));
            }, 100);
        }
    } catch(e) {
        console.error('Ошибка парсинга сохранённого пользователя:', e);
    }
}

// Экспортируем функции для доступа из других модулей
window.showModulesGrid = showModulesGrid;
window.showProfileCard = showProfileCard;
window.resetUserProgress = resetUserProgress;

console.log('✅ Портал готов!');
