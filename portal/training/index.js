import { saveTrainingProgress, calculateTrainingStats, showToast, renderTrainingModule } from './training.js';

export let entranceExamStatus = null;
export let entranceExamAnswer = '';

export function loadEntranceExam() {
    if (!window.currentUser || window.isAdminMode) return;
    const savedExam = localStorage.getItem(`entranceExam_${window.currentUser.phone}`);
    if (savedExam) {
        const exam = JSON.parse(savedExam);
        entranceExamStatus = exam.status;
        entranceExamAnswer = exam.answer || '';
    } else {
        entranceExamStatus = null;
        entranceExamAnswer = '';
    }
}

export function saveEntranceExamAnswer(answer) {
    entranceExamAnswer = answer;
    const stats = calculateTrainingStats();
    if (stats.completedCount === stats.total) {
        saveTrainingProgress();
    }
    localStorage.setItem(`entranceExam_${window.currentUser.phone}`, JSON.stringify({ status: entranceExamStatus, answer: entranceExamAnswer }));
}

export function submitEntranceExamForReview(answer) {
    entranceExamAnswer = answer;
    entranceExamStatus = 'pending';
    saveTrainingProgress();
    localStorage.setItem(`entranceExam_${window.currentUser.phone}`, JSON.stringify({ status: entranceExamStatus, answer: entranceExamAnswer }));
}

export function openEntranceExamModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:700px; width:100%;">
            <h2 style="margin-bottom:20px;">🎓 Вступительный экзамен</h2>
            <div style="background:#fef9e3; border-radius:16px; padding:20px; margin-bottom:20px;">
                <p style="font-size:16px; margin-bottom:16px;"><strong>📋 Ситуация:</strong></p>
                <p style="margin-bottom:16px;">Клиент звонит и говорит: «Мне нужно перевезти пианино из квартиры на первом этаже в другую квартиру тоже на первом этаже. Расстояние 5 км. У вас цена 5000 рублей, а в другой фирме мне назвали 3500. Почему у вас дороже?»</p>
                <p style="font-weight:600; margin-bottom:12px;">❓ Вопрос:</p>
                <p>Опишите, как вы ответите клиенту, чтобы аргументировать цену и не потерять заявку.</p>
            </div>
            <div style="margin-bottom:20px;">
                <label style="font-weight:600; display:block; margin-bottom:8px;">✏️ Ваш ответ:</label>
                <textarea id="examAnswer" rows="6" style="width:100%; padding:12px; border:1px solid #cbd5e1; border-radius:16px; font-size:14px;" placeholder="Опишите свои действия и аргументы...">${entranceExamAnswer || ''}</textarea>
            </div>
            <div style="display:flex; gap:12px; justify-content:flex-end;">
                <button id="submitExamBtn" class="btn-success" style="padding:12px 24px;">📨 Отправить на проверку</button>
                <button id="closeExamBtn" class="btn-outline">Закрыть</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    
    modal.querySelector('#submitExamBtn').onclick = () => {
        const answer = modal.querySelector('#examAnswer').value.trim();
        if (!answer) {
            showToast("⚠️ Пожалуйста, напишите ответ перед отправкой");
            return;
        }
        submitEntranceExamForReview(answer);
        modal.remove();
        showToast("📨 Экзамен отправлен на проверку администратору!");
        renderTrainingModule();
    };
    modal.querySelector('#closeExamBtn').onclick = () => modal.remove();
}

export function getEntranceExamButtonHtml() {
    const stats = calculateTrainingStats();
    const allCompleted = stats.completedCount === stats.total;
    
    if (!allCompleted) {
        return '<div style="margin-top:20px; padding:16px; background:#f1f5f9; border-radius:16px; text-align:center; color:#64748b;">🎯 Сначала пройдите все блоки обучения</div>';
    }
    
    if (entranceExamStatus === 'accepted') {
        return '<div style="margin-top:20px; padding:16px; background:#dcfce7; border-radius:16px; text-align:center; color:#15803d;">✅ Вступительный экзамен: ПРИНЯТ! Вы можете переходить к адаптации.</div>';
    } else if (entranceExamStatus === 'rejected') {
        return '<div style="margin-top:20px; padding:16px; background:#fee2e2; border-radius:16px; text-align:center; color:#b91c1c;">❌ Вступительный экзамен: НЕ ПРИНЯТ. Попробуйте ещё раз.</div>';
    } else if (entranceExamStatus === 'pending') {
        return '<div style="margin-top:20px; padding:16px; background:#fef9e3; border-radius:16px; text-align:center;">⏳ Вступительный экзамен на проверке. Ожидайте решения администратора.</div>';
    }
    
    return `<button id="entranceExamBtn" class="btn-primary" style="margin-top:20px; width:100%; padding:14px; font-size:16px;">🎓 Пройти вступительный экзамен</button>`;
}
