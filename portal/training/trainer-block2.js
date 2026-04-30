import { bpBlocks } from './blocks.js';
import { saveTrainingProgress, showToast } from './training.js';
import { openExamModal } from './exam.js';

export function openTrainerBlock2(modalToClose) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    let fieldsDone = { city: false, name: false, work: false, price: false, address: false, datetime: false };
    
    function checkAllDone() {
        if (Object.values(fieldsDone).every(v => v === true)) {
            modal.querySelector('#completeTrainerBtn').disabled = false;
            modal.querySelector('#completeTrainerBtn').style.opacity = '1';
        }
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎮 Тренажёр: Составление заявки</h3>
            <div class="material-section">
                <div class="section-title">🎧 Аудиоразговор с клиентом</div>
                <audio controls style="width:100%; margin-bottom:10px;" src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
            </div>
            <div class="instruction-steps">
                <div class="step" id="step1"><div class="step-check"></div><div class="step-text">🏙️ Город</div></div>
                <div class="step" id="step2"><div class="step-check"></div><div class="step-text">👤 Имя клиента</div></div>
                <div class="step" id="step3"><div class="step-check"></div><div class="step-text">📋 Фронт работ</div></div>
                <div class="step" id="step4"><div class="step-check"></div><div class="step-text">💰 Цена</div></div>
                <div class="step" id="step5"><div class="step-check"></div><div class="step-text">📍 Адрес</div></div>
                <div class="step" id="step6"><div class="step-check"></div><div class="step-text">📅 Дата и время</div></div>
            </div>
            <div class="crm-mock">
                <div class="form-field"><label>Город</label><select id="citySelect"><option value="">Выберите</option><option>Москва</option><option>СПБ</option></select></div>
                <div class="form-field"><label>Имя клиента</label><input type="text" id="clientName" placeholder="Иван"></div>
                <div class="form-field"><label>Фронт работ</label><textarea id="workDesc" rows="2"></textarea></div>
                <div class="form-field"><label>Цена (руб/час)</label><input type="number" id="price" placeholder="500"></div>
                <div class="form-field"><label>Адрес</label><input type="text" id="address" placeholder="ул. Ленина, 10"></div>
                <div class="form-field"><label>Дата и время</label><input type="datetime-local" id="datetime"></div>
            </div>
            <div style="margin-top:24px; text-align:right;">
                <button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить</button>
                <button id="closeTrainerBtn" class="btn-back" style="margin-left:12px;">Закрыть</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    const elements = { city: '#citySelect', name: '#clientName', work: '#workDesc', price: '#price', address: '#address', datetime: '#datetime' };
    const stepMap = { city: 1, name: 2, work: 3, price: 4, address: 5, datetime: 6 };
    
    Object.keys(elements).forEach(key => {
        const el = modal.querySelector(elements[key]);
        const event = (key === 'city') ? 'change' : 'input';
        el.addEventListener(event, () => {
            if (el.value && el.value.toString().trim() !== '') {
                if (!fieldsDone[key]) {
                    fieldsDone[key] = true;
                    modal.querySelector(`#step${stepMap[key]} .step-check`).classList.add('done');
                    modal.querySelector(`#step${stepMap[key]} .step-text`).classList.add('done');
                    checkAllDone();
                }
            }
        });
    });
    
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        if (Object.values(fieldsDone).every(v => v === true)) {
            bpBlocks[2].trainerPassed = true;
            saveTrainingProgress();
            modal.remove();
            if (modalToClose) modalToClose.remove();
            showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
            openExamModal(2);
        }
    };
    
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}
