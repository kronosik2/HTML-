// ========== training.js - Модуль Обучения (рефакторинг) ==========
import { bpBlocks } from './blocks.js';
import { openTrainerBlock0 } from './trainer-block0.js';
import { openTrainerBlock2 } from './trainer-block2.js';
import { openTrainerBlock3 } from './trainer-block3.js';
import { openExamModal, openStudyModal } from './exam.js';
import { openEntranceExamModal, getEntranceExamButtonHtml, submitEntranceExamForReview, entranceExamStatus, entranceExamAnswer } from './entrance-exam.js';
import { renderTrainingModule, showTraining } from './ui.js';

// Состояние обучения (экспортируем)
export let trainingCompleted = [false, false, false, false, false, false, false];
export let trainingGrades = [0, 0, 0, 0, 0, 0, 0];
export let cheatModeEnabled = false;

export const SCRIPT_URL = "https://docs.google.com/document/d/1ySNWcceQLIDYIEs0VgaG6-8cVLgc4oRoMIFR8ZXOgjM/edit?usp=sharing";

// Экспортируем функции для доступа из других файлов
export function updateTrainingUnlockedBlocks() {
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

export function calculateTrainingStats() {
    const completedCount = trainingCompleted.filter(v => v === true).length;
    const grades = trainingGrades.filter(g => g > 0);
    const avgGrade = grades.length ? grades.reduce((a, b) => a + b, 0) / grades.length : 0;
    return { completedCount, total: bpBlocks.length, avgGrade: parseFloat(avgGrade.toFixed(1)) };
}

export function saveTrainingProgress() {
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

export function loadTrainingProgress() {
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

export function showToast(msg) {
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerText = msg;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 2500);
}

window.showToast = showToast;
window.showTraining = showTraining;
window.calculateTrainingStats = calculateTrainingStats;
window.loadTrainingProgress = loadTrainingProgress;

console.log('✅ Модуль обучения загружен');
