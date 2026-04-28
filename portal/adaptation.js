// ========== adaptation.js - Модуль Адаптации (недельные спринты) ==========

let adaptationStatus = { accepted: false, acceptedDate: null };
let adaptationData = {};

// Плановые показатели на неделю для каждого блока
const adaptationPlan = {
    "📞 Приём заявок": {
        calls: 100,
        conversion: 25,
        revenueNew: 20000,
        revenueTotal: 30000
    },
    "✅ Закрытие заявок": {
        calls: 100,
        conversion: 25,
        revenueNew: 20000,
        revenueTotal: 30000
    },
    "🔄 Повторная продажа": {
        calls: 100,
        conversion: 25,
        revenueNew: 20000,
        revenueTotal: 30000
    }
};

// Названия блоков (для отображения)
const adaptationBlocks = [
    { id: 1, title: "📞 Приём заявок", description: "Максимальный фокус на Конверсии!" },
    { id: 2, title: "✅ Закрытие заявок", description: "Максимальный фокус на Браке!" },
    { id: 3, title: "🔄 Повторная продажа", description: "Максимальный фокус на повторной продаже!" }
];

// ========== ЗАГРУЗКА ДАННЫХ ==========
async function loadAdaptationStatus() {
    if (!window.currentUser || window.isAdminMode) return;
    try {
        const res = await getAdaptationStatus(window.currentUser.phone);
        adaptationStatus = res || { accepted: false, acceptedDate: null };
        
        // Если стажёр допущен, но данных в таблице нет — создаём базовые записи
        if (adaptationStatus.accepted && adaptationStatus.acceptedDate) {
            await ensureAdaptationDataExists();
        }
    } catch (e) {
        console.error('Ошибка загрузки статуса адаптации:', e);
    }
    return adaptationStatus;
}

async function ensureAdaptationDataExists() {
    if (!window.currentUser) return;
    
    const existingData = await getAdaptationData(window.currentUser.phone);
    const existingKeys = new Set(existingData.map(d => `${d.week}_${d.block_name}`));
    
    // Создаём записи для всех недель и блоков, если их нет
    for (let week = 1; week <= 4; week++) {
        for (let block of adaptationBlocks) {
            const key = `${week}_${block.title}`;
            if (!existingKeys.has(key)) {
                await updateAdaptationData(
                    window.currentUser.phone,
                    week,
                    block.title,
                    0,  // calls
                    0,  // conversion
                    0,  // revenueNew
                    0   // revenueTotal
                );
            }
        }
    }
}

async function loadAdaptationData() {
    if (!window.currentUser || window.isAdminMode) return;
    try {
        const res = await getAdaptationData(window.currentUser.phone);
        // Преобразуем массив в объект для быстрого доступа
        adaptationData = {};
        for (const item of res) {
            const key = `${item.week}_${item.block_name}`;
            adaptationData[key] = {
                calls: item.calls || 0,
                conversion: item.conversion || 0,
                revenueNew: item.revenueNew || 0,
                revenueTotal: item.revenueTotal || 0
            };
        }
    } catch (e) {
        console.error('Ошибка загрузки данных адаптации:', e);
        adaptationData = {};
    }
    return adaptationData;
}

// ========== РАСЧЁТ НЕДЕЛИ ==========
function getCurrentAdaptationWeek() {
    if (!adaptationStatus.acceptedDate) return 1;
    const startDate = new Date(adaptationStatus.acceptedDate);
    const now = new Date();
    const diffDays = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));
    let week = Math.floor(diffDays / 7) + 1;
    if (week < 1) week = 1;
    if (week > 4) week = 4;
    return week;
}

// ========== ОТРИСОВКА МОДУЛЯ ==========
function renderAdaptationModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    // Проверка: обучение пройдено?
    const stats = calculateTrainingStats();
    const trainingCompleted = stats.completedCount === stats.total;
    
    if (!trainingCompleted) {
        container.innerHTML = `
            <div class="material-section" style="text-align:center;">
                <h3>🔒 Модуль адаптации пока недоступен</h3>
                <p>Сначала полностью пройдите обучение (все 6 блоков с оценкой 5).</p>
                <button class="btn-primary" id="backToTrainingBtn" style="margin-top:16px;">← Вернуться к обучению</button>
            </div>
        `;
        const backBtn = document.getElementById('backToTrainingBtn');
        if (backBtn) backBtn.onclick = () => showTraining();
        return;
    }
    
    // Проверка: допущен к адаптации?
    if (!adaptationStatus.accepted) {
        container.innerHTML = `
            <div class="material-section" style="text-align:center;">
                <h3>⏳ Ожидание решения администратора</h3>
                <p>Вы успешно прошли обучение! Администратор рассмотрит вашу кандидатуру.</p>
                <button class="btn-primary" id="backToTrainingBtn" style="margin-top:16px;">← Вернуться к обучению</button>
            </div>
        `;
        const backBtn = document.getElementById('backToTrainingBtn');
        if (backBtn) backBtn.onclick = () => showTraining();
        return;
    }
    
    // Допущен — показываем адаптацию
    const currentWeek = getCurrentAdaptationWeek();
    const startDate = new Date(adaptationStatus.acceptedDate);
    const startDateStr = startDate.toLocaleDateString('ru-RU');
    
    // Генерируем таблицу недель
    let weeksHtml = '';
    for (let week = 1; week <= 4; week++) {
        const isCurrentWeek = (week === currentWeek);
        const weekClass = isCurrentWeek ? 'current-week' : '';
        
        weeksHtml += `
            <div class="week-card ${weekClass}" style="background:white; border-radius:20px; padding:20px; margin-bottom:24px; border:2px solid ${isCurrentWeek ? '#22c55e' : '#e2e8f0'};">
                <h3 style="margin-bottom:16px;">📅 Неделя ${week} ${isCurrentWeek ? '(текущая)' : ''}</h3>
                <div style="overflow-x:auto;">
                    <table style="width:100%; border-collapse:collapse;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th style="padding:12px; text-align:left;">Блок</th>
                                <th style="padding:12px; text-align:center;">📞 Звонки</th>
                                <th style="padding:12px; text-align:center;">🎯 Конверсия</th>
                                <th style="padding:12px; text-align:center;">💰 Касса новые</th>
                                <th style="padding:12px; text-align:center;">💰 Касса общая</th>
                            </tr>
                        </thead>
                        <tbody>
        `;
        
        for (const block of adaptationBlocks) {
            const key = `${week}_${block.title}`;
            const fact = adaptationData[key] || { calls: 0, conversion: 0, revenueNew: 0, revenueTotal: 0 };
            const plan = adaptationPlan[block.title];
            
            const callsPercent = Math.min(100, Math.round((fact.calls / plan.calls) * 100));
            const conversionPercent = Math.min(100, Math.round((fact.conversion / plan.conversion) * 100));
            const revenueNewPercent = Math.min(100, Math.round((fact.revenueNew / plan.revenueNew) * 100));
            const revenueTotalPercent = Math.min(100, Math.round((fact.revenueTotal / plan.revenueTotal) * 100));
            
            weeksHtml += `
                <tr style="border-bottom:1px solid #e2e8f0;">
                    <td style="padding:12px;"><strong>${block.title}</strong><br><span style="font-size:12px; color:#64748b;">${block.description}</span></td>
                    <td style="padding:12px; text-align:center;">
                        <div><strong>${fact.calls}</strong> / ${plan.calls}</div>
                        <div class="progress-bar-bg" style="margin-top:8px;"><div class="progress-bar-fill" style="width:${callsPercent}%; background:#22c55e;"></div></div>
                    </td>
                    <td style="padding:12px; text-align:center;">
                        <div><strong>${fact.conversion}%</strong> / ${plan.conversion}%</div>
                        <div class="progress-bar-bg" style="margin-top:8px;"><div class="progress-bar-fill" style="width:${conversionPercent}%; background:#22c55e;"></div></div>
                    </td>
                    <td style="padding:12px; text-align:center;">
                        <div><strong>${fact.revenueNew.toLocaleString()}</strong> / ${plan.revenueNew.toLocaleString()}</div>
                        <div class="progress-bar-bg" style="margin-top:8px;"><div class="progress-bar-fill" style="width:${revenueNewPercent}%; background:#22c55e;"></div></div>
                    </td>
                    <td style="padding:12px; text-align:center;">
                        <div><strong>${fact.revenueTotal.toLocaleString()}</strong> / ${plan.revenueTotal.toLocaleString()}</div>
                        <div class="progress-bar-bg" style="margin-top:8px;"><div class="progress-bar-fill" style="width:${revenueTotalPercent}%; background:#22c55e;"></div></div>
                    </td>
                </tr>
            `;
        }
        
        weeksHtml += `
                        </tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    container.innerHTML = `
        <div class="training-layout">
            <div class="bp-sidebar" style="width:100%;">
                <div style="margin-bottom:20px;">
                    <button class="btn-back" id="backToModulesBtnAdaptation">← Назад</button>
                </div>
                <h2 style="margin-bottom:8px;">🎯 Адаптация (4 недели)</h2>
                <p style="margin-bottom:24px; color:#64748b;">📅 Начало: ${startDateStr}</p>
                ${weeksHtml}
                ${currentWeek >= 4 ? '<div style="background:#dcfce7; padding:16px; border-radius:16px; text-align:center; margin-top:24px;">🎉 Поздравляем! Адаптация завершена. Результаты будут подведены администратором.</div>' : ''}
            </div>
        </div>
    `;
    
    document.getElementById('backToModulesBtnAdaptation').onclick = () => showModulesGrid();
}

function showAdaptation() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    loadAdaptationStatus().then(() => loadAdaptationData()).then(() => renderAdaptationModule());
}