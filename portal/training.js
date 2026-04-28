// ========== training.js - Модуль Обучения (полная версия с текстовками) ==========

// Данные 6 блоков обучения
const bpBlocks = [
    { id: 0, title: "📞 Приём обращения", desc: "Звонок / заявка с сайта / мессенджер", isUnlocked: true,
      goal: "Обработать обращение мгновенно! Шанс продажи увеличивается в 2 раза, если ответить в течение 10 секунд.",
      mandatory: "Позитивный настрой. Клиент чувствует, что ты улыбаешься! ТЫ ЛИЦО КОМПАНИИ.",
      result: "Составленная заявка!", tools: "Скрипт + Настроение + Экспертиза",
     audio: "https://github.com/kronosik2/HTML-/raw/refs/heads/main/audio/1710435302.222577-2024-03-14-16_55-79054053761-.mp3",
      hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      questions: [
          { text: "Какова главная цель приёма обращения?", options: ["Продать сразу", "Обработать мгновновенно и понять потребность", "Собрать контакты"], correct: 1 },
          { text: "По статистике, шанс продажи увеличивается в ... раз, если ответить в течение 10 секунд?", options: ["2 раза", "3 раза", "5 раз"], correct: 0 },
          { text: "Что клиент чувствует по голосу, если менеджер улыбается?", options: ["Раздражение", "Позитивный настрой и доверие", "Безразличие"], correct: 1 },
          { text: "Кто является лицом компании во время звонка?", options: ["Директор", "Менеджер по продажам", "Бухгалтер"], correct: 1 },
          { text: "Что нужно сделать сразу после приветствия?", options: ["Положить трубку", "Понять потребность клиента", "Назвать цену"], correct: 1 }
      ] },
    { id: 1, title: "📝 Составление заявки", desc: "Фиксируем адрес, объём, дату, цену", isUnlocked: false,
      goal: "Оформить заявку верно, без ошибок.",
      mandatory: "Обязательно уточняй детали по работам. Нужно верно передать информацию исполнителям!",
      result: "Оформленная заявка (правильное описание, верный адрес, нужное время!)",
      tools: "CRM + твоя внимательность",
      audio: null, hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      questions: [
          { text: "Что из перечисленного НЕ нужно указывать при составлении заявки?", options: ["Адрес", "Любимый цвет клиента", "Объём работ"], correct: 1 },
          { text: "Для чего нужно подробно описывать фронт работ?", options: ["Чтобы клиент был доволен", "Чтобы исполнители поняли задачу", "Чтобы увеличить чек"], correct: 1 },
          { text: "Что будет, если указать неверный адрес?", options: ["Ничего страшного", "Исполнители приедут не туда", "Клиент заплатит меньше"], correct: 1 },
          { text: "Какой инструмент помогает оформлять заявки?", options: ["Excel", "CRM", "Блокнот"], correct: 1 },
          { text: "Что важно указать в заявке помимо адреса?", options: ["Дату и время", "Цвет машины грузчика", "Опыт грузчика"], correct: 0 }
      ] },
    { id: 2, title: "👥 Назначение исполнителя", desc: "Грузчики / водители / техника", isUnlocked: false,
      goal: "Подобрать подходящих исполнителей под задачу.",
      mandatory: "Учитывай рейтинг исполнителей (количество заказов, % выполненных). % менее 75% — риск срыва.",
      result: "Назначенные исполнители, подтвердившие выход.",
      tools: "CRM (список грузчиков, рейтинг, занятость)",
      audio: null, hasTrainer: true, trainerPassed: false, grade: 0, completed: false,
      questions: [
          { text: "Какой процент выполненных заказов считается надёжным?", options: ["Более 50%", "Более 75%", "100%"], correct: 1 },
          { text: "Что означает низкий процент выполненных заказов (менее 75%)?", options: ["Исполнитель супер-надёжный", "Риск срыва выше", "Он всегда выходит"], correct: 1 },
          { text: "Сколько человек нужно назначить на перевозку пианино в задании?", options: ["2", "3", "4"], correct: 2 },
          { text: "Какой инструмент помогает видеть рейтинг исполнителей?", options: ["Excel", "CRM", "Блокнот"], correct: 1 },
          { text: "Что из перечисленного НЕ влияет на выбор исполнителя?", options: ["Процент выполненных заказов", "Цвет машины", "Количество взятых заказов"], correct: 1 }
      ] },
    { id: 3, title: "⏱️ Контроль / техподдержка", desc: "Следим за приездом, решаем проблемы", isUnlocked: false,
      goal: "Убедиться, что исполнители приехали и работают.",
      mandatory: "Свяжись с исполнителями за час до выезда. Если проблема — предупреди клиента и найди замену.",
      result: "Работа выполнена, клиент доволен.",
      tools: "CRM + телефон + чаты с исполнителями",
      hasTrainer: false, trainerPassed: false, grade: 0, completed: false,
      questions: [{ text: "Что делать при срыве исполнителя?", options: ["Ничего", "Предупредить клиента и найти замену", "Отменить заявку"], correct: 1 }] },
    { id: 4, title: "💰 Получение оплаты", desc: "Деньги от клиента → расчёт с грузчиками", isUnlocked: false,
      goal: "Закрыть финансовый вопрос чисто и быстро.",
      mandatory: "Проверь сумму. При оплате наличными — выдай чек.",
      result: "Деньги получены, грузчики рассчитаны, заявка закрыта.",
      tools: "Касса / эквайринг / расчётный счёт + CRM",
      hasTrainer: false, trainerPassed: false, grade: 0, completed: false,
      questions: [{ text: "Что важно проверить перед оплатой?", options: ["Сумму и способ оплаты", "Только сумму", "Только способ оплаты"], correct: 0 }] },
    { id: 5, title: "🏆 ЗАЯВКА ЗАКРЫТА", desc: "Результат достигнут, клиент доволен", isFinal: true, isUnlocked: false, completed: false, grade: 0 }
];

// Состояние обучения
let trainingCompleted = [false, false, false, false, false, false];
let trainingGrades = [0, 0, 0, 0, 0, 0];
let cheatModeEnabled = false;

const SCRIPT_URL = "https://docs.google.com/document/d/1ySNWcceQLIDYIEs0VgaG6-8cVLgc4oRoMIFR8ZXOgjM/edit?usp=sharing";

// ========== ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ ==========
function updateTrainingUnlockedBlocks() {
    for (let i = 0; i < bpBlocks.length; i++) {
        if (i === 0) bpBlocks[i].isUnlocked = true;
        else if (trainingGrades[i-1] === 5 && trainingCompleted[i-1]) bpBlocks[i].isUnlocked = true;
        else bpBlocks[i].isUnlocked = false;
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
    updateProgressOnServer(
        window.currentUser.phone,
        stats.completedCount,
        stats.avgGrade,
        window.currentUser?.exam_status || 'none',
        window.currentUser?.exam_comment || '',
        window.currentUser?.accepted || false,
        window.currentUser?.accepted_date || ''
    );
}

function loadTrainingProgress() {
    if (!window.currentUser || window.isAdminMode) return;
    const saved = localStorage.getItem(`training_${window.currentUser.phone}`);
    if (saved) {
        const data = JSON.parse(saved);
        trainingCompleted = data.completed || [false, false, false, false, false, false];
        trainingGrades = data.grades || [0, 0, 0, 0, 0, 0];
        if (data.trainerPassed) {
            for (let i = 0; i < bpBlocks.length; i++) {
                if (bpBlocks[i].hasTrainer) bpBlocks[i].trainerPassed = data.trainerPassed[i] || false;
            }
        }
    }
    updateTrainingUnlockedBlocks();
}

// ========== ТРЕНАЖЁРЫ ==========
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
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        bpBlocks[0].trainerPassed = true;
        saveTrainingProgress();
        modal.remove();
        if (modalToClose) modalToClose.remove();
        showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
        openExamModal(0);
    };
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}

function openTrainerBlock1(modalToClose) {
    const modal = document.createElement('div'); modal.className = 'modal';
    let fieldsDone = { city: false, name: false, work: false, price: false, address: false, datetime: false };
    function checkAllDone() {
        if (Object.values(fieldsDone).every(v=>v===true)) { modal.querySelector('#completeTrainerBtn').disabled = false; modal.querySelector('#completeTrainerBtn').style.opacity = '1'; }
    }
    modal.innerHTML = `<div class="modal-content"><h3>🎮 Тренажёр: Составление заявки</h3>
        <div class="material-section"><div class="section-title">🎧 Аудиоразговор с клиентом</div>
        <audio controls style="width:100%; margin-bottom:10px;" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio></div>
        <div class="instruction-steps"><div class="step" id="step1"><div class="step-check"></div><div class="step-text">🏙️ Город</div></div><div class="step" id="step2"><div class="step-check"></div><div class="step-text">👤 Имя клиента</div></div>
        <div class="step" id="step3"><div class="step-check"></div><div class="step-text">📋 Фронт работ</div></div><div class="step" id="step4"><div class="step-check"></div><div class="step-text">💰 Цена</div></div>
        <div class="step" id="step5"><div class="step-check"></div><div class="step-text">📍 Адрес</div></div><div class="step" id="step6"><div class="step-check"></div><div class="step-text">📅 Дата и время</div></div></div>
        <div class="crm-mock"><div class="form-field"><label>Город</label><select id="citySelect"><option value="">Выберите</option><option>Москва</option><option>СПБ</option></select></div>
        <div class="form-field"><label>Имя клиента</label><input type="text" id="clientName" placeholder="Иван"></div>
        <div class="form-field"><label>Фронт работ</label><textarea id="workDesc" rows="2"></textarea></div>
        <div class="form-field"><label>Цена (руб/час)</label><input type="number" id="price" placeholder="500"></div>
        <div class="form-field"><label>Адрес</label><input type="text" id="address" placeholder="ул. Ленина, 10"></div>
        <div class="form-field"><label>Дата и время</label><input type="datetime-local" id="datetime"></div></div>
        <div style="margin-top:24px; text-align:right;"><button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить</button>
        <button id="closeTrainerBtn" class="btn-back" style="margin-left:12px;">Закрыть</button></div></div>`;
    document.body.appendChild(modal);
    const elements = { city: '#citySelect', name: '#clientName', work: '#workDesc', price: '#price', address: '#address', datetime: '#datetime' };
    let stepMap = { city:1, name:2, work:3, price:4, address:5, datetime:6 };
    Object.keys(elements).forEach(key => {
        const el = modal.querySelector(elements[key]);
        const event = (key === 'city') ? 'change' : 'input';
        el.addEventListener(event, () => {
            if (el.value && el.value.toString().trim() !== '') {
                if (!fieldsDone[key]) { fieldsDone[key] = true; modal.querySelector(`#step${stepMap[key]} .step-check`).classList.add('done'); modal.querySelector(`#step${stepMap[key]} .step-text`).classList.add('done'); }
                checkAllDone();
            }
        });
    });
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        if (Object.values(fieldsDone).every(v=>v===true)) {
            bpBlocks[1].trainerPassed = true;
            saveTrainingProgress();
            modal.remove();
            if (modalToClose) modalToClose.remove();
            showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
            openExamModal(1);
        }
    };
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}

function openTrainerBlock2(modalToClose) {
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
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        bpBlocks[2].trainerPassed = true;
        saveTrainingProgress();
        modal.remove();
        if (modalToClose) modalToClose.remove();
        showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
        openExamModal(2);
    };
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}

// ========== ЭКЗАМЕН С АВТООБНОВЛЕНИЕМ ==========
function openExamModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    let qHtml = '';
    if (block.questions) {
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
        <div class="button-group"><button id="submitExam" class="btn-success">Сдать экзамен</button>
        <button class="btn-outline" id="closeBtn">Закрыть</button></div>
        <div id="examResult"></div></div>`;
    document.body.appendChild(modal);
    
    modal.querySelector('#submitExam').onclick = () => {
        if (!block.questions) {
            trainingCompleted[blockIdx] = true;
            trainingGrades[blockIdx] = 5;
            saveTrainingProgress();
            modal.remove();
            renderTrainingModule();
            showToast("Экзамен сдан!");
            return;
        }
        
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
            renderTrainingModule();
            showToast("Экзамен сдан на 5! Следующий блок открыт.");
        } else {
            modal.querySelector('#examResult').innerHTML = `<div style="background:#fee2e2; padding:12px; border-radius:16px; margin-top:16px;">❌ Оценка: ${correct}/5. Попробуйте ещё раз.</div>`;
        }
    };
    modal.querySelector('#closeBtn').onclick = () => modal.remove();
}

function openStudyModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    if (!block.isUnlocked && !block.isFinal) {
        showToast("Сначала сдайте предыдущий блок на 5!");
        return;
    }
    if (trainingCompleted[blockIdx]) {
        showToast("Этот блок уже пройден!");
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    const audioHtml = block.audio ? `<audio controls src="${block.audio}" style="width:100%;"></audio>` : '<p>🎧 Аудио будет позже</p>';
    
    let trainerBtnHtml = '';
    if (block.hasTrainer && !block.trainerPassed) {
        if (blockIdx === 0) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary">🎮 Пройти тренажёр</button>`;
        else if (blockIdx === 1) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary">🎮 Пройти тренажёр</button>`;
        else if (blockIdx === 2) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary">🎮 Пройти тренажёр</button>`;
        else trainerBtnHtml = `<button id="trainerBtn" class="btn-primary">🎮 Пройти тренажёр (демо)</button>`;
    } else if (block.hasTrainer && block.trainerPassed) {
        trainerBtnHtml = '<span class="badge-success" style="padding:8px 16px;">✅ Тренажёр пройден</span>';
    }
    
    const examSection = (!block.hasTrainer || block.trainerPassed) ?
        `<button id="examBtn" class="btn-success">📝 Перейти к экзамену</button>` :
        '<p>🔒 Сначала пройдите тренажёр</p>';
    
    modal.innerHTML = `<div class="modal-content"><h3>${block.title}</h3>
        <div class="material-section" style="background:#fef9e3;">
            <div><strong>🎯 ЦЕЛЬ:</strong> ${block.goal}</div>
            <div style="margin-top:8px;"><strong>⚠️ ОБЯЗАТЕЛЬНО:</strong> ${block.mandatory}</div>
            <div style="margin-top:8px;"><strong>✅ РЕЗУЛЬТАТ:</strong> ${block.result}</div>
            <div style="margin-top:8px;"><strong>🛠️ ИНСТРУМЕНТЫ:</strong> ${block.tools}</div>
        </div>
        <div class="material-section"><h4>🎧 Аудио</h4>${audioHtml}</div>
        <div class="material-section"><h4>📄 Скрипт</h4><a href="${SCRIPT_URL}" target="_blank" class="btn-primary" style="display:inline-block;">Открыть скрипт</a></div>
        <div class="material-section"><div class="button-group">${trainerBtnHtml}</div></div>
        <div class="material-section"><div class="button-group">${examSection}</div></div>
        <button class="btn-outline" id="closeBtn" style="margin-top:12px;">Закрыть</button></div>`;
    document.body.appendChild(modal);
    
    if (block.hasTrainer && !block.trainerPassed) {
        const trainerBtn = modal.querySelector('#trainerBtn');
        if (trainerBtn) {
            trainerBtn.onclick = () => {
                if (blockIdx === 0) openTrainerBlock0(modal);
                else if (blockIdx === 1) openTrainerBlock1(modal);
                else if (blockIdx === 2) openTrainerBlock2(modal);
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
    
    if (!block.hasTrainer || block.trainerPassed) {
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
        showToast(`⚡ Блок "${bpBlocks[blockId].title}" пройден`);
        renderTrainingModule();
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
        
        blocksHtml += `<div class="bp-block-card ${isCompleted ? 'completed' : ''} ${!isUnlocked && !isCompleted ? 'locked-block' : ''}" data-idx="${i}">
            ${cheatMark}
            <div class="bp-card-title">${b.title}</div>
            <div class="bp-card-desc">${b.desc}</div>
            <div class="bp-card-status">
                <span class="badge ${isCompleted ? 'badge-success' : (isUnlocked ? 'badge-warning' : 'badge-secondary')}">
                    ${isCompleted ? '✅ Изучен' : (isUnlocked ? '📖 Доступен' : (b.isFinal ? '🏆 Финал' : '🔒 Закрыт'))}
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
            ${stats.completedCount === stats.total ? '<div style="background:#dcfce7; padding:12px; border-radius:16px;">🎉 Обучение пройдено! Теперь вы можете пройти вступительный экзамен у администратора.</div>' : ''}
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
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    loadTrainingProgress();
    renderTrainingModule();
}

// Глобальная функция для Cheat mode
window.enableCheatMode = () => {
    cheatModeEnabled = true;
    showToast("⚡ Cheat mode включён!");
    if (document.getElementById('trackContent').innerHTML) renderTrainingModule();
};

// Экспортируем функции для main.js
window.showTraining = showTraining;
window.renderTrainingModule = renderTrainingModule;
window.loadTrainingProgress = loadTrainingProgress;
window.calculateTrainingStats = calculateTrainingStats;