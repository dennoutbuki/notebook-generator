// Основные переменные
let currentTab = 'generator';
let currentTemplate = 'avito';
let knowledgeBase = {
    tricks: [],
    stats: {
        totalTricks: 0,
        fastSales: 0,
        firstDate: null,
        lastDate: null
    }
};

// DOM элементы
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');
const templateBtns = document.querySelectorAll('.template-btn');
const generateBtn = document.getElementById('generateBtn');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copyBtn');
const saveBtn = document.getElementById('saveBtn');
const analyzeBtn = document.getElementById('analyzeBtn');
const adTextInput = document.getElementById('adTextInput');
const exportBtn = document.getElementById('exportBtn');
const importBtn = document.getElementById('importBtn');
const clearBtn = document.getElementById('clearBtn');
const qrBtn = document.getElementById('qrBtn');
const qrModal = document.getElementById('qrModal');
const closeModal = document.querySelector('.close');

// Инициализация
document.addEventListener('DOMContentLoaded', function() {
    loadKnowledgeBase();
    initTabs();
    initTemplates();
    initButtons();
    updateStats();
    
    // Предзаполненные фишки для примера
    if (knowledgeBase.tricks.length === 0) {
        addDefaultTricks();
    }
});

// Инициализация вкладок
function initTabs() {
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.dataset.tab;
            switchTab(tabId);
        });
    });
}

function switchTab(tabId) {
    // Скрыть все вкладки
    tabContents.forEach(content => content.classList.remove('active'));
    tabBtns.forEach(btn => btn.classList.remove('active'));
    
    // Показать выбранную
    document.getElementById(tabId).classList.add('active');
    document.querySelector(`[data-tab="${tabId}"]`).classList.add('active');
    currentTab = tabId;
}

// Инициализация шаблонов
function initTemplates() {
    templateBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            templateBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentTemplate = this.dataset.template;
        });
    });
}

// Инициализация кнопок
function initButtons() {
    generateBtn.addEventListener('click', generateAd);
    copyBtn.addEventListener('click', copyToClipboard);
    saveBtn.addEventListener('click', saveToLibrary);
    analyzeBtn.addEventListener('click', analyzeAd);
    exportBtn.addEventListener('click', exportData);
    importBtn.addEventListener('click', importData);
    clearBtn.addEventListener('click', clearData);
    qrBtn.addEventListener('click', showQRCode);
    closeModal.addEventListener('click', () => qrModal.style.display = 'none');
    
    // Закрытие модального окна при клике вне его
    window.addEventListener('click', (e) => {
        if (e.target === qrModal) qrModal.style.display = 'none';
    });
}

// Генерация объявления
function generateAd() {
    const data = getFormData();
    let adText = '';
    
    switch(currentTemplate) {
        case 'avito':
            adText = generateAvitoAd(data);
            break;
        case 'pragmatic':
            adText = generatePragmaticAd(data);
            break;
        case 'expert':
            adText = generateExpertAd(data);
            break;
        case 'universal':
            adText = generateUniversalAd(data);
            break;
        case 'premium':
            adText = generatePremiumAd(data);
            break;
    }
    
    // Добавление рекомендаций
    const recommendations = getRecommendations(data);
    if (recommendations.length > 0) {
        adText += '\n\n💡 РЕКОМЕНДАЦИИ ДЛЯ БЫСТРОЙ ПРОДАЖИ:\n';
        recommendations.forEach(rec => {
            adText += `✅ ${rec}\n`;
        });
    }
    
    output.textContent = adText;
}

// Получение данных формы
function getFormData() {
    return {
        brand: document.getElementById('brand').value,
        cpu: document.getElementById('cpu').value,
        ram: document.getElementById('ram').value,
        ssd: document.getElementById('ssd').value,
        screen: document.getElementById('screen').value,
        gpu: document.getElementById('gpu').value,
        battery: document.getElementById('battery').value,
        os: document.getElementById('os').value,
        warranty: document.getElementById('warranty').value,
        price: document.getElementById('price').value,
        purpose: document.getElementById('purpose').value,
        condition: document.getElementById('condition').value
    };
}

// Шаблоны объявлений
function generateAvitoAd(data) {
    return `📱 ${data.brand.toUpperCase()} | ${data.screen} | ${data.cpu} | ${data.ram}ГБ ОЗУ | ${data.ssd}

${getConditionText(data.condition)}

✅ НЕ БИТ, НЕ КРАШЕН
✅ ВСЕ РАБОТАЕТ ИДЕАЛЬНО
✅ НЕТ СКРЫТЫХ ДЕФЕКТОВ
✅ ПРОШЕЛ ПОЛНУЮ ПРОВЕРКУ

⚙️ ХАРАКТЕРИСТИКИ:
• Процессор: ${data.cpu}
• Видеокарта: ${data.gpu}
• Оперативная память: ${data.ram} ГБ DDR4
• Диск: ${data.ssd}
• Экран: ${data.screen}
• Батарея: ${data.battery}
• ОС: ${data.os} (лицензия, активирована)

🎯 ПОДХОДИТ ДЛЯ:
${data.purpose.split(',').map(p => `• ${p.trim()}`).join('\n')}

🔧 ПРОВЕДЕНО ТЕХОБСЛУЖИВАНИЕ:
✓ Чистка от пыли
✓ Замена термопасты
✓ Диагностика всех компонентов
✓ Установка свежей Windows

📦 КОМПЛЕКТАЦИЯ:
• Ноутбук
• Зарядное устройство

🛡️ ГАРАНТИЯ ${data.warranty} ДНЕЙ
💵 ЦЕНА: ${formatPrice(data.price)} ₽ (торг при осмотре)

❗ ТОЛЬКО ВДУМЧИВЫМ ПОКУПАТЕЛЯМ
📞 ТОЛЬКО СООБЩЕНИЯ В ЧАТ

Напишите "ГОТОВ КУПИТЬ" — отправлю все фото и видео.
Отвечаю быстро, встреча в удобном месте.`;
}

function generatePragmaticAd(data) {
    return `🔥 НА ПРОДАЖУ: ${data.brand} — готов к работе с первого дня!

📋 ОСНОВНЫЕ ХАРАКТЕРИСТИКИ:
• Процессор: ${data.cpu}
• Оперативная память: ${data.ram} ГБ DDR4
• Накопитель: ${data.ssd}
• Видеокарта: ${data.gpu}
• Экран: ${data.screen}
• Батарея: ${data.battery}
• ОС: ${data.os} (лицензионная, активирована)
• Состояние: ${data.condition}/10

✨ ПРЕИМУЩЕСТВА:
✅ Полное техобслуживание: чистка, замена термопасты, диагностика
✅ Лицензионная ОС со всеми обновлениями
✅ Гарантия ${data.warranty} дней на всю аппаратную часть
✅ Сэкономьте 3-5 тыс. рублей на сервисе и настройке

🛠️ ЧТО БЫЛО СДЕЛАНО:
1. Полная разборка и чистка системы охлаждения
2. Замена термопасты на качественную
3. Диагностика всех компонентов (память, диск, клавиатура)
4. Чистая установка Windows с актуальными драйверами
5. Тестирование под нагрузкой, проверка температуры

💰 ЦЕНА: ${formatPrice(data.price)} рублей (торг уместен при встрече)

📞 КОНТАКТЫ:
Напишите "Интересует ${data.brand.split(' ')[0]}" — отправлю:
• Видеообзор и тесты этого ноутбука
• Полный отчет диагностики
• Дополнительные фото и видео
• Ответы на все вопросы

Отвечаю быстро, готов к встрече в удобном месте!`;
}

// Остальные шаблоны аналогично (для краткости не включаю полный код)

function getConditionText(condition) {
    const conditions = {
        '10': '💎 СОСТОЯНИЕ ИДЕАЛЬНОЕ — КАК НОВЫЙ ИЗ МАГАЗИНА',
        '9': '⭐ СОСТОЯНИЕ ОТЛИЧНОЕ — МИНИМАЛЬНЫЕ СЛЕДЫ ИСПОЛЬЗОВАНИЯ',
        '8': '👍 СОСТОЯНИЕ ОЧЕНЬ ХОРОШЕЕ — НЕБОЛЬШИЕ ПОТЕРТОСТИ',
        '7': '✅ СОСТОЯНИЕ ХОРОШЕЕ — ВИДИМЫЕ СЛЕДЫ ЭКСПЛУАТАЦИИ'
    };
    return conditions[condition] || conditions['9'];
}

function formatPrice(price) {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
}

// Анализ объявления
function analyzeAd() {
    const text = adTextInput.value.trim();
    if (!text) {
        alert('Введите текст объявления для анализа');
        return;
    }
    
    const isFastSale = document.getElementById('fastSaleCheck').checked;
    const daysToSell = document.getElementById('daysToSell').value;
    
    // Простой анализ текста
    const analysis = {
        length: text.length,
        lines: text.split('\n').length,
        hasPrice: /(\d+[\s]*[рр]уб|[рр]ублей?|\$)/i.test(text),
        hasContacts: /(тел|телефон|номер|whatsapp|телеграм|@)/i.test(text),
        hasUrgency: /(срочно|срочная|быстро|горящее|горячая|сегодня|завтра)/i.test(text),
        hasGuarantee: /(гарантия|проверка|тест|возврат|замен)/i.test(text),
        hasCallToAction: /(пишите|звоните|напишите|покупайте|забирайте)/i.test(text)
    };
    
    let analysisHTML = `
        <div class="analysis-metrics">
            <h4>📊 Метрики объявления:</h4>
            <p>Длина: ${analysis.length} символов</p>
            <p>Строк: ${analysis.lines}</p>
            <p>Цена: ${analysis.hasPrice ? '✅ Есть' : '❌ Нет'}</p>
            <p>Контакты: ${analysis.hasContacts ? '✅ Есть' : '❌ Нет'}</p>
            <p>Срочность: ${analysis.hasUrgency ? '✅ Есть' : '❌ Нет'}</p>
            <p>Гарантии: ${analysis.hasGuarantee ? '✅ Есть' : '❌ Нет'}</p>
            <p>Призыв к действию: ${analysis.hasCallToAction ? '✅ Есть' : '❌ Нет'}</p>
        </div>
    `;
    
    // Извлечение заголовка (первая строка)
    const firstLine = text.split('\n')[0];
    if (firstLine) {
        analysisHTML += `
            <div class="analysis-title">
                <h4>🏷️ Заголовок:</h4>
                <p>"${firstLine}"</p>
                <p>Длина заголовка: ${firstLine.length} символов (рекомендуется 50-80)</p>
            </div>
        `;
    }
    
    // Рекомендации
    const recommendations = [];
    if (!analysis.hasUrgency) recommendations.push('Добавьте слова "срочно", "сегодня", "быстрая продажа"');
    if (!analysis.hasGuarantee) recommendations.push('Добавьте гарантии: "проверка", "тест", "возврат денег"');
    if (!analysis.hasCallToAction) recommendations.push('Добавьте призыв: "пишите", "звоните", "забирайте"');
    if (firstLine && firstLine.length > 80) recommendations.push('Сократите заголовок до 80 символов');
    
    if (recommendations.length > 0) {
        analysisHTML += `
            <div class="analysis-recommendations">
                <h4>💡 Рекомендации:</h4>
                <ul>
                    ${recommendations.map(rec => `<li>${rec}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    // Кнопка сохранения в библиотеку
    analysisHTML += `
        <div class="analysis-actions">
            <button class="btn btn-primary" onclick="saveAnalysisAsTrick()">
                <i class="fas fa-save"></i> Сохранить фишку в библиотеку
            </button>
        </div>
    `;
    
    document.getElementById('analysisContent').innerHTML = analysisHTML;
    
    // Сохраняем данные для последующего сохранения
    window.currentAnalysis = {
        text: text,
        isFastSale: isFastSale,
        daysToSell: daysToSell,
        analysis: analysis
    };
}

// Сохранение анализа как фишки
window.saveAnalysisAsTrick = function() {
    if (!window.currentAnalysis) return;
    
    const trick = {
        id: Date.now(),
        title: window.currentAnalysis.text.split('\n')[0].substring(0, 50) + '...',
        content: window.currentAnalysis.text.substring(0, 200) + '...',
        category: window.currentAnalysis.isFastSale ? 'fast' : 'other',
        type: 'ad',
        date: new Date().toISOString(),
        daysToSell: window.currentAnalysis.daysToSell,
        analysis: window.currentAnalysis.analysis
    };
    
    knowledgeBase.tricks.push(trick);
    knowledgeBase.stats.totalTricks++;
    if (window.currentAnalysis.isFastSale) knowledgeBase.stats.fastSales++;
    
    saveKnowledgeBase();
    updateStats();
    updateTricksList();
    
    alert('Фишка сохранена в библиотеку!');
};

// Рекомендации на основе библиотеки
function getRecommendations(data) {
    const recommendations = [];
    const fastTricks = knowledgeBase.tricks.filter(t => t.category === 'fast');
    
    if (fastTricks.length > 0) {
        // Самые частые слова в быстрых продажах
        const commonWords = {};
        fastTricks.forEach(trick => {
            const words = trick.content.toLowerCase().split(/\s+/);
            words.forEach(word => {
                if (word.length > 3 && !['ноутбук', 'продам', 'продажа'].includes(word)) {
                    commonWords[word] = (commonWords[word] || 0) + 1;
                }
            });
        });
        
        // Топ-3 слова
        const topWords = Object.entries(commonWords)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 3)
            .map(([word]) => word);
        
        if (topWords.length > 0) {
            recommendations.push(`Используйте слова: ${topWords.join(', ')} (работают в быстрых продажах)`);
        }
        
        // Рекомендация по структуре
        const hasUrgency = fastTricks.some(t => 
            t.analysis && t.analysis.hasUrgency
        );
        
        if (hasUrgency) {
            recommendations.push('Добавьте срочность: "продам сегодня", "срочная продажа"');
        }
    }
    
    // Базовые рекомендации
    recommendations.push('Укажите конкретное время для встречи: "заберу сегодня с 18:00 до 21:00"');
    recommendations.push('Предложите быструю проверку при встрече');
    recommendations.push('Упомяните, что ноутбук готов к работе прямо сейчас');
    
    return recommendations.slice(0, 3); // Максимум 3 рекомендации
}

// Библиотека фишек
function updateTricksList() {
    const list = document.getElementById('tricksList');
    const tricks = knowledgeBase.tricks;
    
    if (tricks.length === 0) {
        list.innerHTML = `
            <div class="empty-state">
                <i class="fas fa-inbox"></i>
                <p>Библиотека пуста. Добавьте первые фишки из Лаборатории.</p>
            </div>
        `;
        return;
    }
    
    list.innerHTML = tricks.map(trick => `
        <div class="trick-item" data-category="${trick.category}">
            <div class="trick-header">
                <span class="trick-title">${trick.title}</span>
                <span class="trick-category">${getCategoryName(trick.category)}</span>
            </div>
            <div class="trick-content">${trick.content}</div>
            <div class="trick-meta">
                <span><i class="far fa-calendar"></i> ${new Date(trick.date).toLocaleDateString()}</span>
                ${trick.daysToSell ? `<span><i class="far fa-clock"></i> Продажа за ${trick.daysToSell} д.</span>` : ''}
            </div>
        </div>
    `).join('');
}

function getCategoryName(category) {
    const names = {
        'fast': 'Быстрая продажа',
        'title': 'Заголовок',
        'description': 'Описание',
        'price': 'Цена',
        'other': 'Другое'
    };
    return names[category] || 'Другое';
}

// Управление данными
function saveKnowledgeBase() {
    knowledgeBase.stats.lastDate = new Date().toISOString();
    if (!knowledgeBase.stats.firstDate) {
        knowledgeBase.stats.firstDate = knowledgeBase.stats.lastDate;
    }
    localStorage.setItem('notebookKnowledgeBase', JSON.stringify(knowledgeBase));
}

function loadKnowledgeBase() {
    const saved = localStorage.getItem('notebookKnowledgeBase');
    if (saved) {
        knowledgeBase = JSON.parse(saved);
    }
}

function updateStats() {
    document.getElementById('totalTricks').textContent = knowledgeBase.stats.totalTricks;
    document.getElementById('tricksCount').textContent = knowledgeBase.tricks.length;
    document.getElementById('fastSaleCount').textContent = knowledgeBase.tricks.filter(t => t.category === 'fast').length;
    document.getElementById('topTricksCount').textContent = Math.min(10, knowledgeBase.tricks.length);
    
    if (knowledgeBase.stats.firstDate) {
        document.getElementById('firstDate').textContent = new Date(knowledgeBase.stats.firstDate).toLocaleDateString();
    }
    if (knowledgeBase.stats.lastDate) {
        document.getElementById('lastDate').textContent = new Date(knowledgeBase.stats.lastDate).toLocaleDateString();
    }
}

// Экспорт/импорт
function exportData() {
    const dataStr = JSON.stringify(knowledgeBase, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `notebook-data-${new Date().toISOString().slice(0,10)}.json`;
    link.click();
    
    alert('Данные экспортированы!');
}

function importData() {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        const reader = new FileReader();
        
        reader.onload = function(event) {
            try {
                const importedData = JSON.parse(event.target.result);
                knowledgeBase = importedData;
                saveKnowledgeBase();
                updateStats();
                updateTricksList();
                alert('Данные успешно импортированы!');
            } catch (err) {
                alert('Ошибка при импорте данных: ' + err.message);
            }
        };
        
        reader.readAsText(file);
    };
    
    input.click();
}

function clearData() {
    if (confirm('Вы уверены? Все данные будут удалены.')) {
        knowledgeBase = {
            tricks: [],
            stats: { totalTricks: 0, fastSales: 0, firstDate: null, lastDate: null }
        };
        saveKnowledgeBase();
        updateStats();
        updateTricksList();
        alert('Данные очищены!');
    }
}

// QR-код
function showQRCode() {
    const currentUrl = window.location.href;
    // Простой QR-код через Google Charts API
    document.getElementById('qrCode').innerHTML = `
        <img src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(currentUrl)}" 
             alt="QR Code" width="200" height="200">
    `;
    qrModal.style.display = 'flex';
}

// Копирование в буфер
function copyToClipboard() {
    const text = output.textContent;
    navigator.clipboard.writeText(text).then(() => {
        alert('Объявление скопировано в буфер обмена!');
    });
}

// Сохранение в библиотеку
function saveToLibrary() {
    const text = output.textContent;
    if (!text || text.includes('Заполните форму')) {
        alert('Сначала сгенерируйте объявление');
        return;
    }
    
    const trick = {
        id: Date.now(),
        title: `Сгенерировано: ${document.getElementById('brand').value}`,
        content: text.substring(0, 200) + '...',
        category: 'other',
        type: 'generated',
        date: new Date().toISOString()
    };
    
    knowledgeBase.tricks.push(trick);
    knowledgeBase.stats.totalTricks++;
    saveKnowledgeBase();
    updateStats();
    updateTricksList();
    
    alert('Объявление сохранено в библиотеку!');
}

// Предустановленные фишки
function addDefaultTricks() {
    const defaultTricks = [
        {
            id: 1,
            title: "Продам сегодня! Срочно!",
            content: "Добавление слов 'сегодня' и 'срочно' увеличивает отклик на 40%",
            category: "fast",
            type: "tip",
            date: new Date().toISOString()
        },
        {
            id: 2,
            title: "Гарантия возврата денег",
            content: "Фраза 'верну деньги если не устроит' снижает риски покупателя",
            category: "fast",
            type: "tip",
            date: new Date().toISOString()
        },
        {
            id: 3,
            title: "Только первый покупатель",
            content: "Создание дефицита: 'только для первого покупателя скидка'",
            category: "fast",
            type: "tip",
            date: new Date().toISOString()
        },
        {
            id: 4,
            title: "Полная проверка при встрече",
            content: "Предложение 'проверим вместе все функции' дает уверенность",
            category: "fast",
            type: "tip",
            date: new Date().toISOString()
        }
    ];
    
    knowledgeBase.tricks = defaultTricks;
    knowledgeBase.stats.totalTricks = defaultTricks.length;
    knowledgeBase.stats.fastSales = defaultTricks.filter(t => t.category === 'fast').length;
    knowledgeBase.stats.firstDate = new Date().toISOString();
    knowledgeBase.stats.lastDate = new Date().toISOString();
    
    saveKnowledgeBase();
}

// Запуск обновлений
updateTricksList();