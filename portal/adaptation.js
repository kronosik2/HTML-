// ========== adaptation.js - Модуль Адаптации ==========
// Полностью изолирован от других модулей

let adaptationStatus = { accepted: false, acceptedDate: null, status: 'waiting' };
let adaptationData = [];

// Три блока адаптации
const adaptationBlocks = [
    { 
        id: 1, 
        title: "📞 Учимся принимать заявки", 
        focus: "Максимальный фокус на Конверсии!", 
        metrics: "Количество звонков / Конверсия в заявку / Касса от новых",
        planCalls: 100,
        planConversion: 30,
        planRevenue: 50000
    },
    { 
        id: 2, 
        title: "✅ Учимся закрывать заявки", 
        focus: "Максимальный фокус на Браке!", 
        metrics: "Количество звонков / Конверсия в выполненную заявку / Касса от новых",
        planCalls: 80,
        planConversion: 70,
        planRevenue: 80000
    },
    { 
        id: 3, 
        title: "🔄 Учимся совершать повторную продажу", 
        focus: "Максимальный фокус на повторной продаже!", 
        metrics: "Количество звонков / Конверсия в выполненную заявку / Касса общая",
        planCalls: 50,
        planConversion: 50,
        planRevenue: 120000
    }
];

// ========== ЗАГРУЗКА ДАННЫХ ==========
async function loadAdaptationStatus() {
    if (!window.currentUser || window.isAdminMode) return;
    try {
        const res = await getAdaptationStatus(window.currentUser.phone);
        adaptationStatus = res || { accepted: false, acceptedDate: null, status: 'waiting' };
    } catch (e) {
        console.error('Ошибка загрузки статуса адаптации:', e);
        adaptationStatus = { accepted: false, acceptedDate: null, status: 'waiting' };
    }
    return adaptationStatus;
}

async function loadAdaptationData() {
    if (!window.currentUser || window.isAdminMode) return;
    try {
        const res = await getAdaptationData(window.currentUser.phone);
        adaptationData = res || [];
    } catch (e) {
        console.error('Ошибка загрузки данных адаптации:', e);
        adaptationData = [];
    }
    return adaptationData;
}

// ========== ВСПОМОГАТЕЛЬНЫЕ ==========
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

function checkTrainingCompleted() {
    const stats = calculateTrainingStats();
    return stats.completedCount === stats.total;
}

// ========== ОТРИСОВКА МОДУЛЯ ==========
function renderAdaptationModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    const trainingCompleted = checkTrainingCompleted();
    
    // Проверка: обучение не пройдено
    if (!trainingCompleted) {
        container.innerHTML = `
            <div class="material-section" style="text-align:center;">
                <h3>🔒 Модуль адаптации пока недоступен</h3>
                <p>Сначала полностью пройдите обучение (все 6 блоков с оценкой 5).</p>
                <div style="margin-top:16px;">
                    <button class="btn-primary" id="backToTrainingBtn">← Вернуться к обучению</button>
                </div>
            </div>
        `;
        document.getElementById('backToTrainingBtn')?.addEventListener('click', () => showTraining());
        return;
    }
    
    // Проверка: не допущен к адаптации
    if (!adaptationStatus.accepted) {
        container.innerHTML = `
            <div class="material-section" style="text-align:center;">
                <h3>⏳ Ожидание решения администратора</h3>
                <p>Вы успешно прошли обучение! Администратор рассмотрит вашу кандидатуру и примет решение о допуске к адаптации.</p>
                <p style="margin-top:12px; color:#64748b;">Статус: ожидание решения</p>
                <div style="margin-top:16px;">
                    <button class="btn-primary" id="backToTrainingBtn">← Вернуться к обучению</button>
                </div>
            </div>
        `;
        document.getElementById('backToTrainingBtn')?.addEventListener('click', () => showTraining());
        return;
    }
    
    // Допущен — показываем адаптацию
    const currentWeek = getCurrentAdaptationWeek();
    const startDate = new Date(adaptationStatus.acceptedDate);
    const startDateStr = startDate.toLocaleDateString('ru-RU');
    
    let blocksHtml = '';
    for (let i = 0; i < adaptationBlocks.length; i++) {
        const block = adaptationBlocks[i];
        // Ищем данные для этого блока на текущей неделе
        const weekData = adaptationData.find(d => d.week == currentWeek && d.block_name === block.title);
        
        const callsFact = weekData?.calls || 0;
        const conversionFact = weekData?.conversion || 0;
        const revenueFact = weekData?.revenue || 0;
        
        const callsPercent = Math.round((callsFact / block.planCalls) * 100);
        const conversionPercent = Math.round((conversionFact / block.planConversion) * 100);
        const revenuePercent = Math.round((revenueFact / block.planRevenue) * 100);
        
        blocksHtml += `
            <div class="module-card" style="margin-bottom:24px;">
                <div class="module-icon">${block.id === 1 ? '📞' : (block.id === 2 ? '✅' : '🔄')}</div>
                <div class="module-title">${block.title}</div>
                <div class="module-desc">${block.focus}</div>
                <div style="background:#f8fafc; border-radius:16px; padding:16px; margin-top:16px;">
                    <div><strong>📊 Неделя ${currentWeek} из 4</strong></div>
                    <div style="font-size:13px; color:#475569; margin-top:8px;">📈 ${block.metrics}</div>
                    
                    <div style="margin-top:12px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>📞 Звонки:</span>
                            <span><strong>${callsFact}</strong> / ${block.planCalls} 
                                ${callsPercent >= 100 ? '✅' : (callsPercent >= 50 ? '📈' : '⚠️')}
                            </span>
                        </div>
                        <div style="background:#e2e8f0; border-radius:10px; height:6px; overflow:hidden;">
                            <div style="width:${Math.min(100, callsPercent)}%; height:100%; background:#22c55e;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-top:12px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>🎯 Конверсия:</span>
                            <span><strong>${conversionFact}%</strong> / ${block.planConversion}% 
                                ${conversionPercent >= 100 ? '✅' : (conversionPercent >= 50 ? '📈' : '⚠️')}
                            </span>
                        </div>
                        <div style="background:#e2e8f0; border-radius:10px; height:6px; overflow:hidden;">
                            <div style="width:${Math.min(100, conversionPercent)}%; height:100%; background:#22c55e;"></div>
                        </div>
                    </div>
                    
                    <div style="margin-top:12px;">
                        <div style="display:flex; justify-content:space-between; margin-bottom:8px;">
                            <span>💰 Касса:</span>
                            <span><strong>${revenueFact.toLocaleString()} руб.</strong> / ${block.planRevenue.toLocaleString()} руб.
                                ${revenuePercent >= 100 ? '✅' : (revenuePercent >= 50 ? '📈' : '⚠️')}
                            </span>
                        </div>
                        <div style="background:#e2e8f0; border-radius:10px; height:6px; overflow:hidden;">
                            <div style="width:${Math.min(100, revenuePercent)}%; height:100%; background:#22c55e;"></div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    
    // Дополнительная информация о завершении адаптации
    let completionHtml = '';
    if (currentWeek >= 4) {
        const allTargetsMet = checkAllTargetsMet();
        if (allTargetsMet) {
            completionHtml = `
                <div style="background:#dcfce7; padding:16px; border-radius:16px; margin-top:24px; text-align:center;">
                    <h3>🎉 Поздравляем!</h3>
                    <p>Вы успешно завершили адаптацию. Администратор свяжется с вами для подведения итогов.</p>
                </div>
            `;
        } else {
            completionHtml = `
                <div style="background:#fef9e3; padding:16px; border-radius:16px; margin-top:24px; text-align:center;">
                    <h3>📋 Адаптация завершена</h3>
                    <p>4 недели адаптации прошли. Результаты будут подведены администратором.</p>
                </div>
            `;
        }
    }
    
    container.innerHTML = `
        <div class="training-layout">
            <div class="bp-sidebar" style="width:100%;">
                <div style="margin-bottom:20px;">
                    <button class="btn-back" id="backToModulesBtnAdaptation">← Назад</button>
                </div>
                <h2 style="margin-bottom:24px;">🎯 Адаптация (4 недели)</h2>
                <div style="margin-bottom:16px; padding:12px; background:#eef2ff; border-radius:16px;">
                    📅 Начало адаптации: <strong>${startDateStr}</strong>
                </div>
                ${blocksHtml}
                ${completionHtml}
            </div>
        </div>
    `;
    
    document.getElementById('backToModulesBtnAdaptation').onclick = () => showModulesGrid();
}

function checkAllTargetsMet() {
    // Проверяем, достигнуты ли плановые показатели на 4-й неделе
    const currentWeek = getCurrentAdaptationWeek();
    for (let block of adaptationBlocks) {
        const weekData = adaptationData.find(d => d.week == currentWeek && d.block_name === block.title);
        if (!weekData) return false;
        if (weekData.calls < block.planCalls) return false;
        if (weekData.conversion < block.planConversion) return false;
        if (weekData.revenue < block.planRevenue) return false;
    }
    return true;
}

function showAdaptation() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    loadAdaptationStatus().then(() => loadAdaptationData()).then(() => renderAdaptationModule());
}

// Обновить данные адаптации (для админа или интеграции)
async function updateAdaptationData(phone, week, blockName, calls, conversion, revenue) {
    return await apiCall('updateAdaptationData', { phone, week, block_name: blockName, calls, conversion, revenue });
}