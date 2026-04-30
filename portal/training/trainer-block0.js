import { bpBlocks } from './blocks.js';
import { saveTrainingProgress, showToast } from './training.js';
import { openExamModal } from './exam.js';

export function openTrainerBlock0(modalToClose) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    let stepsDone = { phone: false, comment: false, order: false };
    
    function updateSteps() {
        const allDone = stepsDone.phone && stepsDone.comment && stepsDone.order;
        if (allDone) {
            modal.querySelector('#completeTrainerBtn').disabled = false;
            modal.querySelector('#completeTrainerBtn').style.opacity = '1';
        }
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎮 Тренажёр: Приём обращения</h3>
            <div class="instruction-steps">
                <div class="step" id="step1"><div class="step-check"></div><div class="step-text">📞 1. Возьми трубку</div></div>
                <div class="step" id="step2"><div class="step-check"></div><div class="step-text">✏️ 2. Заполни комментарий</div></div>
                <div class="step" id="step3"><div class="step-check"></div><div class="step-text">✅ 3. Нажми «Создать заявку»</div></div>
            </div>
            <div class="crm-mock">
                <div class="call-card">
                    <button class="phone-btn" id="phoneBtn">📞</button>
                    <input type="text" class="comment-input" id="commentInput" placeholder="Введите комментарий...">
                    <button class="create-order-btn" id="orderBtn">📝 Создать заявку</button>
                </div>
            </div>
            <div style="margin-top:24px; text-align:right;">
                <button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить</button>
                <button id="closeTrainerBtn" class="btn-back" style="margin-left:12px;">Закрыть</button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    modal.querySelector('#phoneBtn').onclick = () => {
        stepsDone.phone = true;
        modal.querySelector('#step1 .step-check').classList.add('done');
        modal.querySelector('#step1 .step-text').classList.add('done');
        updateSteps();
        showToast("✅ Трубка взята!");
    };
    
    modal.querySelector('#commentInput').oninput = (e) => {
        if (e.target.value.trim()) {
            stepsDone.comment = true;
            modal.querySelector('#step2 .step-check').classList.add('done');
            modal.querySelector('#step2 .step-text').classList.add('done');
            updateSteps();
            showToast("✅ Комментарий добавлен!");
        }
    };
    
    modal.querySelector('#orderBtn').onclick = () => {
        if (stepsDone.phone && stepsDone.comment) {
            stepsDone.order = true;
            modal.querySelector('#step3 .step-check').classList.add('done');
            modal.querySelector('#step3 .step-text').classList.add('done');
            updateSteps();
            showToast("✅ Заявка создана!");
        } else {
            showToast("⚠️ Сначала возьми трубку и заполни комментарий!");
        }
    };
    
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        if (stepsDone.phone && stepsDone.comment && stepsDone.order) {
            bpBlocks[0].trainerPassed = true;
            saveTrainingProgress();
            modal.remove();
            if (modalToClose) modalToClose.remove();
            showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
            openExamModal(0);
        }
    };
    
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}
