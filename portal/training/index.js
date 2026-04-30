// ========== training/index.js - точка входа модуля обучения ==========
import { bpBlocks } from './blocks.js';
import { 
    trainingCompleted, trainingGrades, cheatModeEnabled,
    SCRIPT_URL, saveTrainingProgress, loadTrainingProgress,
    calculateTrainingStats, updateTrainingUnlockedBlocks,
    showToast
} from './training.js';
import { renderTrainingModule, showTraining } from './ui.js';
import { loadEntranceExam } from './entrance-exam.js';

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
window.loadTrainingProgress = loadTrainingProgress;
window.calculateTrainingStats = calculateTrainingStats;

window.enableCheatMode = () => {
    cheatModeEnabled = true;
    showToast("⚡ Cheat mode включён!");
    if (document.getElementById('trackContent').innerHTML) renderTrainingModule();
};

// Загружаем сохранённые данные
loadTrainingProgress();
loadEntranceExam();

// Экспорт для main.js
export { 
    showTraining, 
    loadTrainingProgress, 
    calculateTrainingStats,
    trainingCompleted,
    trainingGrades,
    cheatModeEnabled,
    bpBlocks
};

console.log('✅ Модуль обучения загружен');
