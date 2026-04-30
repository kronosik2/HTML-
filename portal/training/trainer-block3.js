import { bpBlocks } from './blocks.js';
import { saveTrainingProgress, showToast } from './training.js';
import { openExamModal } from './exam.js';

export function openTrainerBlock3(modalToClose) {
    const workers = [
        { id: 1, name: "Сергей", egu: "Еду 1", people: 1, taken: 30, done: 21, percent: 70 },
        { id: 2, name: "Антон", egu: "Еду 1", people: 1, taken: 22, done: 15, percent: 68 },
        { id: 3, name: "Алексей", egu: "Еду 2", people: 2, taken: 40, done: 38, percent: 95 },
        { id: 4, name: "Михаил", egu: "Еду 2", people: 2, taken: 18, done: 17, percent: 94 },
        { id: 5, name: "Дмитрий", egu: "Еду 3", people: 3, taken: 25, done: 24, percent: 96 }
    ];
    let selectedWorkers = [];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    function renderList() {
        const container = modal.querySelector('#workersList');
        container.innerHTML = '';
        workers.forEach(w => {
            const isSelected = selectedWorkers.includes(w.id);
            const ratingClass = w.percent >= 75 ? 'rating-good' : 'rating-bad';
            const card = document.createElement('div');
            card.className = `worker-card ${isSelected ? 'selected' : ''}`;
            card.innerHTML = `
                <div class="worker-info">
                    <h4>${w.name} (${w.egu})</h4>
                    <div>📊 Рейтинг: ${w.percent}%</div>
                    <div>👥 Предоставляет: ${w.people} чел.</div>
                </div>
                <div class="rating-badge ${ratingClass}">${w.percent}% ${w.percent >= 75 ? '✅' : '⚠️'}</div>
            `;
            card.onclick = () => {
                if (isSelected) {
                    selectedWorkers = selectedWorkers.filter(id => id !== w.id);
                } else {
                    selectedWorkers.push(w.id);
                }
                renderList();
                updateComplete();
            };
            container.appendChild(card);
        });
    }
    
    function updateComplete() {
        const total = selectedWorkers.reduce((sum, id) => sum + (workers.find(w => w.id === id)?.people || 0), 0);
        modal.querySelector('#peopleCounter').innerText = total;
        const completeBtn = modal.querySelector('#completeTrainerBtn');
        if (total === 4) {
            completeBtn.disabled = false;
            completeBtn.style.opacity = '1';
        } else {
            completeBtn.disabled = true;
            completeBtn.style.opacity = '0.5';
        }
    }
    
    modal.innerHTML = `
        <div class="modal-content">
            <h3>🎮 Тренажёр: Назначение исполнителя</h3>
            <div class="material-section">
                <div class="section-title">📋 Задание</div>
                <p><strong>Для перевозки пианино нужно 4 человека.</strong> Выберите водителей так, чтобы суммарно они предоставили ровно 4 человека, отдавая приоритет тем, у кого выше процент выполненных заказов.</p>
            </div>
            <div class="trainer-header">
                <div class="selected-counter">👥 Выбрано человек: <span id="peopleCounter">0</span> / 4</div>
            </div>
            <div id="workersList"></div>
            <button id="completeTrainerBtn" class="btn-primary" disabled style="opacity:0.5;">✅ Завершить тренажёр</button>
            <button id="closeTrainerBtn" class="btn-primary" style="background:#e2e8f0; color:#1e293b; margin-top:12px;">Закрыть</button>
        </div>
    `;
    
    document.body.appendChild(modal);
    renderList();
    updateComplete();
    
    modal.querySelector('#completeTrainerBtn').onclick = () => {
        bpBlocks[3].trainerPassed = true;
        saveTrainingProgress();
        modal.remove();
        if (modalToClose) modalToClose.remove();
        showToast("🎉 Тренажёр пройден! Теперь доступен экзамен.");
        openExamModal(3);
    };
    
    modal.querySelector('#closeTrainerBtn').onclick = () => modal.remove();
}
