// ========== knowledge.js - Модуль База Знаний ==========

// База знаний (статьи)
const knowledgeBase = [
    {
        id: 1,
        title: "Как правильно принимать звонок?",
        category: "Приём обращений",
        tags: ["звонок", "телефон", "клиент", "общение", "приветствие"],
        content: "📞 **Алгоритм приёма звонка:**\n\n1. Ответь на звонок в течение 10 секунд.\n2. Представься: «РАЗ! ГРУЗЧИКИ, меня зовут [Имя], чем могу помочь?»\n3. Внимательно выслушай клиента, не перебивай.\n4. Задай уточняющие вопросы: адрес, объём работ, сроки.\n5. Зафиксируй контакты и создай заявку в CRM.\n\n💡 **Совет:** Улыбайся во время разговора — клиент это чувствует!",
        keywords: ["звонок", "приём", "телефон", "клиент", "приветствие", "алгоритм"]
    },
    {
        id: 2,
        title: "Как составить заявку в CRM?",
        category: "Составление заявок",
        tags: ["заявка", "CRM", "оформление", "адрес", "цена"],
        content: "📝 **Правила составления заявки:**\n\n1. Укажи точный адрес (город, улица, дом, квартира).\n2. Опиши фронт работ: что нужно сделать, какие материалы.\n3. Укажи дату и время выполнения.\n4. Согласуй цену с клиентом.\n5. Назначь исполнителя с рейтингом выше 75%.\n\n⚠️ **Важно:** Неверный адрес = сорванная заявка!",
        keywords: ["заявка", "crm", "составление", "оформление", "адрес", "цена"]
    },
    {
        id: 3,
        title: "Как выбрать исполнителя?",
        category: "Назначение исполнителей",
        tags: ["исполнитель", "грузчик", "рейтинг", "назначение", "бригада"],
        content: "👥 **Критерии выбора исполнителя:**\n\n1. Рейтинг выполнения заказов (должен быть выше 75%).\n2. Количество свободных человек в бригаде.\n3. Наличие транспорта (если нужен вывоз мусора).\n4. Географическая близость к адресу.\n5. Отзывы от других менеджеров.\n\n🎯 **Приоритет:** выше рейтинг → надёжнее исполнитель!",
        keywords: ["исполнитель", "грузчик", "выбор", "назначение", "рейтинг", "бригада"]
    },
    {
        id: 4,
        title: "Что делать при срыве исполнителя?",
        category: "Контроль и техподдержка",
        tags: ["срыв", "замена", "клиент", "кризис", "проблема"],
        content: "🚨 **Алгоритм действий при срыве:**\n\n1. Сразу позвони клиенту, предупреди о задержке.\n2. Найди замену среди других исполнителей.\n3. Если замена есть — подтверди с клиентом новое время.\n4. Если замены нет — предложи клиенту альтернативу (перенос или отмена).\n5. Внеси информацию в CRM и отрази причину срыва.\n\n💪 **Главное:** сохраняй спокойствие и будь на связи с клиентом!",
        keywords: ["срыв", "замена", "кризис", "клиент", "проблема", "решение"]
    },
    {
        id: 5,
        title: "Как получить оплату и закрыть заявку?",
        category: "Финансы и отчёты",
        tags: ["оплата", "деньги", "чек", "расчёт", "заявка"],
        content: "💰 **Процесс получения оплаты:**\n\n1. После выполнения работ свяжись с клиентом.\n2. Уточни способ оплаты (наличные, карта, безнал).\n3. При наличной оплате — выдай чек.\n4. При безналичной — отправь ссылку на оплату.\n5. После поступления денег рассчитай исполнителей.\n6. Закрой заявку в CRM с пометкой «Выполнена».\n\n🎉 **Поздравляю!** Заявка закрыта, клиент доволен.",
        keywords: ["оплата", "деньги", "чек", "расчёт", "закрытие", "заявка"]
    },
    {
        id: 6,
        title: "Как повысить конверсию звонков?",
        category: "Советы по продажам",
        tags: ["конверсия", "продажи", "звонок", "клиент", "убеждение"],
        content: "📈 **Секреты высокой конверсии:**\n\n1. Ответь на звонок за 10 секунд — шанс продажи +200%.\n2. Используй скрипт, но говори своим голосом.\n3. Слушай больше, говори меньше.\n4. Фиксируй боли клиента и предлагай решение.\n5. Всегда подтверждай детали (адрес, время, цену).\n6. Отправляй смс-подтверждение после разговора.\n\n🔥 **Формула успеха:** Внимание + Скорость + Доброжелательность = Продажа!",
        keywords: ["конверсия", "продажи", "убеждение", "скрипт", "звонок"]
    },
    {
        id: 7,
        title: "Частые ошибки при составлении заявки",
        category: "Ошибки и как их избежать",
        tags: ["ошибки", "заявка", "CRM", "внимательность", "проверка"],
        content: "❌ **ТОП ошибок в заявках:**\n\n1. Неверный адрес (исполнители едут не туда).\n2. Отсутствие телефона клиента.\n3. Не указан объём работ.\n4. Нет согласованной цены.\n5. Назначен исполнитель с низким рейтингом.\n6. Не подтверждена дата/время.\n\n✅ **Как избежать:**\n- Перепроверяй адрес по карте.\n- Всегда уточняй контакты.\n- Оформляй заявку сразу во время разговора.",
        keywords: ["ошибки", "заявка", "crm", "проверка", "внимательность"]
    },
    {
        id: 8,
        title: "Как работать с возражениями клиента?",
        category: "Работа с возражениями",
        tags: ["возражения", "клиент", "доводы", "цена", "сомнения"],
        content: "💬 **Скрипты на возражения:**\n\n**Возражение:** «У вас дорого!»\n→ «Да, цена чуть выше рыночной, но мы даём гарантию и страхуем груз. Это дешевле, чем потерять вещи при переезде.»\n\n**Возражение:** «Мне нужно подумать»\n→ «Понимаю, это ответственное решение. Давайте я отправлю вам расчёт в WhatsApp, а через час перезвоню.»\n\n**Возражение:** «У знакомых дешевле»\n→ «Это возможно, но наши грузчики застрахованы и оформлены официально. За безопасность мы отвечаем головой.»\n\n🎯 **Правило:** Не спорь, а предлагай альтернативу!",
        keywords: ["возражения", "клиент", "цена", "доводы", "сомнения", "скрипт"]
    },
    {
        id: 9,
        title: "Как оформить повторную продажу?",
        category: "Повторные продажи",
        tags: ["повторная", "продажа", "клиент", "СПб", "база"],
        content: "🔄 **Алгоритм повторной продажи:**\n\n1. Через 3 дня после выполненной заявки позвони клиенту.\n2. Спроси: «Как прошёл переезд? Всё ли понравилось?»\n3. Предложи скидку 5–10% на следующий заказ.\n4. Добавь клиента в Telegram-рассылку.\n5. Через месяц напомни о себе: «Пора наводить порядок на балконе?»\n\n📊 **Статистика:** Повторный клиент приносит на 60% больше прибыли, чем новый!",
        keywords: ["повторная", "продажа", "клиент", "скидка", "база"]
    },
    {
        id: 10,
        title: "Что делать, если клиент недоволен?",
        category: "Работа с негативом",
        tags: ["негатив", "жалоба", "клиент", "претензия", "конфликт"],
        content: "😟 **Алгоритм при жалобе:**\n\n1. Выслушай клиента до конца, не перебивай.\n2. Прими его эмоции: «Понимаю ваше недовольство, это неприятно».\n3. Извинись от лица компании.\n4. Предложи решение: скидка, бонус, повторный выезд.\n5. Если проблема серьёзная — подключи руководителя.\n6. После решения — попроси обратную связь.\n\n🧠 **Правило:** Недовольный клиент = возможность стать лучше!",
        keywords: ["негатив", "жалоба", "конфликт", "претензия", "клиент"]
    }
];

// Словарь синонимов для умного поиска
const synonyms = {
    "звонок": ["телефон", "звонок", "приём обращения", "обращение", "трубка"],
    "заявка": ["заявка", "CRM", "оформление", "создание заявки"],
    "исполнитель": ["грузчик", "исполнитель", "рабочий", "бригада", "водитель"],
    "оплата": ["оплата", "деньги", "чек", "расчёт", "касса"],
    "конверсия": ["конверсия", "продажи", "эффективность", "успех"],
    "клиент": ["клиент", "заказчик", "человек", "покупатель"],
    "проблема": ["проблема", "срыв", "поломка", "неприятность", "кризис"]
};

// ========== ФУНКЦИИ УМНОГО ПОИСКА ==========
function normalizeText(text) {
    // Приводим к нижнему регистру, убираем лишние пробелы
    return text.toLowerCase().trim().replace(/[^\w\sа-яё]/gi, ' ');
}

function getSynonyms(word) {
    // Возвращает синонимы для слова
    const normalized = normalizeText(word);
    for (const [key, values] of Object.entries(synonyms)) {
        if (values.includes(normalized) || normalized === key) {
            return values;
        }
    }
    return [normalized];
}

function searchKnowledge(query) {
    if (!query || query.trim() === "") {
        // Если запрос пустой, показываем все статьи
        return knowledgeBase.map(article => ({ ...article, relevance: 0 }));
    }
    
    const searchTerms = normalizeText(query).split(/\s+/);
    const expandedTerms = [];
    
    // Расширяем поисковые запросы синонимами
    for (const term of searchTerms) {
        expandedTerms.push(term);
        const syns = getSynonyms(term);
        expandedTerms.push(...syns);
    }
    
    // Уникальные термины
    const uniqueTerms = [...new Set(expandedTerms)];
    
    // Оцениваем релевантность каждой статьи
    const results = knowledgeBase.map(article => {
        let relevance = 0;
        const searchableText = normalizeText(article.title + " " + article.content + " " + article.category + " " + article.tags.join(" "));
        
        for (const term of uniqueTerms) {
            if (term.length < 2) continue; // Игнорируем слишком короткие слова
            
            // Полное совпадение слова
            const wordMatches = (searchableText.match(new RegExp(`\\b${term}\\b`, 'g')) || []).length;
            relevance += wordMatches * 10;
            
            // Частичное совпадение
            const partialMatches = (searchableText.match(new RegExp(term, 'g')) || []).length;
            relevance += partialMatches * 5;
            
            // Совпадение в заголовке важнее
            const titleMatches = (normalizeText(article.title).match(new RegExp(term, 'g')) || []).length;
            relevance += titleMatches * 15;
            
            // Совпадение в тегах
            const tagMatches = article.tags.filter(t => normalizeText(t).includes(term)).length;
            relevance += tagMatches * 20;
        }
        
        return { ...article, relevance };
    });
    
    // Сортируем по релевантности и возвращаем
    return results.sort((a, b) => b.relevance - a.relevance);
}

// ========== ОТРИСОВКА МОДУЛЯ ==========
function renderKnowledgeModule() {
    const container = document.getElementById('trackContent');
    if (!container) return;
    
    container.innerHTML = `
        <div class="training-layout">
            <div class="bp-sidebar" style="width:100%;">
                <div style="margin-bottom:20px;">
                    <button class="btn-back" id="backToModulesBtnKnowledge">← Назад</button>
                </div>
                
                <h2 style="margin-bottom:8px;">📚 База Знаний</h2>
                <p style="margin-bottom:24px; color:#64748b;">Ищи ответы на вопросы, изучай скрипты и лучшие практики</p>
                
                <!-- Поисковая строка -->
                <div style="margin-bottom:24px;">
                    <div style="display:flex; gap:12px; flex-wrap:wrap;">
                        <input type="text" id="knowledgeSearchInput" placeholder="🔍 Поиск по базе знаний..." style="flex:1; padding:14px 20px; border:1px solid #cbd5e1; border-radius:60px; font-size:16px;">
                        <button id="knowledgeSearchBtn" class="btn-primary" style="padding:12px 32px;">Найти</button>
                    </div>
                    <div id="searchInfo" style="margin-top:12px; font-size:13px; color:#64748b;"></div>
                </div>
                
                <!-- Результаты поиска / Список статей -->
                <div id="knowledgeResults"></div>
            </div>
        </div>
    `;
    
    // Показываем все статьи при загрузке
    displayKnowledgeResults(searchKnowledge(""));
    
    document.getElementById('backToModulesBtnKnowledge').onclick = () => showModulesGrid();
    document.getElementById('knowledgeSearchBtn').onclick = () => performKnowledgeSearch();
    document.getElementById('knowledgeSearchInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') performKnowledgeSearch();
    });
}

function performKnowledgeSearch() {
    const query = document.getElementById('knowledgeSearchInput').value;
    const results = searchKnowledge(query);
    displayKnowledgeResults(results, query);
}

function displayKnowledgeResults(results, query = "") {
    const container = document.getElementById('knowledgeResults');
    const searchInfo = document.getElementById('searchInfo');
    
    const filteredResults = results.filter(r => r.relevance > 0 || query === "");
    const hasResults = filteredResults.length > 0;
    
    if (searchInfo) {
        if (query && query.trim() !== "") {
            searchInfo.innerHTML = `🔍 Найдено статей: ${filteredResults.length}`;
        } else {
            searchInfo.innerHTML = `📖 Всего статей: ${knowledgeBase.length}`;
        }
    }
    
    if (!hasResults) {
        container.innerHTML = `
            <div style="text-align:center; padding:48px; background:#f8fafc; border-radius:24px;">
                <div style="font-size:48px; margin-bottom:16px;">🔍</div>
                <h3>Ничего не найдено</h3>
                <p style="color:#64748b;">Попробуйте изменить поисковый запрос</p>
            </div>
        `;
        return;
    }
    
    let html = '<div style="display:flex; flex-direction:column; gap:16px;">';
    
    for (const article of filteredResults) {
        const relevanceBadge = article.relevance > 50 ? 
            '<span style="background:#22c55e20; color:#22c55e; padding:4px 8px; border-radius:20px; font-size:11px; margin-left:12px;">★ Высокая релевантность</span>' : '';
        
        html += `
            <div class="knowledge-card" data-id="${article.id}" style="background:white; border:1px solid #e2e8f0; border-radius:20px; padding:20px; cursor:pointer; transition:0.2s;">
                <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                    <h3 style="font-size:18px; margin:0;">${article.title} ${relevanceBadge}</h3>
                    <span style="background:#eef2ff; padding:4px 12px; border-radius:40px; font-size:12px;">${article.category}</span>
                </div>
                <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:12px;">
                    ${article.tags.slice(0, 4).map(tag => `<span style="background:#f1f5f9; padding:4px 10px; border-radius:20px; font-size:11px;">#${tag}</span>`).join('')}
                </div>
                <p style="color:#475569; margin:0;">${article.content.substring(0, 150).replace(/\n/g, ' ')}...</p>
                <div style="margin-top:12px; color:#22c55e; font-size:13px;">Читать полностью →</div>
            </div>
        `;
    }
    
    html += '</div>';
    container.innerHTML = html;
    
    // Добавляем обработчики клика на карточки
    document.querySelectorAll('.knowledge-card').forEach(card => {
        card.onclick = () => {
            const id = parseInt(card.dataset.id);
            const article = knowledgeBase.find(a => a.id === id);
            if (article) openKnowledgeArticle(article);
        };
    });
}

function openKnowledgeArticle(article) {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-content" style="max-width:700px; width:100%;">
            <div style="display:flex; justify-content:space-between; align-items:flex-start; flex-wrap:wrap; gap:12px; margin-bottom:16px;">
                <h2 style="margin:0;">${article.title}</h2>
                <span style="background:#eef2ff; padding:4px 12px; border-radius:40px; font-size:12px;">${article.category}</span>
            </div>
            <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:20px;">
                ${article.tags.map(tag => `<span style="background:#f1f5f9; padding:4px 10px; border-radius:20px; font-size:11px;">#${tag}</span>`).join('')}
            </div>
            <div style="background:#f8fafc; border-radius:16px; padding:20px; margin-bottom:20px; line-height:1.6;">
                ${article.content.replace(/\n/g, '<br>')}
            </div>
            <div style="display:flex; justify-content:flex-end;">
                <button class="btn-outline" id="closeKnowledgeBtn">Закрыть</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
    modal.querySelector('#closeKnowledgeBtn').onclick = () => modal.remove();
}

function showKnowledge() {
    document.getElementById('modulesGrid').style.display = 'none';
    document.getElementById('backToModulesBtn').style.display = 'inline-block';
    renderKnowledgeModule();
}

// Экспортируем функцию для main.js
window.showKnowledge = showKnowledge;