import { bpBlocks } from './blocks.js';
import { trainingCompleted, trainingGrades, cheatModeEnabled, calculateTrainingStats, showToast } from './training.js';
import { openStudyModal } from './exam.js';
import { getEntranceExamButtonHtml, entranceExamStatus, entranceExamAnswer, openEntranceExamModal } from './entrance-exam.js';

export function renderTrainingModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    const stats = calculateTrainingStats();
    const percent = (stats.completedCount / stats.total) * 100;
    let blocksHtml = '';
    
    for (let i = 0; i < bpBlocks.length; i++) {
        const b = bpBlocks[i];
        const isCompleted = trainingCompleted[i];
        const isUnlocked = b.isUnlocked || (b.isFinal && b.isUnlocked);
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
            ${getEntranceExamButtonHtml()}
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
    
    const entranceExamBtn = document.getElementById('entranceExamBtn');
    if (entranceExamBtn) {
        entranceExamBtn.onclick = () => openEntranceExamModal();
    }
}

export function showTraining() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    loadTrainingProgress();
    renderTrainingModule();
}
