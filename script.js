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
    
    // Инициализация нижнего меню
    initMobileNav();
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
            console.log('Выбран шаблон:', currentTemplate); // Для отладки
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
    console.log('Начало генерации, шаблон:', currentTemplate); // Для отладки
    
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
        default:
            adText = '❌ Ошибка: выбран неизвестный шаблон.';
            console.error('Неизвестный шаблон:', currentTemplate);
    }
    
    console.log('Объявление сгенерировано, длина:', adText.length); // Для отладки
    
    // Добавление рекомендаций
    const recommendations = getRecommendations(data);
    if (recommendations.length > 0) {
        adText += '\n\n💡 РЕКОМЕНДАЦИИ ДЛЯ БЫСТРОЙ ПРОДАЖИ:\n';
        recommendations.forEach(rec => {
            adText += `✅ ${rec}\n`;
        });
    }
    
    output.textContent = adText;
    console.log('Вывод обновлен'); // Для отладки
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

// Шаблон: Авито-оптимизированный
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

// Шаблон: Прагматичный
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

// Шаблон: Экспертный
function generateExpertAd(data) {
    return `💼 ПРОФЕССИОНАЛЬНО ПОДГОТОВЛЕН: ${data.brand}

🚀 ПРОИЗВОДИТЕЛЬНОСТЬ:
▫️ Процессор: ${data.cpu}
▫️ Память: ${data.ram} ГБ DDR4
▫️ Накопитель: ${data.ssd}
▫️ Графика: ${data.gpu}
▫️ Дисплей: ${data.screen}
▫️ Автономность: ${data.battery}
▫️ Система: ${data.os}

🔬 РЕЗУЛЬТАТЫ ДИАГНОСТИКИ:
✓ Стресс-тест (AIDA64) — стабильная работа под нагрузкой
✓ Проверка ОЗУ (MemTest86) — ошибок нет
✓ Анализ SSD (CrystalDiskInfo) — отличное состояние
✓ Калибровка батареи — реальная ёмкость соответствует
✓ Проверка пикселей — битых/застрявших нет
✓ Тест клавиатуры — все клавиши работают

🛡️ КАЧЕСТВО ПОДГОТОВКИ:
• Полная чистка с ультразвуковой обработкой кулера
• Замена термоинтерфейса на Arctic MX-6
• Настройка BIOS/UEFI для оптимальной производительности
• Чистая установка ОС с драйверами от производителя
• Настройка энергопотребления для баланса производительности/автономности

📋 КОМПЛЕКТАЦИЯ И СОСТОЯНИЕ:
• Ноутбук ${data.brand}
• Оригинальное зарядное устройство
• Состояние корпуса: ${data.condition}/10

💵 СТОИМОСТЬ: ${formatPrice(data.price)} руб.
✅ Гарантия ${data.warranty} дней
✅ Возможен trade-in
✅ Помощь с настройкой после покупки

Для получения полного отчета диагностики напишите кодовое слово "DIAG".`;
}

// Шаблон: Универсальный
function generateUniversalAd(data) {
    return `⭐ ИДЕАЛЬНЫЙ ВАРИАНТ: ${data.brand}

Прекрасное сочетание производительности, надежности и готовности к работе прямо сейчас!

ОСНОВНЫЕ ХАРАКТЕРИСТИКИ:
✔ Процессор: ${data.cpu}
✔ Память: ${data.ram} ГБ ОЗУ
✔ Накопитель: ${data.ssd}
✔ Видеокарта: ${data.gpu}
✔ Экран: ${data.screen}
✔ Батарея: ${data.battery}
✔ Операционная система: ${data.os}

ПОЧЕМУ ЭТО ОТЛИЧНАЯ ПОКУПКА? 🤔
→ Уже полностью готов к работе — не нужно тратить время и деньги на сервис
→ Прошел полную проверку и профилактику
→ Отличное состояние (${data.condition}/10)
→ Лицензионная Windows с обновлениями
→ ${data.warranty}-дневная гарантия от продавца

ЧТО ВХОДИТ В КОМПЛЕКТ:
• Ноутбук ${data.brand}
• Оригинальное зарядное устройство

💖 ЧЕСТНО И ПРОЗРАЧНО:
Покажу все недостатки (если есть) на видео перед покупкой.
Расскажу историю использования, причины продажи.
Помогу с первичной настройкой после покупки.

ЦЕНА: ${formatPrice(data.price)} рублей.

💬 НАПИШИТЕ МНЕ, ЕСЛИ:
• Хотите увидеть больше фото/видео
• Нужна консультация по характеристикам
• Готовы забрать сегодня/завтра
• Ищете похожие модели (есть в наличии)

Отвечаю в течение 15 минут!`;
}

// Шаблон: Премиум
function generatePremiumAd(data) {
    return `▲▲▲ ПРЕМИУМ-ПРЕДЛОЖЕНИЕ ▲▲▲
${data.brand} — технологический эталон в безупречном состоянии

🌟 ОСНОВНЫЕ ПРЕИМУЩЕСТВА:
• Беспрецедентная надежность — полная аппаратная диагностика
• Максимальная производительность — оптимизировано для ${data.purpose}
• Идеальная сохранность — состояние ${data.condition}/10
• Полная техническая готовность — используйте сразу после покупки

📊 ТЕХНИЧЕСКИЙ ПАСПОРТ УСТРОЙСТВА:

[ СИСТЕМНАЯ ПЛАТФОРМА ]
Процессор: ${data.cpu}
Оперативная память: ${data.ram} ГБ DDR4
Системный накопитель: ${data.ssd}
Графическая подсистема: ${data.gpu}

[ ДИСПЛЕЙ И МУЛЬТИМЕДИА ]
Дисплей: ${data.screen}

[ ЭРГОНОМИКА И КОНСТРУКЦИЯ ]
Материал корпуса: Алюминиевый сплав / Премиум-пластик

🔍 РЕЗУЛЬТАТЫ ТЕСТИРОВАНИЯ:
▫️ Тест стабильности (24-часовая нагрузка): ✅ ПРОЙДЕН
▫️ Проверка оперативной памяти: 0 ошибок
▫️ Анализ состояния SSD: 100% работоспособность
▫️ Калибровка цветопередачи: ΔE < 2
▫️ Тест автономности: ${data.battery.split(',')[0] || data.battery}

💼 КОМПЛЕКТ ПОСТАВКИ:
1. ${data.brand} в идеальном состоянии
2. Оригинальный блок питания
3. Фирменная упаковка
4. Гарантийный талон продавца

🛡️ УСЛОВИЯ ПРЕМИУМ-ОБСЛУЖИВАНИЯ:
• Персональная гарантия ${data.warranty} дней
• Бесплатная техническая поддержка 30 дней
• Помощь в настройке и миграции данных
• Возможность обмена в течение 3 дней

📈 ИНВЕСТИЦИОННАЯ ПРИВЛЕКАТЕЛЬНОСТЬ:
Рыночная стоимость аналогов: ${formatPrice(Math.round(parseInt(data.price.replace(/\s/g, '')) * 1.2))} ₽
Ваша экономия: до ${formatPrice(Math.round(parseInt(data.price.replace(/\s/g, '')) * 0.2))} ₽
Сохранение стоимости: 85% через год

💰 ИНВЕСТИЦИЯ В ТЕХНОЛОГИИ: ${formatPrice(data.price)} ₽

Для истинных ценителей технологий и разумных инвестиций.
Это не просто ноутбук — это надежный технологический партнер.

📞 КОНФИДЕНЦИАЛЬНЫЕ ПЕРЕГОВОРЫ:
Напишите "ПРЕМИУМ ЗАПРОС" для получения:
• Детального видеообзора
• Полного отчета диагностики
• Персональной консультации
• Индивидуальных условий покупки

Работаем только с серьезными покупателями.`;
}

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
    if (typeof price === 'string') {
        const num = parseInt(price.replace(/\s/g, '')) || 0;
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    }
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

// Мобильное меню
function initMobileNav() {
    // Создаем мобильное меню
    const mobileNav = document.createElement('div');
    mobileNav.className = 'mobile-nav';
    mobileNav.innerHTML = `
        <a href="#generator" class="nav-btn active">
            <i class="fas fa-bolt"></i>
            <span>Генератор</span>
        </a>
        <a href="#lab" class="nav-btn">
            <i class="fas fa-flask"></i>
            <span>Лаборатория</span>
        </a>
        <a href="#library" class="nav-btn">
            <i class="fas fa-book"></i>
            <span>Библиотека</span>
        </a>
        <a href="#settings" class="nav-btn">
            <i class="fas fa-cog"></i>
            <span>Настройки</span>
        </a>
    `;
    
    document.body.appendChild(mobileNav);
    
    // Создаем кнопку "Наверх"
    const backToTop = document.createElement('button');
    backToTop.id = 'backToTop';
    backToTop.className = 'back-to-top';
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    document.body.appendChild(backToTop);
    
    // Добавляем стили
    const style = document.createElement('style');
    style.textContent = `
        .mobile-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            background: white;
            display: flex;
            justify-content: space-around;
            padding: 10px 5px;
            border-top: 2px solid #4361ee;
            z-index: 1000;
            box-shadow: 0 -2px 10px rgba(0,0,0,0.1);
        }
        
        .nav-btn {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-decoration: none;
            color: #666;
            font-size: 0.8rem;
            transition: all 0.3s;
            padding: 5px 10px;
            border-radius: 8px;
            min-width: 60px;
        }
        
        .nav-btn i {
            font-size: 1.2rem;
            margin-bottom: 4px;
        }
        
        .nav-btn.active {
            color: #4361ee;
            background: rgba(67, 97, 238, 0.1);
        }
        
        .nav-btn:hover {
            color: #4361ee;
            background: rgba(67, 97, 238, 0.05);
        }
        
        .back-to-top {
            position: fixed;
            bottom: 70px;
            right: 20px;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            background: #4361ee;
            color: white;
            border: none;
            cursor: pointer;
            display: none;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            box-shadow: 0 2px 10px rgba(67, 97, 238, 0.3);
            z-index: 999;
            transition: all 0.3s;
        }
        
        .back-to-top:hover {
            background: #3a0ca3;
            transform: translateY(-2px);
        }
        
        .back-to-top.show {
            display: flex;
        }
        
        @media (min-width: 769px) {
            .mobile-nav, .back-to-top {
                display: none;
            }
        }
    `;
    document.head.appendChild(style);
    
    // Обработчики для мобильного меню
    document.querySelectorAll('.nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
                
                // Обновляем активную кнопку
                document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Обработчик для кнопки "Наверх"
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Отслеживаем прокрутку для подсветки активного раздела
    window.addEventListener('scroll', () => {
        // Показываем/скрываем кнопку "Наверх"
        if (window.scrollY > 500) {
            backToTop.style.display = 'flex';
        } else {
            backToTop.style.display = 'none';
        }
        
        // Определяем активный раздел
        const sections = ['generator', 'lab', 'library', 'settings'];
        let currentSection = 'generator';
        
        sections.forEach(section => {
            const element = document.getElementById(section);
            if (element) {
                const rect = element.getBoundingClientRect();
                if (rect.top <= 100 && rect.bottom >= 100) {
                    currentSection = section;
                }
            }
        });
        
        // Обновляем активную кнопку
        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('href') === `#${currentSection}`) {
                btn.classList.add('active');
            }
        });
    });
}

// Запуск обновлений
updateTricksList();
