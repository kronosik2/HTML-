// ========== adaptation.js - Модуль Адаптации (рабочая версия с полями) ==========

let adaptationStatus = { accepted: true, acceptedDate: new Date().toISOString() };
let adaptationProgress = { daily: [] };

const dailyPlan = { calls: 35, conversion: 35, revenue: 10000 };

// ========== ЗАГРУЗКА ==========
async function loadAdaptationStatus() {
    if (!window.currentUser || window.isAdminMode) return;
    adaptationStatus = { accepted: true, acceptedDate: adaptationStatus.acceptedDate };
    await loadAdaptationProgress();
    return adaptationStatus;
}

async function loadAdaptationProgress() {
    try {
        const res = await getAdaptationData(window.currentUser.phone);
        if (res && res.length > 0) {
            adaptationProgress.daily = res.map(d => ({
                dayNumber: d.week,
                date: new Date().toISOString(),
                calls: { plan: dailyPlan.calls, fact: d.calls || 0 },
                conversion: { plan: dailyPlan.conversion, fact: d.conversion || 0 },
                revenue: { plan: dailyPlan.revenue, fact: d.revenueNew || 0 },
                completed: (d.calls >= dailyPlan.calls && d.conversion >= dailyPlan.conversion && d.revenueNew >= dailyPlan.revenue),
                weakZones: []
            }));
            adaptationProgress.daily.forEach(day => {
                day.weakZones = [];
                if (day.calls.fact < day.calls.plan) day.weakZones.push('calls');
                if (day.conversion.fact < day.conversion.plan) day.weakZones.push('conversion');
                if (day.revenue.fact < day.revenue.plan) day.weakZones.push('revenue');
                day.completed = day.weakZones.length === 0;
            });
        } else {
            adaptationProgress.daily = [];
        }
    } catch (e) {
        adaptationProgress.daily = [];
    }
}

async function saveDailyProgress(dayNumber, data) {
    try {
        await updateAdaptationData(
            window.currentUser.phone, dayNumber, "daily",
            data.calls.fact, data.conversion.fact, data.revenue.fact, 0
        );
        const existingIndex = adaptationProgress.daily.findIndex(d => d.dayNumber === dayNumber);
        const newEntry = { dayNumber, date: new Date().toISOString(), ...data };
        if (existingIndex >= 0) adaptationProgress.daily[existingIndex] = newEntry;
        else adaptationProgress.daily.push(newEntry);
        adaptationProgress.daily.sort((a, b) => a.dayNumber - b.dayNumber);
    } catch (e) {
        console.error('Ошибка сохранения:', e);
    }
}

function getNextDayNumber() {
    if (adaptationProgress.daily.length === 0) return 1;
    const maxDay = Math.max(...adaptationProgress.daily.map(d => d.dayNumber));
    return maxDay + 1;
}

function getCurrentDayNumber() {
    if (adaptationProgress.daily.length === 0) return 1;
    // Возвращаем последний незавершённый день или следующий номер
    const lastDay = adaptationProgress.daily[adaptationProgress.daily.length - 1];
    if (!lastDay.completed) return lastDay.dayNumber;
    return lastDay.dayNumber + 1;
}

function getCompletedDaysCount() {
    return adaptationProgress.daily.filter(d => d.completed === true).length;
}

function getTotalDaysCount() {
    return adaptationProgress.daily.length;
}

// ========== НАКОПИТЕЛЬНЫЕ РЕКОМЕНДАЦИИ (СЛАБЫЕ ЗОНЫ) ==========
function analyzeAccumulatedWeakZones() {
    const totalDays = adaptationProgress.daily.length;
    if (totalDays === 0) return [];
    
    const stats = { calls: 0, conversion: 0, revenue: 0 };
    
    adaptationProgress.daily.forEach(day => {
        if (day.calls.fact < day.calls.plan) stats.calls++;
        if (day.conversion.fact < day.conversion.plan) stats.conversion++;
        if (day.revenue.fact < day.revenue.plan) stats.revenue++;
    });
    
    const recommendations = [];
    
    if (stats.calls > 0) {
        const percent = Math.round((stats.calls / totalDays) * 100);
        if (percent >= 40) {
            recommendations.push({ 
                metric: "calls", 
                title: "📞 Мало звонков", 
                percent: percent,
                tip: "Активнее работай с входящими и делай больше исходящих звонков",
                searchQuery: "звонки"
            });
        }
    }
    
    if (stats.conversion > 0) {
        const percent = Math.round((stats.conversion / totalDays) * 100);
        if (percent >= 40) {
            recommendations.push({ 
                metric: "conversion", 
                title: "🎯 Низкая конверсия", 
                percent: percent,
                tip: "Изучи скрипты и работу с возражениями, больше слушай клиента",
                searchQuery: "конверсия"
            });
        }
    }
    
    if (stats.revenue > 0) {
        const percent = Math.round((stats.revenue / totalDays) * 100);
        if (percent >= 40) {
            recommendations.push({ 
                metric: "revenue", 
                title: "💰 Недобор по кассе", 
                percent: percent,
                tip: "Предлагай дополнительные услуги и не забывай про повторные продажи",
                searchQuery: "касса"
            });
        }
    }
    
    return recommendations;
}

function getTodayWeakZones(dayData) {
    if (!dayData) return [];
    const zones = [];
    if (dayData.calls.fact < dayData.calls.plan) zones.push({ 
        metric: "calls", 
        title: "Звонки", 
        tip: "Нужно больше обрабатывать входящие",
        searchQuery: "звонки" 
    });
    if (dayData.conversion.fact < dayData.conversion.plan) zones.push({ 
        metric: "conversion", 
        title: "Конверсия", 
        tip: "Проверь скрипты и технику продаж",
        searchQuery: "конверсия" 
    });
    if (dayData.revenue.fact < dayData.revenue.plan) zones.push({ 
        metric: "revenue", 
        title: "Касса", 
        tip: "Предлагай дополнительные услуги",
        searchQuery: "касса" 
    });
    return zones;
}

// ========== ФОРМАТИРОВАНИЕ ЧИСЕЛ ==========
function formatNumberInput(input) {
    let value = input.value.replace(/^0+/, '');
    if (value === '' || value === '-') value = '0';
    input.value = parseInt(value) || 0;
}

// ========== ОТРИСОВКА ==========
function renderAdaptationModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    const currentDayNumber = getCurrentDayNumber();
    const existingToday = adaptationProgress.daily.find(d => d.dayNumber === currentDayNumber);
    
    const todayWeakZones = getTodayWeakZones(existingToday);
    const accumulatedWeakZones = analyzeAccumulatedWeakZones();
    
    const totalDays = getTotalDaysCount();
    const completedDays = getCompletedDaysCount();
    const successRate = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;
    
    const startDate = new Date(adaptationStatus.acceptedDate);
    
    let html = `
        <div class="training-layout">
            <div class="bp-sidebar" style="width:100%;">
                <button class="btn-back" id="backToModulesBtnAdaptation" style="margin-bottom:20px;">← Назад</button>
                
                <!-- Шапка -->
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px; margin-bottom:24px;">
                    <h2 style="margin:0;">🎯 Адаптация</h2>
                    <div style="display:flex; gap:12px;">
                        <div style="background:#eef2ff; padding:6px 14px; border-radius:40px; font-size:14px;">📅 Дней: ${totalDays}</div>
                        <div style="background:#eef2ff; padding:6px 14px; border-radius:40px; font-size:14px;">📊 Успеваемость ${successRate}%</div>
                    </div>
                </div>
                
                <!-- Краткая статистика -->
                <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:12px; margin-bottom:24px;">
                    <div style="background:#f8fafc; border-radius:16px; padding:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:800;">${totalDays}</div>
                        <div style="font-size:12px; color:#64748b;">всего дней</div>
                    </div>
                    <div style="background:#f8fafc; border-radius:16px; padding:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:800; color:#22c55e;">${completedDays}</div>
                        <div style="font-size:12px; color:#64748b;">успешно</div>
                    </div>
                    <div style="background:#f8fafc; border-radius:16px; padding:12px; text-align:center;">
                        <div style="font-size:24px; font-weight:800; color:#ef4444;">${totalDays - completedDays}</div>
                        <div style="font-size:12px; color:#64748b;">провалов</div>
                    </div>
                </div>
                
                <!-- ДНЕВНОЕ ЗАДАНИЕ -->
                <div style="background:white; border-radius:20px; border:2px solid ${existingToday?.completed ? '#22c55e' : '#e2e8f0'}; margin-bottom:20px; overflow:hidden;">
                    <div style="background:${existingToday?.completed ? '#22c55e10' : '#f8fafc'}; padding:12px 20px; border-bottom:1px solid #e2e8f0;">
                        <div style="display:flex; justify-content:space-between; align-items:center;">
                            <strong>📋 День ${currentDayNumber}</strong>
                            ${existingToday?.completed ? '<span style="background:#22c55e20; color:#22c55e; padding:4px 12px; border-radius:40px; font-size:12px;">✅ Выполнено</span>' : (existingToday ? '<span style="background:#fef9e3; padding:4px 12px; border-radius:40px; font-size:12px;">⏳ В работе</span>' : '<span style="background:#eef2ff; padding:4px 12px; border-radius:40px; font-size:12px;">🆕 Новый день</span>')}
                        </div>
                    </div>
                    <div style="padding:20px;">
                        ${!existingToday ? `
                            <div style="text-align:center;">
                                <button id="startDayBtn" class="btn-success" style="padding:12px 32px;">🚀 Начать день ${currentDayNumber}</button>
                            </div>
                        ` : `
                            <div>
                                <!-- План/факт по звонкам -->
                                <div style="margin-bottom:20px; padding:16px; background:#f8fafc; border-radius:16px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                                        <div>
                                            <strong>📞 Звонки</strong>
                                            <div style="font-size:12px; color:#64748b;">план: ${dailyPlan.calls}</div>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span>Факт:</span>
                                            <input type="number" id="factCalls" value="${existingToday.calls.fact}" style="width:100px; padding:8px; border-radius:12px; border:1px solid #cbd5e1; text-align:center;">
                                        </div>
                                        <div style="font-size:20px;">${existingToday.calls.fact >= dailyPlan.calls ? '✅' : '❌'}</div>
                                    </div>
                                </div>
                                
                                <!-- План/факт по конверсии -->
                                <div style="margin-bottom:20px; padding:16px; background:#f8fafc; border-radius:16px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                                        <div>
                                            <strong>🎯 Конверсия %</strong>
                                            <div style="font-size:12px; color:#64748b;">план: ${dailyPlan.conversion}%</div>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span>Факт:</span>
                                            <input type="number" id="factConversion" value="${existingToday.conversion.fact}" style="width:100px; padding:8px; border-radius:12px; border:1px solid #cbd5e1; text-align:center;">
                                        </div>
                                        <div style="font-size:20px;">${existingToday.conversion.fact >= dailyPlan.conversion ? '✅' : '❌'}</div>
                                    </div>
                                </div>
                                
                                <!-- План/факт по кассе -->
                                <div style="margin-bottom:20px; padding:16px; background:#f8fafc; border-radius:16px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
                                        <div>
                                            <strong>💰 Касса от новых</strong>
                                            <div style="font-size:12px; color:#64748b;">план: ${dailyPlan.revenue.toLocaleString()} руб.</div>
                                        </div>
                                        <div style="display:flex; align-items:center; gap:8px;">
                                            <span>Факт:</span>
                                            <input type="number" id="factRevenue" value="${existingToday.revenue.fact}" style="width:120px; padding:8px; border-radius:12px; border:1px solid #cbd5e1; text-align:center;">
                                        </div>
                                        <div style="font-size:20px;">${existingToday.revenue.fact >= dailyPlan.revenue ? '✅' : '❌'}</div>
                                    </div>
                                </div>
                            </div>
                            <div style="display:flex; gap:10px; justify-content:flex-end;">
                                <button id="saveDayBtn" class="btn-primary" style="padding:8px 20px;">💾 Сохранить день ${currentDayNumber}</button>
                            </div>
                        `}
                    </div>
                </div>
                
                <!-- ПОДТЯНИ ЭТО (текущие слабые зоны за сегодня) -->
                ${todayWeakZones.length > 0 && existingToday && !existingToday.completed ? `
                    <div style="background:#fef9e3; border-radius:16px; padding:16px; margin-bottom:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <strong>⚠️ ПОДТЯНИ ЭТО</strong>
                            <span style="font-size:12px; color:#854d0e;">сегодня не выполнил(а)</span>
                        </div>
                        <div style="display:flex; flex-wrap:wrap; gap:12px;">
                            ${todayWeakZones.map(zone => `
                                <button class="weak-zone-btn" data-search="${zone.searchQuery}" style="background:white; border:1px solid #f59e0b; border-radius:40px; padding:6px 16px; cursor:pointer; display:flex; align-items:center; gap:6px;">
                                    ${zone.title} ❌ 
                                    <span style="background:#fef9e3; padding:2px 8px; border-radius:20px; font-size:11px;">📚 учить</span>
                                </button>
                            `).join('')}
                        </div>
                    </div>
                ` : (existingToday?.completed ? `
                    <div style="background:#dcfce7; border-radius:16px; padding:16px; margin-bottom:20px; text-align:center;">
                        🎉 Отлично! День ${currentDayNumber} выполнен!
                    </div>
                ` : '')}
                
                <!-- СЛАБЫЕ ЗОНЫ (накопительные рекомендации) -->
                ${accumulatedWeakZones.length > 0 && totalDays >= 1 ? `
                    <div style="background:#f1f5f9; border-radius:16px; padding:16px; margin-bottom:20px;">
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:12px;">
                            <strong>📊 СЛАБЫЕ ЗОНЫ</strong>
                            <span style="font-size:12px; color:#64748b;">на основе ${totalDays} дней</span>
                        </div>
                        <div style="display:flex; flex-direction:column; gap:12px;">
                            ${accumulatedWeakZones.map(zone => `
                                <div style="background:white; border-radius:12px; padding:12px;">
                                    <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px;">
                                        <div>
                                            <strong>${zone.title}</strong>
                                            <span style="background:#fee2e2; padding:2px 8px; border-radius:20px; font-size:11px; margin-left:8px;">${zone.percent}% дней</span>
                                            <div style="font-size:12px; color:#64748b; margin-top:4px;">${zone.tip}</div>
                                        </div>
                                        <button class="weak-zone-btn" data-search="${zone.searchQuery}" style="background:#22c55e; border:none; border-radius:40px; padding:6px 16px; cursor:pointer; color:white; font-size:12px;">
                                            📚 Изучить
                                        </button>
                                    </div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                ` : (totalDays >= 2 ? `
                    <div style="background:#dcfce7; border-radius:16px; padding:16px; margin-bottom:20px; text-align:center;">
                        🏆 Отличные показатели! Так держать!
                    </div>
                ` : '')}
                
                <!-- История дней (компактная) -->
                ${adaptationProgress.daily.length > 0 ? `
                    <div style="margin-top:20px;">
                        <div style="font-size:13px; color:#64748b; margin-bottom:8px;">📅 Пройденные дни:</div>
                        <div style="display:flex; gap:8px; flex-wrap:wrap;">
                            ${adaptationProgress.daily.slice().reverse().map(day => {
                                const dayOk = day.completed;
                                return `<div class="history-day-btn" data-day="${day.dayNumber}" style="background:${dayOk ? '#22c55e20' : '#fee2e220'}; border:1px solid ${dayOk ? '#22c55e' : '#ef4444'}; border-radius:40px; padding:6px 14px; font-size:13px; cursor:pointer;">
                                    День ${day.dayNumber} ${dayOk ? '✅' : '❌'}
                                </div>`;
                            }).join('')}
                        </div>
                    </div>
                ` : ''}
                
            </div>
        </div>
    `;
    
    container.innerHTML = html;
    
    // Обработчики
    document.getElementById('backToModulesBtnAdaptation').onclick = () => showModulesGrid();
    
    const startBtn = document.getElementById('startDayBtn');
    if (startBtn) {
        startBtn.onclick = () => {
            const newDayNumber = currentDayNumber;
            const newDay = {
                dayNumber: newDayNumber,
                date: new Date().toISOString(),
                calls: { plan: dailyPlan.calls, fact: 0 },
                conversion: { plan: dailyPlan.conversion, fact: 0 },
                revenue: { plan: dailyPlan.revenue, fact: 0 },
                completed: false,
                weakZones: ['calls', 'conversion', 'revenue']
            };
            adaptationProgress.daily.push(newDay);
            renderAdaptationModule();
        };
    }
    
    const saveBtn = document.getElementById('saveDayBtn');
    if (saveBtn) {
        saveBtn.onclick = async () => {
            const dayNumber = currentDayNumber;
            const factCalls = parseInt(document.getElementById('factCalls')?.value) || 0;
            const factConversion = parseInt(document.getElementById('factConversion')?.value) || 0;
            const factRevenue = parseInt(document.getElementById('factRevenue')?.value) || 0;
            
            const weakZones = [];
            if (factCalls < dailyPlan.calls) weakZones.push('calls');
            if (factConversion < dailyPlan.conversion) weakZones.push('conversion');
            if (factRevenue < dailyPlan.revenue) weakZones.push('revenue');
            const completed = weakZones.length === 0;
            
            await saveDailyProgress(dayNumber, {
                calls: { plan: dailyPlan.calls, fact: factCalls },
                conversion: { plan: dailyPlan.conversion, fact: factConversion },
                revenue: { plan: dailyPlan.revenue, fact: factRevenue },
                completed: completed,
                weakZones: weakZones
            });
            renderAdaptationModule();
            showToast(completed ? "🎉 Молодец! День выполнен!" : "⚠️ Сохранено. Работай над слабыми местами!");
        };
    }
    
    // Форматирование ввода чисел
    const factCallsInput = document.getElementById('factCalls');
    const factConversionInput = document.getElementById('factConversion');
    const factRevenueInput = document.getElementById('factRevenue');
    
    if (factCallsInput) {
        factCallsInput.addEventListener('input', () => formatNumberInput(factCallsInput));
    }
    if (factConversionInput) {
        factConversionInput.addEventListener('input', () => formatNumberInput(factConversionInput));
    }
    if (factRevenueInput) {
        factRevenueInput.addEventListener('input', () => formatNumberInput(factRevenueInput));
    }
    
    // Обработчики кнопок слабых зон
    document.querySelectorAll('.weak-zone-btn').forEach(btn => {
        btn.onclick = () => {
            const searchQuery = btn.dataset.search;
            if (typeof window.showKnowledgeWithSearch === 'function') {
                window.showKnowledgeWithSearch(searchQuery);
            } else if (typeof showKnowledge === 'function') {
                showKnowledge();
                showToast(`🔍 Поиск в Базе Знаний: "${searchQuery}"`);
            } else {
                showToast("База Знаний пока не подключена");
            }
        };
    });
    
    // Обработчики истории дней
    document.querySelectorAll('.history-day-btn').forEach(btn => {
        btn.onclick = () => {
            const dayNum = parseInt(btn.dataset.day);
            const day = adaptationProgress.daily.find(d => d.dayNumber === dayNum);
            if (day) {
                const allOk = day.completed;
                showToast(`День ${dayNum}: 📞 ${day.calls.fact}/${day.calls.plan} 🎯 ${day.conversion.fact}/${day.conversion.plan}% 💰 ${day.revenue.fact.toLocaleString()}/${day.revenue.plan.toLocaleString()} — ${allOk ? '✅ Выполнено' : '⚠️ Есть недочёты'}`);
            }
        };
    });
}

function showAdaptation() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    loadAdaptationStatus().then(() => renderAdaptationModule());
}

window.showAdaptation = showAdaptation;