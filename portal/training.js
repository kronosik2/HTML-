// ========== training.js - Модуль Обучения (расширенная версия) ==========

let cheatModeEnabled = false;

function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

const SCRIPT_URL = "https://docs.google.com/document/d/1ySNWcceQLIDYIEs0VgaG6-8cVLgc4oRoMIFR8ZXOgjM/edit?usp=sharing";

// ========== БЛОКИ ОБУЧЕНИЯ (с видео-сценариями) ==========
const bpBlocks = [
    { id: 0, title: "📞 Приём обращения", desc: "Звонок / заявка с сайта / мессенджер", isUnlocked: true,
      goal: "Обработать обращение мгновенно! Шанс продажи увеличивается в 2 раза, если ответить в течение 10 секунд.",
      mandatory: "Позитивный настрой. Клиент чувствует, что ты улыбаешься! ТЫ ЛИЦО КОМПАНИИ.",
      result: "Составленная заявка!", tools: "Скрипт + Настроение + Экспертиза",
      audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/1710435302.222577-2024-03-14-16_55-79054053761-.mp3",
      hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      videoScript: `
🎥 **Видео-сценарий: Приём обращений**

📌 **Что будет в видео:**
• Запись экрана, голос поверх видео
• Как зайти в Zoomer (CRM)
• Как закреплять за собой звонок
• Что писать в комментарий к обращению

📌 **Ключевые темы:**
• Интерфейс Zoomer
• Правила закрепления звонка
• Структура комментария (проблема, потребность, контакты)
      `,
      questions: [
          { text: "Какова главная цель приёма обращения?", options: ["Продать сразу", "Обработать мгновенно и понять потребность", "Собрать контакты"], correct: 1 },
          { text: "По статистике, шанс продажи увеличивается в ... раз, если ответить в течение 10 секунд?", options: ["2 раза", "3 раза", "5 раз"], correct: 0 },
          { text: "Что клиент чувствует по голосу, если менеджер улыбается?", options: ["Раздражение", "Позитивный настрой и доверие", "Безразличие"], correct: 1 },
          { text: "Кто является лицом компании во время звонка?", options: ["Директор", "Менеджер по продажам", "Бухгалтер"], correct: 1 },
          { text: "Что нужно сделать сразу после приветствия?", options: ["Положить трубку", "Понять потребность клиента", "Назвать цену"], correct: 1 }
      ] },
    { id: 1, title: "💰 Ценообразование", desc: "Как формировать цену и не терять прибыль", isUnlocked: false,
      goal: "Научиться правильно рассчитывать стоимость услуг.",
      mandatory: "Учитывать все затраты и не демпинговать.",
      result: "Прозрачная и выгодная цена для компании и клиента.",
      tools: "Калькулятор стоимости + CRM",
      audio: null, hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      videoScript: `
🎥 **Видео-сценарий: Ценообразование**

📌 **Тренажёр с кейсами:**
• Повышение на 1 пункт
• Повышение на 2 пункта
• Понижение на 3 пункта

📌 **Что тренируем:**
• Аргументация скидки
• Срочные заявки
• Долгие заявки без нагрузки
      `,
      questions: [] },
    { id: 2, title: "📝 Составление заявки", desc: "Фиксируем адрес, объём, дату, цену", isUnlocked: false,
      goal: "Оформить заявку верно, без ошибок.",
      mandatory: "Обязательно уточняй детали по работам. Нужно верно передать информацию исполнителям!",
      result: "Оформленная заявка (правильное описание, верный адрес, нужное время!)",
      tools: "CRM + твоя внимательность",
      audio: null, hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      videoScript: `
🎥 **Видео-сценарий: Составление заявки**

📌 **Типы заявок в тренажёре:**
• 🏙️ Кострома — выгрузка
• 🏠 Обычный переезд (Вологда)
• 🚛 Вывоз мусора (Тюмень)
• 🛠️ Разнорабочий на смену (Орск)
• 🏢 Юр.клиент
• 🌲 Переезд за город

📌 **Ценообразование:**
• Стартовая цена по городу: от 3500 ₽
• Как подсветить минималку
• Интерактив с ценой
• Опция «Газель» для вывоза мусора
      `,
      questions: [
          { text: "Что из перечисленного НЕ нужно указывать при составлении заявки?", options: ["Адрес", "Любимый цвет клиента", "Объём работ"], correct: 1 },
          { text: "Для чего нужно подробно описывать фронт работ?", options: ["Чтобы клиент был доволен", "Чтобы исполнители поняли задачу", "Чтобы увеличить чек"], correct: 1 },
          { text: "Что будет, если указать неверный адрес?", options: ["Ничего страшного", "Исполнители приедут не туда", "Клиент заплатит меньше"], correct: 1 },
          { text: "Какой инструмент помогает оформлять заявки?", options: ["Excel", "CRM", "Блокнот"], correct: 1 },
          { text: "Что важно указать в заявке помимо адреса?", options: ["Дату и время", "Цвет машины грузчика", "Опыт грузчика"], correct: 0 }
      ] },
    { id: 3, title: "👥 Назначение исполнителя", desc: "Грузчики / водители / техника", isUnlocked: false,
      goal: "Подобрать подходящих исполнителей под задачу.",
      mandatory: "Учитывай рейтинг исполнителей (количество заказов, % выполненных). % менее 75% — риск срыва.",
      result: "Назначенные исполнители, подтвердившие выход.",
      tools: "CRM (список грузчиков, рейтинг, занятость)",
      audio: null, hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      videoScript: `
🎥 **Видео-сценарий: Рейтинг исполнителя**

📌 **Формула рейтинга: 3 / 1 / 33%**
• 3 — сколько заявок взял
• 1 — на сколько заявок вышел
• 33% — процент брака (невыхода на заявку)

📌 **Дополнительно:**
• Комментарии грузчику
• Возможность принимать заявку на «Еду 2»
      `,
      questions: [
          { text: "Какой процент выполненных заказов считается надёжным?", options: ["Более 50%", "Более 75%", "100%"], correct: 1 },
          { text: "Что означает низкий процент выполненных заказов (менее 75%)?", options: ["Исполнитель супер-надёжный", "Риск срыва выше", "Он всегда выходит"], correct: 1 },
          { text: "Сколько человек нужно назначить на перевозку пианино в задании?", options: ["2", "3", "4"], correct: 2 },
          { text: "Какой инструмент помогает видеть рейтинг исполнителей?", options: ["Excel", "CRM", "Блокнот"], correct: 1 },
          { text: "Что из перечисленного НЕ влияет на выбор исполнителя?", options: ["Процент выполненных заказов", "Цвет машины", "Количество взятых заказов"], correct: 1 }
      ] },
    { id: 4, title: "⏱️ Контроль / техподдержка", desc: "Следим за приездом, решаем проблемы", isUnlocked: false,
      goal: "Обеспечить бесперебойное выполнение заявки и оперативно решать проблемы.",
      mandatory: "Контролируй прибытие исполнителей, будь на связи с клиентом и бригадой.",
      result: "Заявка выполнена без сбоев, клиент доволен сервисом.",
      tools: "CRM + телефон + чаты с исполнителями",
      audio: null, hasTrainer: false, trainerPassed: false, grade: 0, completed: false,
      videoScript: `
🎥 **Видео-сценарий: Готовность и контроль**

📌 **Что будет в видео:**
• Что такое «готовность» и как её подтверждают исполнители
• Что значит готовность для заявки
• Зачем звонить заказчику до начала заявки
• Как подтверждать актуальность работы
      `,
      questions: [
          { text: "Что нужно сделать за час до выезда исполнителей?", options: ["Позвонить и подтвердить выход", "Отправить смс-уведомление", "Ничего, они сами приедут"], correct: 0 },
          { text: "Исполнитель не вышел на смену. Ваши действия?", options: ["Предупредить клиента и найти замену", "Отменить заявку", "Попросить клиента подождать"], correct: 0 },
          { text: "Клиент жалуется, что грузчики задерживаются. Что делать?", options: ["Извиниться и объяснить ситуацию", "Сказать, что это не ваша проблема", "Положить трубку"], correct: 0 },
          { text: "Какой документ подтверждает выполнение работ?", options: ["Акт выполненных работ", "Договор оферты", "Счёт на оплату"], correct: 0 },
          { text: "Что важно сделать после завершения работ?", options: ["Позвонить клиенту и получить обратную связь", "Сразу выставить счёт", "Забыть про заявку"], correct: 0 }
      ] },
    { id: 5, title: "💰 Получение оплаты", desc: "Деньги от клиента → расчёт с грузчиками", isUnlocked: false,
      goal: "Закрыть финансовый вопрос чисто и быстро.",
      mandatory: "Проверь сумму. При оплате наличными — выдай чек.",
      result: "Деньги получены, грузчики рассчитаны, заявка закрыта.",
      tools: "Касса / эквайринг / расчётный счёт + CRM",
      audio: null, hasTrainer: false, trainerPassed: false, grade: 0, completed: false,
      questions: [
          { text: "Что важно проверить перед оплатой?", options: ["Сумму и способ оплаты", "Только сумму", "Только способ оплаты"], correct: 0 },
          { text: "Клиент хочет оплатить наличными. Ваши действия?", options: ["Принять деньги и выдать чек", "Отказать", "Попросить перевести на карту"], correct: 0 },
          { text: "Что делать, если клиент просит отсрочку платежа?", options: ["Согласовать с руководителем", "Сразу отказать", "Дать отсрочку без согласования"], correct: 0 },
          { text: "Какой документ фиксирует факт оплаты?", options: ["Кассовый чек или квитанция", "Договор", "Акт выполненных работ"], correct: 0 },
          { text: "После получения оплаты нужно:", options: ["Рассчитать исполнителей и закрыть заявку", "Ждать следующего заказа", "Сообщить клиенту об успехе"], correct: 0 }
      ] },
    { id: 6, title: "🏆 ЗАЯВКА ЗАКРЫТА", desc: "Результат достигнут, клиент доволен", isFinal: true, isUnlocked: false, completed: false, grade: 0,
      finalMessage: true,
      questions: [
          { text: "Хочешь работать у нас?", options: ["да", "конечно", "100%"], correct: 0 }
      ] }
];

// Состояние обучения
let trainingCompleted = [false, false, false, false, false, false, false];
let trainingGrades = [0, 0, 0, 0, 0, 0, 0];
let entranceExamStatus = null;
let entranceExamAnswer = '';

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function updateTrainingUnlockedBlocks() {
    for (let i = 0; i < bpBlocks.length; i++) {
        if (i === 0) {
            bpBlocks[i].isUnlocked = true;
        } else if (bpBlocks[i].isFinal) {
            let allPreviousCompleted = true;
            for (let j = 0; j < bpBlocks.length - 1; j++) {
                if (trainingGrades[j] !== 5 || !trainingCompleted[j]) {
                    allPreviousCompleted = false;
                    break;
                }
            }
            bpBlocks[i].isUnlocked = allPreviousCompleted;
        } else {
            if (trainingGrades[i-1] === 5 && trainingCompleted[i-1]) {
                bpBlocks[i].isUnlocked = true;
            } else {
                bpBlocks[i].isUnlocked = false;
            }
        }
    }
}

function calculateTrainingStats() {
    const completedCount = trainingCompleted.filter(v => v === true).length;
    const grades = trainingGrades.filter(g => g > 0);
    const avgGrade = grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
    return { completedCount, total: bpBlocks.length, avgGrade: parseFloat(avgGrade.toFixed(1)) };
}

function saveTrainingProgress() {
    if (!window.currentUser || window.isAdminMode) return;
    const progress = {
        completed: trainingCompleted,
        grades: trainingGrades,
        trainerPassed: bpBlocks.map(b => b.trainerPassed || false)
    };
    localStorage.setItem(`training_${window.currentUser.phone}`, JSON.stringify(progress));
    
    const stats = calculateTrainingStats();
    if (typeof updateProgressOnServer === 'function') {
        updateProgressOnServer(
            window.currentUser.phone,
            stats.completedCount,
            stats.avgGrade,
            entranceExamStatus || 'none',
            entranceExamAnswer || '',
            window.currentUser?.accepted || false,
            window.currentUser?.accepted_date || ''
        );
    }
}

function loadTrainingProgress() {
    if (!window.currentUser || window.isAdminMode) return;
    const saved = localStorage.getItem(`training_${window.currentUser.phone}`);
    if (saved) {
        const data = JSON.parse(saved);
        trainingCompleted = data.completed || [false, false, false, false, false, false, false];
        trainingGrades = data.grades || [0, 0, 0, 0, 0, 0, 0];
        if (data.trainerPassed) {
            for (let i = 0; i < bpBlocks.length; i++) {
                if (bpBlocks[i].hasTrainer) bpBlocks[i].trainerPassed = data.trainerPassed[i] || false;
            }
        }
    }
    updateTrainingUnlockedBlocks();
}

// ========== ТРЕНАЖЁРЫ ==========
function openPricingTrainer(modalToClose) {
    let step = 0;
    const cases = [
        { title: "Кейс 1: Повышение на 1 пункт", desc: "Клиент просит скидку 500₽. Как ответить?", options: ["Дать скидку", "Предложить упаковку в подарок", "Сказать, что цена фиксированная"], correct: 1, explanation: "Лучше предложить бонус, чем просто скидку — сохраняешь маржу." },
        { title: "Кейс 2: Повышение на 2 пункта", desc: "Срочная заявка через 2 часа. На сколько повысить цену?", options: ["+0%", "+20%", "+50%"], correct: 1, explanation: "Срочность = повышение на 20-30%." },
        { title: "Кейс 3: Понижение на 3 пункта", desc: "Долгая заявка без нагрузки. Как поступить?", options: ["Сделать скидку 15%", "Не брать заявку", "Оставить цену без изменений"], correct: 0, explanation: "Лучше сделать небольшую скидку, чем терять заявку." }
    ];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    function renderCase() {
        const c = cases[step];
        modal.innerHTML = `
            <div class="modal-content">
                <h3>💰 Ценообразование — ${c.title}</h3>
                <div style="margin:20px 0"><strong>Ситуация:</strong> ${c.desc}</div>
                <div style="display:flex; flex-direction:column; gap:12px;">
                    ${c.options.map((opt, idx) => `<button class="btn-opt" data-opt="${idx}" style="padding:12px; border-radius:16px; border:1px solid #cbd5e1; background:white; cursor:pointer;">${opt}</button>`).join('')}
                </div>
                <div id="explanation" style="margin-top:20px; padding:12px; border-radius:12px; display:none;"></div>
                <div style="margin-top:24px;"><button id="nextBtn" class="btn-primary" style="display:none;">Следующий кейс →</button></div>
                <button class="btn-outline" id="closePricingBtn" style="margin-top:16px;">Закрыть</button>
            </div>
        `;
        document.body.appendChild(modal);
        
        document.querySelectorAll('.btn-opt').forEach(btn => {
            btn.onclick = () => {
                const selected = parseInt(btn.dataset.opt);
                const isCorrect = (selected === c.correct);
                const explDiv = modal.querySelector('#explanation');
                explDiv.style.display = 'block';
                explDiv.style.background = isCorrect ? '#dcfce7' : '#fee2e2';
                explDiv.innerHTML = `<strong>${isCorrect ? '✅ Правильно!' : '❌ Неверно'}</strong><br>${c.explanation}`;
                document.querySelectorAll('.btn-opt').forEach(b => b.disabled = true);
                modal.querySelector('#nextBtn').style.display = 'block';
            };
        });
        
        modal.querySelector('#nextBtn').onclick = () => {
            step++;
            if (step < cases.length) {
                modal.remove();
                renderCase();
            } else {
                bpBlocks[1].trainerPassed = true;
                saveTrainingProgress();
                modal.remove();
                if (modalToClose) modalToClose.remove();
                showToast("🎉 Тренажёр по ценообразованию пройден!");
                openExamModal(1);
            }
        };
        modal.querySelector('#closePricingBtn').onclick = () => modal.remove();
    }
    renderCase();
}

// ========== ОБНОВЛЁННЫЙ ТРЕНАЖЁР СОСТАВЛЕНИЯ ЗАЯВКИ ==========
function openOrderTypesTrainer(modalToClose) {
    const orderTypes = [
        { 
            title: "🏙️ Кострома — выгрузка", 
            desc: "Грузчики на выгрузку, 400₽/ч", 
            basePrice: 4000, 
            audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/kostroma-vigruzka.mp3",
            city: "Кострома"
        },
        { 
            title: "🏠 Обычный переезд", 
            desc: "Перевозка мебели, Вологда, 500₽/ч", 
            basePrice: 5000, 
            audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/pereezd-vologda.mp3",
            city: "Вологда"
        },
        { 
            title: "🚛 Вывоз мусора", 
            desc: "Тюмень, 500₽/ч + газель 4000₽", 
            basePrice: 5000, 
            audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/tumen-vivozmusora.mp3",
            city: "Тюмень",
            gazelleNeeded: true
        },
        { 
            title: "🛠️ Разнорабочий на смену", 
            desc: "Орск, 450₽/ч, смена 8ч", 
            basePrice: 3600, 
            audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/orsk-raznorabochii.mp3",
            city: "Орск"
        },
        { 
            title: "🏢 Юр.клиент", 
            desc: "Офисный переезд, полный спектр услуг", 
            basePrice: 12000, 
            audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/ur-client.mp3",
            city: "Москва"
        },
        { 
            title: "🌲 Переезд за город", 
            desc: "Из города в область, дача, мебель", 
            basePrice: 9000, 
            audio: null,
            city: "Москва"
        }
    ];
    
    let currentIndex = 0;
    const cityMinPrice = 3500;
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    function renderOrder() {
        const order = orderTypes[currentIndex];
        
        let audioHtml = '';
        if (order.audio) {
            audioHtml = `
                <div class="material-section" style="margin-bottom:16px;">
                    <strong>🎧 Аудиопример звонка:</strong>
                    <audio controls src="${order.audio}" style="width:100%; margin-top:8px;"></audio>
                </div>
            `;
        }
        
        modal.innerHTML = `
            <div class="modal-content" style="max-width:650px; width:100%;">
                <h3>📋 Составление заявки: ${order.title}</h3>
                <div style="margin:16px 0"><strong>Город:</strong> ${order.city}</div>
                <div style="margin:16px 0"><strong>Описание:</strong> ${order.desc}</div>
                <div style="margin:16px 0"><strong>💰 Стартовая цена (минималка по городу):</strong> от ${cityMinPrice} ₽</div>
                
                ${audioHtml}
                
                <div style="margin:16px 0">
                    <label><strong>Укажите итоговую цену для клиента (₽):</strong></label>
                    <input type="number" id="priceInput" value="${order.basePrice}" style="width:100%; padding:10px; margin-top:8px; border-radius:12px; border:1px solid #cbd5e1;">
                </div>
                
                ${order.gazelleNeeded ? `
                    <div style="margin:16px 0">
                        <label style="display:flex; align-items:center; gap:12px; cursor:pointer;">
                            <input type="checkbox" id="gazelleCheckbox" style="width:20px; height:20px;">
                            <strong>🚛 Нужна газель (+4000 ₽ к цене)</strong>
                        </label>
                    </div>
                ` : ''}
                
                <div id="feedback" style="margin-top:16px; padding:12px; border-radius:12px; display:none;"></div>
                
                <div style="margin-top:24px; display:flex; gap:12px; justify-content:space-between;">
                    <button id="checkPriceBtn" class="btn-primary">Проверить цену</button>
                    <button id="nextOrderBtn" class="btn-primary" style="display:none;">Следующая заявка →</button>
                </div>
                <button class="btn-outline" id="closeOrderBtn" style="margin-top:16px;">Закрыть</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        if (order.gazelleNeeded) {
            const gazelleCheckbox = modal.querySelector('#gazelleCheckbox');
            const priceInput = modal.querySelector('#priceInput');
            if (gazelleCheckbox) {
                gazelleCheckbox.onchange = () => {
                    let base = order.basePrice;
                    if (gazelleCheckbox.checked) {
                        priceInput.value = base + 4000;
                    } else {
                        priceInput.value = base;
                    }
                };
            }
        }
        
        modal.querySelector('#checkPriceBtn').onclick = () => {
            let price = parseInt(modal.querySelector('#priceInput').value);
            const feedback = modal.querySelector('#feedback');
            const minAcceptable = cityMinPrice;
            
            if (price >= order.basePrice) {
                feedback.style.display = 'block';
                feedback.style.background = '#dcfce7';
                feedback.innerHTML = `✅ Отличная цена! (${price} ₽)<br>• Минималка по городу: ${minAcceptable} ₽<br>• Рекомендуемая стартовая: от ${order.basePrice} ₽`;
            } else if (price >= minAcceptable) {
                feedback.style.display = 'block';
                feedback.style.background = '#fef9e3';
                feedback.innerHTML = `⚠️ Цена ${price} ₽ — приемлемо, но вы могли бы взять выше.<br>• Минималка по городу: ${minAcceptable} ₽<br>• Рекомендуемая: от ${order.basePrice} ₽`;
            } else {
                feedback.style.display = 'block';
                feedback.style.background = '#fee2e2';
                feedback.innerHTML = `❌ Цена ${price} ₽ — ниже минимальной по городу!<br>• Минималка: ${minAcceptable} ₽<br>• Рекомендуемая: от ${order.basePrice} ₽`;
            }
            modal.querySelector('#checkPriceBtn').disabled = true;
            modal.querySelector('#nextOrderBtn').style.display = 'block';
        };
        
        modal.querySelector('#nextOrderBtn').onclick = () => {
            currentIndex++;
            if (currentIndex < orderTypes.length) {
                modal.remove();
                renderOrder();
            } else {
                bpBlocks[2].trainerPassed = true;
                saveTrainingProgress();
                modal.remove();
                if (modalToClose) modalToClose.remove();
                showToast("🎉 Тренажёр по составлению заявок пройден!");
                openExamModal(2);
            }
        };
        
        modal.querySelector('#closeOrderBtn').onclick = () => modal.remove();
    }
    
    renderOrder();
}

function openTrainerBlock0(modalToClose) {
    const modal = document.createElement('div'); modal.className = 'modal';
    let stepsDone = { phone: false, comment: false, order: false };
    function updateSteps() {
        const allDone = stepsDone.phone && stepsDone.comment && stepsDone.order;
        if (allDone) { modal.querySelector('#completeTrainerBtn').disabled = false; modal.querySelector('#completeTrainerBtn').style.opacity = '1'; }
    }
    modal.innerHTML = `<div class="modal-content"><h3>🎮 Тренажёр: Приём обращения</h3>
        <div class="instruction-steps"><div class="step" id="step1"><div class="step-check"></div><div class="step-text">📞 1. Возьми трубку</div></div>
        <div class="step" id="step2"><div class="step-check"></div><div class="step-text">✏️ 2. Заполни комментарий</div></div>
        <div class="step" id="step3"><div class="step-check"></div><div class="step-text">✅ 3. Нажми «Создать заявку»</div></div></div>
        <div class="crm-mock"><div class="call-card"><button class="phone-btn" id="phoneBtn">📞</button>
        <input type="text" class="comment-input" id="commentInput" placeholder="Введите комментарий...">
        <button class="create-order-btn" id="orderBtn">📝 Создать заявку</button></div></div>
        <div style="margin-top:24px; text-align:right;"><button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить</button>
        <button id="closeTrainerBtn" class="btn-back" style="margin-left:12px;">Закрыть</button></div></div>`;
    document.body.appendChild(modal);
    modal.querySelector('#phoneBtn').onclick = () => { stepsDone.phone = true; modal.querySelector('#step1 .step-check').classList.add('done'); modal.querySelector('#step1 .step-text').classList.add('done'); updateSteps(); showToast("✅ Трубка взята!"); };
    modal.querySelector('#commentInput').oninput = (e) => { if (e.target.value.trim()) { stepsDone.comment = true; modal.querySelector('#step2 .step-check').classList.add('done'); modal.querySelector('#step2 .step-text').classList.add('done'); updateSteps(); showToast("✅ Комментарий добавлен!"); } };
    modal.querySelector('#orderBtn').onclick = () => { if (stepsDone.phone && stepsDone.comment) { stepsDone.order = true; modal.querySelector('#step3 .step-check').classList.add('done'); modal.querySelector('#step3 .step-text').classList.add('done'); updateSteps(); showToast("✅ Заявка создана!"); } else { showToast("⚠️ Сначала возьми трубку и заполни комментарий!"); } };
    modal.querySelector('#completeTrainerBtn').onclick = () => { if (stepsDone.phone && stepsDone.comment && stepsDone.order) { bpBlocks[0].trainerPassed = true; saveTrainingProgress(); modal.remove(); if (modalToClose) modalToClose.remove(); showToast("🎉 Тренажёр пройден! Теперь доступен экзамен."); openExamModal(0); } };
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}

function openTrainerBlock3(modalToClose) {
    const workers = [
        { id: 1, name: "Сергей", egu: "Еду 1", people: 1, taken: 30, done: 21, percent: 70 },
        { id: 2, name: "Антон", egu: "Еду 1", people: 1, taken: 22, done: 15, percent: 68 },
        { id: 3, name: "Алексей", egu: "Еду 2", people: 2, taken: 40, done: 38, percent: 95 },
        { id: 4, name: "Михаил", egu: "Еду 2", people: 2, taken: 18, done: 17, percent: 94 },
        { id: 5, name: "Дмитрий", egu: "Еду 3", people: 3, taken: 25, done: 24, percent: 96 }
    ];
    let selectedWorkers = [];
    const modal = document.createElement('div'); modal.className = 'modal';
    function renderList() {
        const container = modal.querySelector('#workersList');
        container.innerHTML = '';
        workers.forEach(w => {
            const isSelected = selectedWorkers.includes(w.id);
            const ratingClass = w.percent >= 75 ? 'rating-good' : 'rating-bad';
            const card = document.createElement('div');
            card.className = `worker-card ${isSelected ? 'selected' : ''}`;
            card.innerHTML = `<div class="worker-info"><h4>${w.name} (${w.egu})</h4><div>📊 Рейтинг: ${w.percent}%</div><div>👥 Предоставляет: ${w.people} чел.</div></div><div class="rating-badge ${ratingClass}">${w.percent}% ${w.percent>=75?'✅':'⚠️'}</div>`;
            card.onclick = () => {
                if (isSelected) selectedWorkers = selectedWorkers.filter(id=>id!==w.id);
                else selectedWorkers.push(w.id);
                renderList();
                updateComplete();
            };
            container.appendChild(card);
        });
    }
    function updateComplete() {
        const total = selectedWorkers.reduce((sum, id) => sum + (workers.find(w=>w.id===id)?.people||0),0);
        modal.querySelector('#peopleCounter').innerText = total;
        const completeBtn = modal.querySelector('#completeTrainerBtn');
        if (total === 4) { completeBtn.disabled = false; completeBtn.style.opacity = '1'; }
        else { completeBtn.disabled = true; completeBtn.style.opacity = '0.5'; }
    }
    modal.innerHTML = `<div class="modal-content"><h3>🎮 Тренажёр: Назначение исполнителя</h3>
        <div class="material-section"><div class="section-title">📋 Задание</div><p><strong>Для перевозки пианино нужно 4 человека.</strong> Выберите водителей так, чтобы суммарно они предоставили ровно 4 человека, отдавая приоритет тем, у кого выше процент выполненных заказов.</p></div>
        <div class="trainer-header"><div class="selected-counter">👥 Выбрано человек: <span id="peopleCounter">0</span> / 4</div></div>
        <div id="workersList"></div>
        <button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить тренажёр</button>
        <button id="closeTrainerBtn" class="btn-primary" style="background:#e2e8f0; color:#1e293b; margin-top:12px;">Закрыть</button></div>`;
    document.body.appendChild(modal);
    renderList(); updateComplete();
    modal.querySelector('#completeTrainerBtn').onclick = () => { bpBlocks[3].trainerPassed = true; saveTrainingProgress(); modal.remove(); if (modalToClose) modalToClose.remove(); showToast("🎉 Тренажёр пройден! Теперь доступен экзамен."); openExamModal(3); };
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}

// ========== ЭКЗАМЕНЫ ==========
function openExamModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    if (block.finalMessage) {
        modal.innerHTML = `<div class="modal-content" style="text-align:center;">
            <h1 style="font-size:48px; color:#22c55e;">🏆</h1>
            <h1 style="font-size:36px; font-weight:800; color:#22c55e; margin:20px 0;">ЕБАТЬ ТЫ МОЛОДЕЦ!</h1>
            <p style="font-size:18px; margin:20px 0;">Ты прошёл весь курс обучения!</p>
            <div class="exam-question" style="margin:20px 0;">
                <p style="font-size:18px; font-weight:600;">${block.questions[0].text}</p>
                ${block.questions[0].options.map((opt, idx) => `<label class="exam-option"><input type="radio" name="final" value="${idx}"> ${opt}</label>`).join('')}
            </div>
            <div class="button-group"><button id="submitExam" class="btn-success">🎉 Завершить обучение</button></div>
            <div id="examResult"></div>
        </div>`;
        document.body.appendChild(modal);
        
        modal.querySelector('#submitExam').onclick = () => {
            trainingCompleted[blockIdx] = true;
            trainingGrades[blockIdx] = 5;
            saveTrainingProgress();
            modal.remove();
            updateTrainingUnlockedBlocks();
            renderTrainingModule();
            showToast("🎉 Поздравляем! Вы завершили обучение!");
        };
        return;
    }
    
    let qHtml = '';
    if (block.questions && block.questions.length) {
        block.questions.forEach((q, idx) => {
            qHtml += `<div class="exam-question"><p><strong>${idx+1}. ${q.text}</strong></p>`;
            q.options.forEach((opt, optIdx) => {
                qHtml += `<label class="exam-option"><input type="radio" name="q${idx}" value="${optIdx}"> ${opt}</label>`;
            });
            qHtml += `</div>`;
        });
    }
    
    modal.innerHTML = `<div class="modal-content"><h3>📝 Экзамен: ${block.title}</h3>
        <div id="examQuestions">${qHtml}</div>
        <div class="button-group" style="display:flex; gap:12px; margin-top:20px;">
            <button id="submitExam" class="btn-success">Сдать экзамен</button>
            <button class="btn-outline" id="closeBtn">Закрыть</button>
        </div>
        <div id="examResult" style="margin-top:16px;"></div>
    </div>`;
    document.body.appendChild(modal);
    
    modal.querySelector('#submitExam').onclick = () => {
        let correct = 0;
        block.questions.forEach((q, idx) => {
            const selected = modal.querySelector(`input[name="q${idx}"]:checked`);
            if (selected && parseInt(selected.value) === q.correct) correct++;
        });
        
        if (correct === 5) {
            trainingCompleted[blockIdx] = true;
            trainingGrades[blockIdx] = 5;
            saveTrainingProgress();
            modal.remove();
            updateTrainingUnlockedBlocks();
            renderTrainingModule();
            showToast(`✅ Экзамен сдан! Следующий блок открыт.`);
        } else {
            modal.querySelector('#examResult').innerHTML = `<div style="background:#fee2e2; padding:12px; border-radius:16px;">❌ Оценка: ${correct}/5. Нужно 5 правильных ответов.</div>`;
        }
    };
    modal.querySelector('#closeBtn').onclick = () => modal.remove();
}

// ========== ОТКРЫТИЕ МОДАЛКИ БЛОКА (с видео-сценариями) ==========
function openStudyModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    
    if (block.finalMessage) {
        openExamModal(blockIdx);
        return;
    }
    
    if (!block.isUnlocked && !block.isFinal) {
        showToast("Сначала сдайте предыдущий блок на 5!");
        return;
    }
    
    const isAlreadyCompleted = trainingCompleted[blockIdx];
    const modal = document.createElement('div');
    modal.className = 'modal';
    const audioHtml = block.audio ? `<audio controls src="${block.audio}" style="width:100%;"></audio>` : '<p>🎧 Аудио будет позже</p>';
    
    let trainerBtnHtml = '';
    if (block.hasTrainer && !block.trainerPassed && !isAlreadyCompleted) {
        if (blockIdx === 0) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
        else if (blockIdx === 1) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр (ценообразование)</button>`;
        else if (blockIdx === 2) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр (заявки)</button>`;
        else if (blockIdx === 3) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
        else trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
    } else if (block.hasTrainer && (block.trainerPassed || isAlreadyCompleted)) {
        trainerBtnHtml = '<span class="badge-success" style="display:inline-block; padding:8px 16px;">✅ Тренажёр пройден</span>';
    }
    
    let examSection = '';
    if (isAlreadyCompleted) {
        examSection = '<div style="background:#dcfce7; padding:12px; border-radius:16px; text-align:center;">✅ Экзамен сдан! Ты уже прошел этот блок.</div>';
    } else if (!block.hasTrainer || block.trainerPassed) {
        examSection = `<button id="examBtn" class="btn-success" style="width:100%;">📝 Перейти к экзамену</button>`;
    } else {
        examSection = '<p style="text-align:center;">🔒 Сначала пройдите тренажёр</p>';
    }
    
    let videoScriptHtml = '';
    if (block.videoScript) {
        videoScriptHtml = `
            <div class="material-section" style="background:#1e293b; color:white; margin-bottom:16px; border-radius:16px; padding:20px;">
                <div style="font-size:18px; font-weight:600; margin-bottom:12px;">🎥 Скоро здесь появится видео</div>
                <div style="font-size:14px; opacity:0.9; white-space:pre-wrap;">${block.videoScript}</div>
            </div>
        `;
    }
    
    modal.innerHTML = `
    <div class="modal-content" style="max-width:600px; width:100%;">
        <h3 style="margin-bottom:20px;">${block.title}</h3>
        ${videoScriptHtml}
        <div class="material-section" style="background:#fef9e3; margin-bottom:16px;">
            <div><strong>🎯 ЦЕЛЬ:</strong> ${block.goal}</div>
            <div style="margin-top:8px;"><strong>⚠️ ОБЯЗАТЕЛЬНО:</strong> ${block.mandatory}</div>
            <div style="margin-top:8px;"><strong>✅ РЕЗУЛЬТАТ:</strong> ${block.result}</div>
            <div style="margin-top:8px;"><strong>🛠️ ИНСТРУМЕНТЫ:</strong> ${block.tools}</div>
        </div>
        <div class="material-section" style="margin-bottom:16px;">
            <h4>🎧 Аудио</h4>
            ${audioHtml}
        </div>
        <div class="material-section" style="margin-bottom:16px;">
            <h4>📄 Скрипт</h4>
            <a href="${SCRIPT_URL}" target="_blank" class="btn-primary" style="display:inline-block;">Открыть скрипт</a>
        </div>
        ${trainerBtnHtml ? `<div class="material-section" style="margin-bottom:16px;">${trainerBtnHtml}</div>` : ''}
        <div class="material-section" style="margin-bottom:16px;">${examSection}</div>
        <div style="display:flex; justify-content:flex-end; margin-top:20px;">
            <button class="btn-outline" id="closeBtn" style="padding:8px 24px;">Закрыть</button>
        </div>
    </div>`;
    
    document.body.appendChild(modal);
    
    if (block.hasTrainer && !block.trainerPassed && !isAlreadyCompleted) {
        const trainerBtn = modal.querySelector('#trainerBtn');
        if (trainerBtn) {
            trainerBtn.onclick = () => {
                if (blockIdx === 0) openTrainerBlock0(modal);
                else if (blockIdx === 1) openPricingTrainer(modal);
                else if (blockIdx === 2) openOrderTypesTrainer(modal);
                else if (blockIdx === 3) openTrainerBlock3(modal);
                else {
                    bpBlocks[blockIdx].trainerPassed = true;
                    saveTrainingProgress();
                    modal.remove();
                    showToast("Тренажёр пройден!");
                    openExamModal(blockIdx);
                }
            };
        }
    }
    
    if (!isAlreadyCompleted && (!block.hasTrainer || block.trainerPassed)) {
        modal.querySelector('#examBtn')?.addEventListener('click', () => {
            modal.remove();
            openExamModal(blockIdx);
        });
    }
    modal.querySelector('#closeBtn').onclick = () => modal.remove();
}

function completeBlockViaCheat(blockId) {
    if (!cheatModeEnabled) return;
    if (!trainingCompleted[blockId]) {
        trainingCompleted[blockId] = true;
        trainingGrades[blockId] = 5;
        if (bpBlocks[blockId].hasTrainer) bpBlocks[blockId].trainerPassed = true;
        saveTrainingProgress();
        updateTrainingUnlockedBlocks();
        renderTrainingModule();
        showToast(`⚡ Блок "${bpBlocks[blockId].title}" пройден`);
    }
}

// ========== ОТРИСОВКА МОДУЛЯ ОБУЧЕНИЯ ==========
function renderTrainingModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    const stats = calculateTrainingStats();
    const percent = (stats.completedCount / stats.total) * 100;
    let blocksHtml = '';
    
    for (let i = 0; i < bpBlocks.length; i++) {
        const b = bpBlocks[i];
        const isCompleted = trainingCompleted[i];
        const isUnlocked = b.isUnlocked || b.isFinal;
        const grade = trainingGrades[i];
        const cheatMark = cheatModeEnabled ? `<div class="cheat-mark" data-idx="${i}">✓</div>` : '';
        
        let statusText = '';
        if (isCompleted) statusText = '✅ Изучен';
        else if (isUnlocked) statusText = '📖 Доступен';
        else if (b.isFinal) statusText = '🏆 Финал';
        else statusText = '🔒 Закрыт';
        
        blocksHtml += `<div class="bp-block-card ${isCompleted ? 'completed' : ''} ${!isUnlocked && !isCompleted ? 'locked-block' : ''}" data-idx="${i}">
            ${cheatMark}
            <div class="bp-card-title">${b.title}</div>
            <div class="bp-card-desc">${b.desc}</div>
            <div class="bp-card-status">
                <span class="badge ${isCompleted ? 'badge-success' : (isUnlocked ? 'badge-warning' : 'badge-secondary')}">
                    ${statusText}
                </span>
                ${grade > 0 ? `<span>🎓 ${grade}/5</span>` : ''}
            </div>
        </div>`;
    }
    
    container.innerHTML = `<div class="training-layout">
        <div class="bp-sidebar">
            ${cheatModeEnabled ? '<div class="cheat-checkbox">⚡ Cheat mode ВКЛЮЧЁН</div>' : ''}
            <div class="bp-block-list">${blocksHtml}</div>
        </div>
        <div class="progress-sidebar">
            <div class="progress-stats"><h4>📊 Прогресс</h4><div class="progress-bar-bg"><div class="progress-bar-fill" style="width:${percent}%"></div></div><p>${stats.completedCount} из ${stats.total} блоков</p></div>
            <div class="grade-box"><div>🏆 Средняя оценка</div><div class="grade-number">${stats.avgGrade} / 5</div></div>
        </div>
    </div>`;
    
    document.querySelectorAll('.bp-block-card').forEach(card => {
        card.onclick = (e) => {
            if (e.target.classList.contains('cheat-mark')) return;
            const idx = parseInt(card.dataset.idx);
            openStudyModal(idx);
        };
    });
    
    if (cheatModeEnabled) {
        document.querySelectorAll('.cheat-mark').forEach(mark => {
            mark.onclick = (e) => {
                e.stopPropagation();
                const idx = parseInt(mark.dataset.idx);
                completeBlockViaCheat(idx);
            };
        });
    }
}

function showTraining() {
    const modulesGrid = document.getElementById('modulesGrid');
    const backBtn = document.getElementById('backToModulesBtn');
    const trackContent = document.getElementById('trackContent');
    
    if (modulesGrid) modulesGrid.style.display = 'none';
    if (backBtn) backBtn.style.display = 'inline-block';
    
    if (trackContent) trackContent.innerHTML = '<div style="text-align:center; padding:40px;">Загрузка...</div>';
    
    loadTrainingProgress();
    renderTrainingModule();
}

// ========== ГЛОБАЛЬНЫЕ ФУНКЦИИ ДЛЯ main.js ==========
window.showTraining = showTraining;
window.renderTrainingModule = renderTrainingModule;
window.loadTrainingProgress = loadTrainingProgress;
window.calculateTrainingStats = calculateTrainingStats;

window.enableCheatMode = () => {
    cheatModeEnabled = true;
    showToast("⚡ Cheat mode включён! Теперь можно отмечать блоки галочками.");
    renderTrainingModule();
};

console.log('✅ training.js загружен, глобальные функции зарегистрированы');
