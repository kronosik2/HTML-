import { bpBlocks } from './blocks.js';
import { trainingCompleted, trainingGrades, saveTrainingProgress, updateTrainingUnlockedBlocks, renderTrainingModule, showToast } from './training.js';

export function openExamModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    
    if (block.simpleComplete) {
        trainingCompleted[blockIdx] = true;
        trainingGrades[blockIdx] = 5;
        saveTrainingProgress();
        updateTrainingUnlockedBlocks();
        renderTrainingModule();
        showToast(`✅ Блок "${block.title}" пройден!`);
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    if (block.finalMessage) {
        modal.innerHTML = `<div class="modal-content" style="text-align:center;">
            <h1 style="font-size:48px; color:#22c55e;">🏆</h1>
            <h1 style="font-size:36px; font-weight:800; color:#22c55e; margin:20px 0;">ЕБАТЬ ТЫ МОЛОДЕЦ!</h1>
            <p style="font-size:18px; margin:20px 0;">Ты прошёл весь курс обучения!</p>
            <div class="exam-question" style="margin:20px 0;">
                <p style="font-size:18px; font-weight:600;">${block.questions[0].text}</p>
                ${block.questions[0].options.map((opt, idx) => `<label class="exam-option"><input type="radio" name="final" value="${idx}"> ${opt}</label>`).join('')}
            </div>
            <div class="button-group"><button id="submitExam" class="btn-success">🎉 Завершить обучение</button></div>
            <div id="examResult"></div>
        </div>`;
        document.body.appendChild(modal);
        
        modal.querySelector('#submitExam').onclick = () => {
            trainingCompleted[blockIdx] = true;
            trainingGrades[blockIdx] = 5;
            saveTrainingProgress();
            modal.remove();
            updateTrainingUnlockedBlocks();
            renderTrainingModule();
            showToast("🎉 Поздравляем! Вы завершили обучение!");
        };
        return;
    }
    
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
        <div class="button-group" style="display:flex; gap:12px; margin-top:20px;">
            <button id="submitExam" class="btn-success">Сдать экзамен</button>
            <button class="btn-outline" id="closeBtn">Закрыть</button>
        </div>
        <div id="examResult" style="margin-top:16px;"></div>
    </div>`;
    document.body.appendChild(modal);
    
    modal.querySelector('#submitExam').onclick = () => {
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
            updateTrainingUnlockedBlocks();
            renderTrainingModule();
            showToast(`✅ Экзамен сдан на 5! Следующий блок открыт.`);
        } else {
            modal.querySelector('#examResult').innerHTML = `<div style="background:#fee2e2; padding:12px; border-radius:16px;">❌ Оценка: ${correct}/5. Нужно 5 правильных ответов.</div>`;
        }
    };
    modal.querySelector('#closeBtn').onclick = () => modal.remove();
}

export function openStudyModal(blockIdx) {
    const block = bpBlocks[blockIdx];
    
    if (block.finalMessage) {
        openExamModal(blockIdx);
        return;
    }
    
    if (block.simpleComplete && !trainingCompleted[blockIdx]) {
        const modal = document.createElement('div');
        modal.className = 'modal';
        modal.innerHTML = `
            <div class="modal-content" style="text-align:center;">
                <h2>💰 Ценообразование</h2>
                <p style="margin:20px 0;">Здесь будет видео-обучение по ценообразованию.</p>
                <button id="completeSimpleBtn" class="btn-success">✅ Пройдено</button>
                <button class="btn-outline" id="closeBtn" style="margin-top:12px;">Закрыть</button>
            </div>
        `;
        document.body.appendChild(modal);
        modal.querySelector('#completeSimpleBtn').onclick = () => {
            trainingCompleted[blockIdx] = true;
            trainingGrades[blockIdx] = 5;
            saveTrainingProgress();
            updateTrainingUnlockedBlocks();
            renderTrainingModule();
            modal.remove();
            showToast("✅ Блок пройден!");
        };
        modal.querySelector('#closeBtn').onclick = () => modal.remove();
        return;
    }
    
    if (!block.isUnlocked && !block.isFinal) {
        showToast("Сначала сдайте предыдущий блок на 5!");
        return;
    }
    
    const isAlreadyCompleted = trainingCompleted[blockIdx];
    
    const modal = document.createElement('div');
    modal.className = 'modal';
    const audioHtml = block.audio ? `<audio controls src="${block.audio}" style="width:100%;"></audio>` : '<p>🎧 Аудио будет позже</p>';
    
    let trainerBtnHtml = '';
    if (block.hasTrainer && !block.trainerPassed && !isAlreadyCompleted) {
        if (blockIdx === 0) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
        else if (blockIdx === 2) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
        else if (blockIdx === 3) trainerBtnHtml = `<button id="trainerBtn" class="btn-primary" style="width:100%;">🎮 Пройти тренажёр</button>`;
    } else if (block.hasTrainer && (block.trainerPassed || isAlreadyCompleted)) {
        trainerBtnHtml = '<span class="badge-success" style="display:inline-block; padding:8px 16px;">✅ Тренажёр пройден</span>';
    }
    
    let examSection = '';
    if (isAlreadyCompleted) {
        examSection = '<div style="background:#dcfce7; padding:12px; border-radius:16px; text-align:center;">✅ Экзамен сдан! Ты уже прошел этот блок.</div>';
    } else if (!block.hasTrainer || block.trainerPassed) {
        examSection = `<button id="examBtn" class="btn-success" style="width:100%;">📝 Перейти к экзамену</button>`;
    } else {
        examSection = '<p style="text-align:center;">🔒 Сначала пройдите тренажёр</p>';
    }
    
    modal.innerHTML = `
    <div class="modal-content" style="max-width:600px; width:100%;">
        <h3 style="margin-bottom:20px;">${block.title}</h3>
        <div class="material-section" style="background:#fef9e3; margin-bottom:16px;">
            <div><strong>🎯 ЦЕЛЬ:</strong> ${block.goal}</div>
            <div style="margin-top:8px;"><strong>⚠️ ОБЯЗАТЕЛЬНО:</strong> ${block.mandatory}</div>
            <div style="margin-top:8px;"><strong>✅ РЕЗУЛЬТАТ:</strong> ${block.result}</div>
            <div style="margin-top:8px;"><strong>🛠️ ИНСТРУМЕНТЫ:</strong> ${block.tools}</div>
        </div>
        <div class="material-section" style="margin-bottom:16px;">
            <h4>🎧 Аудио</h4>
            ${audioHtml}
        </div>
        <div class="material-section" style="margin-bottom:16px;">
            <h4>📄 Скрипт</h4>
            <a href="${SCRIPT_URL}" target="_blank" class="btn-primary" style="display:inline-block;">Открыть скрипт</a>
        </div>
        ${trainerBtnHtml ? `<div class="material-section" style="margin-bottom:16px;">${trainerBtnHtml}</div>` : ''}
        <div class="material-section" style="margin-bottom:16px;">${examSection}</div>
        <div style="display:flex; justify-content:flex-end; margin-top:20px;">
            <button class="btn-outline" id="closeBtn" style="padding:8px 24px;">Закрыть</button>
        </div>
    </div>`;
    
    document.body.appendChild(modal);
    
    if (block.hasTrainer && !block.trainerPassed && !isAlreadyCompleted) {
        const trainerBtn = modal.querySelector('#trainerBtn');
        if (trainerBtn) {
            trainerBtn.onclick = () => {
                if (blockIdx === 0) openTrainerBlock0(modal);
                else if (blockIdx === 2) openTrainerBlock2(modal);
                else if (blockIdx === 3) openTrainerBlock3(modal);
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
    
    if (!isAlreadyCompleted && (!block.hasTrainer || block.trainerPassed)) {
        modal.querySelector('#examBtn')?.addEventListener('click', () => {
            modal.remove();
            openExamModal(blockIdx);
        });
    }
    modal.querySelector('#closeBtn').onclick = () => modal.remove();
}
