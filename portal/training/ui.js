// ========== training/ui.js - рендер модуля обучения ==========
import { bpBlocks } from './blocks.js';
import { 
    trainingCompleted, 
    trainingGrades, 
    cheatModeEnabled, 
    calculateTrainingStats, 
    loadTrainingProgress, 
    saveTrainingProgress,
    updateTrainingUnlockedBlocks,
    showToast 
} from './training.js';
import { openStudyModal, openExamModal } from './exam.js';
import { getEntranceExamButtonHtml, openEntranceExamModal } from './entrance-exam.js';

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
    const modulesGrid = document.getElementById('modulesGrid');
    const backBtn = document.getElementById('backToModulesBtn');
    const trackContent = document.getElementById('trackContent');
    
    if (modulesGrid) modulesGrid.style.display = 'none';
    if (backBtn) backBtn.style.display = 'inline-block';
    
    // Очищаем контент перед загрузкой
    if (trackContent) trackContent.innerHTML = '<div style="text-align:center; padding:40px;">Загрузка...</div>';
    
    // Загружаем прогресс и рендерим
    loadTrainingProgress();
    renderTrainingModule();
}

// Экспортируем функцию для main.js
export { loadTrainingProgress };
// Делаем функцию глобальной для доступа из exam.js
window.renderTrainingModule = renderTrainingModule;
