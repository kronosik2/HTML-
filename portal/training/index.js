// ========== training/index.js - точка входа ==========
import { bpBlocks } from './blocks.js';
import { 
    trainingCompleted, trainingGrades, cheatModeEnabled,
    SCRIPT_URL, saveTrainingProgress, loadTrainingProgress,
    calculateTrainingStats, updateTrainingUnlockedBlocks,
    showToast
} from './training.js';
import { openTrainerBlock0 } from './trainer-block0.js';
import { openTrainerBlock2 } from './trainer-block2.js';
import { openTrainerBlock3 } from './trainer-block3.js';
import { openExamModal, openStudyModal } from './exam.js';
import { 
    entranceExamStatus, entranceExamAnswer,
    loadEntranceExam, openEntranceExamModal, 
    getEntranceExamButtonHtml, submitEntranceExamForReview 
} from './entrance-exam.js';
import { renderTrainingModule, showTraining, loadTrainingProgress as loadTrainingProgressUI } from './ui.js';

// Инициализация
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

// Делаем функции глобальными для доступа из других модулей
window.showTraining = showTraining;
window.loadTrainingProgress = loadTrainingProgressUI;
window.calculateTrainingStats = calculateTrainingStats;
window.enableCheatMode = () => {
    cheatModeEnabled = true;
    showToast("⚡ Cheat mode включён!");
    if (document.getElementById('trackContent').innerHTML) renderTrainingModule();
};

// Загружаем сохранённые данные
loadTrainingProgressUI();
loadEntranceExam();

// Экспорт для main.js
export { 
    showTraining, 
    loadTrainingProgress as loadTrainingProgress, 
    calculateTrainingStats,
    trainingCompleted,
    trainingGrades,
    cheatModeEnabled,
    bpBlocks
};

console.log('✅ Модуль обучения загружен');
