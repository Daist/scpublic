// Третий вариант

(function() {
    'use strict';

    const rules = [];

    function addGlobalStyle(css) {
        rules.push(css);
    }

// === GEMINI ULTRA-COMPACT SEGMENTS BLOCK ===
    // 1. «Схлопываем» вторую пустую строку (контекст и метки)
    addGlobalStyle('tbody[data-testid="segment-row"] > tr:nth-child(2) td { padding: 0 !important; height: 0 !important; line-height: 0 !important; font-size: 0 !important; border: none !important; }');
    // 2. Ужимаем отступы во всех основных ячейках первой строки (Source, Target, Info)
    addGlobalStyle('tbody[data-testid="segment-row"] .grid-row__cell { padding-top: 1px !important; padding-bottom: 1px !important; min-height: 0 !important; }');
    // 3. Сплющиваем ячейку с номером сегмента слева
    addGlobalStyle('tbody[data-testid="segment-row"] td[data-testid="number"] { padding-top: 0 !important; padding-bottom: 0 !important; vertical-align: middle !important; }');
    // 4. Убираем минимальную высоту и внешние поля у обертки редактора
    addGlobalStyle('tbody[data-testid="segment-row"] .content-editable-wrapper { min-height: 0 !important; padding: 0 !important; margin: 0 !important; }');
    // 5. Ужимаем сам текст и межстрочный интервал
    addGlobalStyle('tbody[data-testid="segment-row"] .l-content-editor__view { min-height: 0 !important; line-height: 1.25 !important; padding-top: 1px !important; padding-bottom: 1px !important; }');
    // 6. Стягиваем блок информации справа
    addGlobalStyle('tbody[data-testid="segment-row"] .l-segments-v2__info { padding: 0 !important; min-height: 0 !important; align-items: center !important; }');
    // 7. Уменьшаем высоту плашек совпадения (101%, 97% и т.д.)
    addGlobalStyle('tbody[data-testid="segment-row"] .sc-badge { height: 16px !important; line-height: 16px !important; padding: 0 4px !important; }');
    // 8. Уменьшаем высоту кнопки подтверждения (галочки)
    addGlobalStyle('tbody[data-testid="segment-row"] button[data-testid^="confirm-btn"] { height: 20px !important; min-height: 20px !important; padding: 0 4px !important; }');
    // ===========================================

    //Latest update - January 14, 2025
    //addGlobalStyle('.sc-popup-presenter {display: none !important;}'); //killing the "Cannot continue work" overlay.

    addGlobalStyle('.red {display: none !important;}'); //hiding the Revision History header to save space
//////////////////
    // addGlobalStyle('.l-segments__cell_editor, .l-segments__cell-info {padding: 0px 20px 0px 8px !important;}'); //Override by Gemini // поля ячеек в редакторе - при высоте окна менее 960px - после 03.09.2021
//////////////////
    // addGlobalStyle('.grid-number-column-td.handle {padding-top: 0px !important;}'); //Override by Gemini

    //window height-based safety
    // addGlobalStyle('@media screen and (min-height: 960px) {.l-segments__cell_editor, .l-segments__cell-info {padding: 0px 20px 4px 8px !important;}}'); //Override by Gemini //поля в ячейке со значком подтверждения
    // addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__cell_editor, .l-segments__cell-info {padding: 4px 20px 8px 8px !important;}}'); //Override by Gemini //поля в ячейке со значком подтверждения

    //после 19.03.2023
    addGlobalStyle('.l-segments__cell_editor {font-family: Roboto, InvisibleFont, Inter, Helvetica, Arial, sans-serif !important;}'); //possible fonts - font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;


    //addGlobalStyle('.l-segments__table-v2 {font-size: 16px !important; line-height: 16px !important; font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;}'); //font size, line interval; possible fonts - font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;
    //addGlobalStyle('.l-segments__table-v2 {font: 400 16px/20px Roboto,Helvetica,Arial,sans-serif !important; font-size: 16px !important; line-height: 20px;}'); 18px for larger font


    //Improve font readability
    //addGlobalStyle('.l-segments__table {font-weight: 500 !important;}'); //font thickness, ugly alternative
    //addGlobalStyle('.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 0px !important; -webkit-text-stroke-width: 0.01px !important;}'); //less ugly, fat AA

    //since 14.04.2021 text shadow blinks, had to disable
    //04.05.2021 fixed, working as intended
    //addGlobalStyle('@media screen and (-webkit-min-device-pixel-ratio:0) {.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 1px rgba(80,80,80,0.3) !important; -webkit-text-stroke-width: 0.01px !important;}}'); //
    //addGlobalStyle('@media screen and (min--moz-device-pixel-ratio:0) {.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: none !important}}'); //
    addGlobalStyle('@media screen and (-webkit-min-device-pixel-ratio:0) {div.l-content-editor__view.l-content-editor__view_editor {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 1px rgba(80,80,80,0.3) !important; -webkit-text-stroke-width: 0.01px !important;}}'); //обмазываемся жЫрным антиалиасингом, но только в хроме
    addGlobalStyle('@media screen and (min--moz-device-pixel-ratio:0) {.l-content-view.l-content-editor {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: none !important}}'); //в ФФ не обмазываемся


    //addGlobalStyle('.l-segments__cell__preview.g-icon.g-icon_preview.l-segments__cell__preview_alone {display:none !important;}'); //hide irritating preview icon
    //addGlobalStyle('.l-segments__cell__preview.g-icon.g-icon_preview {display:none !important;}'); //hide irritating preview icon
    addGlobalStyle('.l-segments__preview.g-icon.g-icon_preview {display:none !important;}'); //прячем глаз - после 03.09.2021

    addGlobalStyle('.l-workflow-progress-panel__ls-wordcount {color:#000000 !important;}'); // stat text color
    addGlobalStyle('.l-segments__cell-info {border-left: 1px groove #eae1eb !important;}'); // vertical line between target & info

    addGlobalStyle('div[data-testid="dropdown-container"].sc-dropdown__container {max-height: 90vh !important;}'); // filters dropdown menu enlarged to fit more options without scrolling

    //Make non-confirmed stand out vs confirmed
    //addGlobalStyle('.segment-button-confirm-done.sc-button_flat:disabled .sc-button__text .sc-icon[data-v-642de42f] {fill: #A0F9A0 !important;}'); //цвет галки светлее
    addGlobalStyle('.segment-button-confirm-done.sc-button_flat:disabled .sc-icon[data-v-73ed85ed] {fill: #A0F9A0 !important;}'); //цвет галки светлее

    addGlobalStyle('button[data-testid="confirm-btn_done"] .sc-icon {width: 10px !important; height: 10px !important;}'); //галка помельче

    //addGlobalStyle('.l-segments__confirm-btn {font-weight: bold !important; color: #000000 !important;}'); //bold unconf tick
//  addGlobalStyle('.sc-button_cta-black {background-color: #bfdae0 !important; color: #000000 !important; border: .1rem solid #bfbfbf !important;}'); //фон с галкой в текущем сегменте
    addGlobalStyle('button[data-testid="confirm-btn"].sc-button_cta-black {background-color: #bfdae0 !important; color: #000000 !important; border: .1rem solid #bfbfbf !important;}'); //фон с галкой в текущем сегменте
    addGlobalStyle('.sc-button_cta-black .sc-icon {fill: #000000 !important;}'); //галка в текущем неподтверждённом сегменте
    addGlobalStyle('.sc-button_simple .sc-icon {fill: #000000 !important;}'); //галка в неподтверждённых сегментах

    //Убираем попугайские лампочки на фуре
    addGlobalStyle('.sc-badge.sc-badge_blue {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_green {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_yellow {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_red {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_purple {opacity: 0.3 !important;}');

    addGlobalStyle('.errors-tqs__badge-wrapper {display:none !important;}'); //прячем уродский Q XXX, после 09.09.2026

    addGlobalStyle('.stage-select__progressbar.sc-progress {width: 400px !important}'); //full progress bar length
    addGlobalStyle('.sc-progress {height: 1rem !important; background-color: #d1b8ff !important;}'); // progress bar height & color
    addGlobalStyle('.sc-progress__bar {height: 1rem !important; background-color: #a000cc !important;}'); //completed bar

    addGlobalStyle('.language-select__wrapper {max-width: 100px !important;}'); //language field length

    //addGlobalStyle('.errors-wrap__count-errors {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения
    //addGlobalStyle('.sc-text_12[data-v-50c514e8][data-test-id="errors-wrap__text"] {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения
    //addGlobalStyle('.sc-text_12[data-test-id="errors-wrap__text"] {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения - после 12.07.23
    addGlobalStyle('.sc-text_12[data-testid="errors-wrap__text"] {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения
    addGlobalStyle('svg[data-testid="errors-wrap__icon"] {height: 7px !important; width: 0px !important; color: #fb8c00 !important;}'); //errors? what errors?
    addGlobalStyle('.l-segments-v2__info-left svg[xmlns="http://www.w3.org/2000/svg"] {width: 10px !important; height: 10px !important; opacity: 30% !important}'); //smaller arrow "translated outside smartcat"



    //1.11.2025 - уменьшение информационной колонки
    /*
    addGlobalStyle('.errors-wrap__container[data-v-6931d544] {min-width: 1px !important; max-width: 1px !important}'); //скукоживаем контейнер ошибки (бесполезный)
    addGlobalStyle('.l-segments__cell-info {width: 5% !important}'); //smaller info column
    addGlobalStyle('.counter-wrapper {display: none !important}'); //smaller container for info column
    addGlobalStyle('.l-segments-v2__info {gap: 1px !important; padding-right: 1px !important}'); //smaller container for info column
    addGlobalStyle('.l-segments-v2__info-left {gap: 1px !important; grid-template-columns: repeat(3, 0fr) !important}'); //smaller container for info column
    */



    addGlobalStyle('.l-content-editor__view {font-variant-ligatures: none !important;}'); //лечим баг со слипанием для сочетаний "fi" и "fl".

    //addGlobalStyle('.tooltip-comment.tooltip-comment-active {opacity: 0.2 !important;}');//полупрозрачный всплывающий значок коммента
    addGlobalStyle('.tooltip-comment.tooltip-comment-active {display:none !important;}');//отсутствующий всплывающий значок коммента

    //addGlobalStyle('.l-segments__cell__info__text-workflow {font-weight: bold !important; font: 15px/1 !important; color: #000000 !important;}'); //bold work name
    //addGlobalStyle('.l-segments__cell__info__text-workflow.l-segments__confirmed {font-weight: normal !important; font: 10px/1 !important; color: #A0F9A0 !important;}'); //"done" small and green
    //addGlobalStyle('.l-toolbar-button.l-icon-btn {width: 100% !important;}'); //container spread
    //addGlobalStyle('.g-icon.g-icon_join {width: 120px !important; background-color: #CCFFCC !important;}'); //segment merge is big and green
    //addGlobalStyle('.l-cat__number, .l-cat__source-text, .l-cat__match, .l-cat__target-text, .l-cat__cell.l-cat-text {padding-top: 0px !important; padding-bottom: 0px !important;}'); //CAT - TM & TB - #, Orig, %, Tran. Bad cat, no padding for you

    // addGlobalStyle('.content-editable-wrapper__content {padding: 0px !important;}'); //Override by Gemini //padding в окне редактора

    addGlobalStyle('.table-filter-empty-row {padding: 0px !important;}'); //padding в тупой пустой последней строке

    //addGlobalStyle('.l-cat__cell.l-cat__number, .l-cat__cell.l-cat__cell_text, .l-cat__cell.l-cat__match {padding: 0px 5px 0px 0px !important;}'); //CAT - TM & TB - номера, оригинал, %, перевод, отступы сверху и снизу - после 03.09.2021
    //addGlobalStyle('.l-cat-row {min-height: 20px !important}'); //CAT - TM & TB - line height
    //addGlobalStyle('.l-cat__row {min-height: 20px !important}'); //CAT - TM & TB - высота строки - после 03.09.2021
    //addGlobalStyle('.l-cat__cell.l-cat__number {width: 24px !important}'); //CAT - TM & TB - # - fixed width
    addGlobalStyle('.translation-row__cell {padding: 0px 5px 1px 0px !important;}'); //CAT - TM & TB - оригинал, перевод - отступы  - после 31.07.2026
    addGlobalStyle('.translation-row {grid-template-columns: 30px 50px 1fr 1fr !important}'); //CAT - TM & TB - оригинал, перевод - отступы  - после 26.02.2023
    //addGlobalStyle('.translation-row {grid-template-columns: 30px 50px minmax(0, 1fr) minmax(0, 1fr) !important}');

    //после 09.07.2026
    /*
    addGlobalStyle('.suggested-glossary-terms-hint {flex-wrap: wrap !important;}');
    */
    addGlobalStyle('.suggested-glossary-terms-hint__text { white-space: normal !important; flex: 1 !important; min-width: 0 !important; }');
    /*
    // Разрешаем перенос текста внутри кнопок в этом блоке
    addGlobalStyle('.suggested-glossary-terms-hint__actions .sc-button__text { white-space: normal !important; text-align: center !important; line-height: 1.1 !important; }');
    // Убираем жесткую фиксацию высоты кнопки, чтобы она могла растягиваться вниз при переносе текста
    addGlobalStyle('.suggested-glossary-terms-hint__actions .sc-button { height: auto !important; min-height: 14px !important; padding: 0px 0px !important; white-space: normal !important; }');
    // На всякий случай разрешаем самим кнопкам (если их там несколько) перескакивать друг под друга

    addGlobalStyle('.suggested-glossary-terms-hint__actions { flex-wrap: wrap !important; justify-content: center !important; }');
    */
    // Выставляем текст и кнопку не в длину, а колонкой, чтоб на большом масштабе не рвало вёрстку

    addGlobalStyle('.suggested-glossary-terms-hint { flex-direction: column !important; align-items: center !important; gap: 8px !important; }');
    /**/
    //addGlobalStyle('.sc-text_12[data-v-fe7a7749] {font-size: 12px; line-height: 16px;}'); //CAT - line number & idiotic hotkey prompt ; display: none



    addGlobalStyle('.translation-row.translation-row--selected .l-content-editor__view.l-content-editor__view_highlighter {display: none !important};'); //убираем второй слой (подсветку) в строках CAT TM

    addGlobalStyle('.l-search-filter__toggle-extend-filter {min-width: 75px !important}'); //fixed width, no filter button wiggle
    addGlobalStyle('.md-select_options_no-overflow, .md-select__option {padding: 8px !important}'); //выпадающие списки в фильтре - меньше отступ слева, чтобы влезало без прокрутки

    //addGlobalStyle('#sc-popup-wrapper > div.sc-popup:has(div.l-task-selector__buttons) {width: 90vw !important; height: 90vh !important;}'); //если есть класс "div.g-btn__combo", как в запросе "открыть как" - раздвигаем окно под кнопку
    //addGlobalStyle('#sc-popup-wrapper .l-task-selector__buttons > button {width: 80vw !important; height: 75vh !important; font-size: 26px !important; background: #d2f9d2 !important;}');
    addGlobalStyle('.l-task-selector.sc-popup {width: 90vw !important; height: 90vh !important;}'); //раздвигаем окно под кнопку
    addGlobalStyle('.l-task-selector__buttons > button {width: 80vw !important; height: 75vh !important; font-size: 26px !important; background: #d2f9d2 !important;}'); //пихаем жЫрную кнопку
    addGlobalStyle('.editor-wrapper > .g-popup-box.editor-popup .g-layout_horizontal .g-btn__combo > button {font-size: 26px !important; background: #d2f9d2 !important;}');
    //addGlobalStyle('.editor-wrapper > .g-popup-box.editor-popup .g-layout_horizontal .g-btn__combo > button {width: 80vw !important; height: 75vh !important}'); //editor button
    //addGlobalStyle('.editor-wrapper > .editor-popup.g-popupbox__wrapper {width: 90vw !important; height: 90vh !important}'); //editor button
    //.editor-wrapper > .g-popup-box.editor-popup .g-layout_horizontal .g-btn__combo > button {font-size: 24px; background: #d2f9d2;}


    //addGlobalStyle('.workflow-progress-tip {right: auto; top: 1px !important; z-index: 19010; left: 50% !important; height: 50px !important; width: 350px !important; display: block !important}'); //stick progress
    addGlobalStyle('.x-tip-body.x-tip-body-default.x-tip-body-default {left: 0px;top: 0px; padding: 0px 0px 0px 0px !important;}'); //shrink my progress baby (and other popups)
    //addGlobalStyle('.progress-legend-name{font-size:12px !important; padding-bottom: 0px !important;}'); // work font, shrink'em
    //addGlobalStyle('.progress-legend{min-width: 350px !important;}'); //progress in %, line intact
    //addGlobalStyle('.l-workflow-progress-tip__words-count{min-width: 150px !important; padding-bottom: 0px !important;}'); //progress in words, line intact

    addGlobalStyle('.l-revisions-toolbar {padding: 0px !important;}'); //rev history
    //addGlobalStyle('.l-revisions__column.l-revisions__column-number, .l-revisions__column.l-revisions__column-text, .l-revisions__column.l-revisions__column-date, .l-revisions__column.l-revisions__column-stage, .l-revisions__column.l-revisions__column-user, .l-revisions__column.l-revisions__column-save, .l-comment__row.l-comment_new.l-comment_own {padding: 0px 12px !important; min-height: 20px !important}'); //rev history & comments
    addGlobalStyle('.l-revisions__header, .l-revisions__column, .l-revisions__column.l-revisions__column_text {padding: 0px 6px !important; min-height: 20px !important}'); //строка истории - после 03.09.2021
    addGlobalStyle('.l-revisions__scrollable-body {top: 46px !important;}'); //rev history
    addGlobalStyle('.l-revisions-v2__table>*>*>* {padding: 3px !important; min-height: 20px !important; top: 0px !important}'); //rev history

    //addGlobalStyle('span.sc-text.sc-text_12.sc-text_regular.sc-text_normal.sc-text_none { display: none !important; }'); //hide the role in rev history, reduce interline gap
    //addGlobalStyle('span.sc-text.sc-text_12.sc-text_regular.sc-text_normal.sc-text_none:not(.counter-segments) { display: none !important; }');
    addGlobalStyle('tr[data-testid="revision-row"] [data-testid="user-name"] + div { display: none !important; }');

    addGlobalStyle('.l-errors__column.l-errors__column-number, .l-errors__column.l-errors__column-text.l-errors__column-text_with-checker, .l-errors__column.l-errors__column-checker {padding: 0px 12px !important; min-height: 20px !important}'); //errors
    addGlobalStyle('.l-errors__scrollable-body {top: 20px !important;}'); //errors

    //addGlobalStyle('.l-segments__cell__match-percentage.yellow {color: #c36e04 !important;}');//fuzzy match color
    addGlobalStyle('.l-segments__match-percentage.l-segments__match-percentage_yellow {color: #c36e04 !important;}');//цвет неполных соответствий - после 03.09.2021
    addGlobalStyle('.l-segments__cell__info__text-source {font-size: 12px !important;}');//fuzzy match font size

    addGlobalStyle('div.l-notification__container {padding: 7px !important}'); //всплывающее окно уведомлений

    addGlobalStyle('.l-search-filter__next-occurrence, .l-search-filter__previous-occurrence {opacity: 50% !important;}'); //прозрачность кнопок поиска вперёд-назад

    //addGlobalStyle('.x-column-header-inner, .x-grid-cell-inner {padding: 0px 12px !important;}'); //shrink my history
    //addGlobalStyle('.x-tab {padding: 0px 15px !important}'); //and tab headers
    //addGlobalStyle('.x-toolbar {padding: 0px 8px !important}'); //and tabs
    //addGlobalStyle('.l-comment-text {margin-top: 0px !important;}'); //and comments
    //addGlobalStyle('.l-comment__row {font-weight: 400 !important;}'); //fix for the fucked up comments font

    addGlobalStyle('span.highlight {background-color: #d7fdb9 !important;}'); //concordance highlight color
    addGlobalStyle('.sc-icon.sc-icon_size-small.sc-icon_color-radiation-carrot.sc-icon_size-small {height: 0.5rem !important;}'); //error icon size


    //addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__row.l-segments__row-selected {background-color: #bfdae0 !important;}}'); //With great resolution comes great color
    addGlobalStyle('@media screen and (min-height: 700px) {.l-segments__row-v2.l-segments__row-v2__selected.js-active-row {background-color: #bfdae0 !important;}}'); //с большим разрешением приходит большая ответственность - после 03.09.2021
    //addGlobalStyle('@media screen and (min-height: 300px) {.l-segments__row-v2.l-segments__row-v2__selected.js-active-row {background-color: #bfdae0 !important;}}'); //с большим разрешением приходит большая ответственность - после 03.09.2021
    addGlobalStyle('.content-editable-wrapper.content-editable-wrapper-active {box-shadow: none !important; background:#bfdae0 !important}');
    //addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__table {font-size: 17px !important}}'); //With great resolution comes greater font size

    //addGlobalStyle('');

// Для третьего варианта
// --- В самом конце собираем всё в один CSS-блок и добавляем в DOM ---
    const style = document.createElement('style');
    style.textContent = rules.join('\n');
    (document.head || document.documentElement).appendChild(style);

// =========================================================================
// === SMARTCAT CONCORDANCE SEARCH ENHANCER ===
// =========================================================================

    const win = typeof unsafeWindow !== 'undefined' ? unsafeWindow : window;

    const CONFIG = {
        MAX_ITEMS: 3000,    // Максимум загружаемых результатов для защиты от зависания
        BATCH_SIZE: 5,      // Число параллельных запросов пагинации
        LOGS: true          // Вывод отладочной информации в Console DevTools
    };

    const originalFetch = win.fetch.bind(win);
    const origOpen = win.XMLHttpRequest.prototype.open;
    const origSend = win.XMLHttpRequest.prototype.send;
    const origSetRequestHeader = win.XMLHttpRequest.prototype.setRequestHeader;

    const searchCache = new Map();

    function log(msg, ...args) {
        if (CONFIG.LOGS) {
            console.log(`%c[Smartcat Enhancer]%c ${msg}`, 'color: #00e5ff; font-weight: bold;', 'color: #eceff1;', ...args);
        }
    }

    function isConcordanceUrl(url) {
        if (!url) return false;
        const lower = String(url).toLowerCase();
        return lower.includes('translationmemoriessearch/search') && !lower.includes('__enhanced=1');
    }

    function extractUrlString(resource) {
        if (!resource) return '';
        if (typeof resource === 'string') return resource;
        if (resource instanceof URL) return resource.href;
        if (resource instanceof Request) return resource.url;
        if (typeof resource.url === 'string') return resource.url;
        if (typeof resource.href === 'string') return resource.href;
        return String(resource);
    }

    function sanitizeQuery(rawText) {
        if (!rawText) return '';
        return rawText.replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
    }

    // Расчёт релевантности для сортировки (без штрафа за длину сегмента)
    function calculateRelevance(item, query, isReverse, isCaseSensitive) {
        const text = (isReverse ? item.targetText : item.sourceText) || '';
        if (!text || !query) return 0;

        const q = isCaseSensitive ? query : query.toLowerCase();
        const t = isCaseSensitive ? text : text.toLowerCase();

        // 1. Полное совпадение сегмента
        if (t.trim() === q.trim()) return 100000;

        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Границы слов с поддержкой Unicode (кириллица, латиница и др.)
        const exactWordRegex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${escaped}(?=[^\\p{L}\\p{N}_]|$)`, 'gu');
        const caseInsensitiveWordRegex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${escaped}(?=[^\\p{L}\\p{N}_]|$)`, 'gui');

        const exactMatches = text.match(exactWordRegex);
        const caseInsensitiveMatches = text.match(caseInsensitiveWordRegex);

        let score = 0;

        if (exactMatches && exactMatches.length > 0) {
            // Точное отдельное слово с сохранением регистра (Lidding == Lidding)
            score = 50000 + (exactMatches.length * 1000);
        } else if (caseInsensitiveMatches && caseInsensitiveMatches.length > 0) {
            // Точное отдельное слово без учёта регистра (lidding == Lidding)
            score = 30000 + (caseInsensitiveMatches.length * 1000);
        } else if (text.includes(query)) {
            // Подстрока с сохранением регистра
            score = 15000;
        } else if (t.includes(q)) {
            // Подстрока без сохранения регистра
            score = 10000;
        } else {
            // Морфология/стемминг от бэкенда Smartcat (lidded, lids, lid)
            score = 1000;
            const words = isReverse ? item.targetFoundWords : item.sourceFoundWords;
            if (Array.isArray(words) && words.length > 0) {
                const maxLen = Math.max(...words.map(w => w.length || 0));
                score += maxLen * 50;
            }
        }

        return score;
    }

    // Подсветка точного слова целиком, а не обрезанных 3 букв корня
    function fixHighlighting(item, query, isReverse) {
        const textField = isReverse ? 'targetText' : 'sourceText';
        const wordsField = isReverse ? 'targetFoundWords' : 'sourceFoundWords';
        const text = item[textField];
        if (!text || !query) return;

        const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        let regex = new RegExp(`(?<=^|[^\\p{L}\\p{N}_])${escaped}(?=[^\\p{L}\\p{N}_]|$)`, 'gui');
        let matches = [...text.matchAll(regex)];

        if (matches.length === 0) {
            regex = new RegExp(escaped, 'gui');
            matches = [...text.matchAll(regex)];
        }

        if (matches.length > 0) {
            item[wordsField] = matches.map(m => ({
                begin: m.index,
                end: m.index + m[0].length,
                length: m[0].length
            }));
        }
    }

    // Сборка заголовков авторизации для безопасной фоновой пагинации
    function extractHeaders(resource, config, customHeaders) {
        const headers = new Headers();
        if (customHeaders && typeof customHeaders === 'object') {
            for (const [k, v] of Object.entries(customHeaders)) {
                headers.set(k, v);
            }
        }
        if (resource instanceof Request && resource.headers) {
            resource.headers.forEach((val, key) => headers.set(key, val));
        }
        if (config && config.headers) {
            if (config.headers instanceof Headers) {
                config.headers.forEach((val, key) => headers.set(key, val));
            } else if (Array.isArray(config.headers)) {
                config.headers.forEach(([k, v]) => headers.set(k, v));
            } else if (typeof config.headers === 'object') {
                for (const [k, v] of Object.entries(config.headers)) {
                    headers.set(k, v);
                }
            }
        }
        return headers;
    }

    // Параллельная докачка оставшихся страниц
    async function fetchRemainingPages(baseParsedUrl, total, limit, headers) {
        const starts = [];
        const maxToFetch = Math.min(total, CONFIG.MAX_ITEMS);

        for (let s = limit; s < maxToFetch; s += limit) {
            starts.push(s);
        }

        log(`Всего совпадений: ${total}. Догружаем ${starts.length} страниц(ы) пачками по ${CONFIG.BATCH_SIZE}...`);
        const allItems = [];

        for (let i = 0; i < starts.length; i += CONFIG.BATCH_SIZE) {
            const batch = starts.slice(i, i + CONFIG.BATCH_SIZE);
            const promises = batch.map(async (startVal) => {
                const pageUrl = new URL(baseParsedUrl.toString());
                pageUrl.searchParams.set('start', startVal.toString());
                pageUrl.searchParams.set('__enhanced', '1');

                try {
                    const res = await originalFetch(pageUrl.toString(), {
                        method: 'GET',
                        headers: headers,
                        credentials: 'include'
                    });
                    if (!res.ok) return [];
                    const data = await res.json();
                    return data.items || [];
                } catch (e) {
                    console.error('[Smartcat Enhancer] Ошибка загрузки смещения start=' + startVal, e);
                    return [];
                }
            });

            const results = await Promise.all(promises);
            for (const batchItems of results) {
                allItems.push(...batchItems);
            }
        }

        return allItems;
    }

    // Главный процессор конкордансного поиска
    async function processConcordance(urlStr, initialData, headers) {
        const parsedUrl = new URL(urlStr, win.location.origin);
        const rawSearch = parsedUrl.searchParams.get('searchText') || '';
        const cleanQuery = sanitizeQuery(rawSearch);
        const isReverse = parsedUrl.searchParams.get('isReverse') === 'true';
        const isCaseSensitive = parsedUrl.searchParams.get('isCaseSensitive') === 'true';
        const limit = parseInt(parsedUrl.searchParams.get('limit') || '100', 10);
        const total = initialData.total || 0;

        let allItems = [...(initialData.items || [])];

        if (total > allItems.length) {
            const extra = await fetchRemainingPages(parsedUrl, total, limit, headers);
            allItems.push(...extra);
        }

        log(`Сортировка ${allItems.length} результатов по близости к "${cleanQuery}"...`);

        for (const item of allItems) {
            item.__score = calculateRelevance(item, cleanQuery, isReverse, isCaseSensitive);
            fixHighlighting(item, cleanQuery, isReverse);
        }

        // Стабильная сортировка по релевантности
        allItems.sort((a, b) => b.__score - a.__score);

        const cacheKey = `${parsedUrl.searchParams.get('documentId')}_${cleanQuery}_${isReverse}_${isCaseSensitive}`;
        searchCache.set(cacheKey, {
            total: allItems.length,
            items: allItems
        });

        return {
            total: allItems.length,
            items: allItems
        };
    }

    // --- Перехват fetch ---
    win.fetch = async function (resource, config) {
        const urlStr = extractUrlString(resource);

        if (isConcordanceUrl(urlStr)) {
            log('Перехвачен запрос (fetch):', urlStr);
            const parsedUrl = new URL(urlStr, win.location.origin);
            const start = parseInt(parsedUrl.searchParams.get('start') || '0', 10);
            const limit = parseInt(parsedUrl.searchParams.get('limit') || '100', 10);
            const cleanQuery = sanitizeQuery(parsedUrl.searchParams.get('searchText') || '');
            const isReverse = parsedUrl.searchParams.get('isReverse') === 'true';
            const isCaseSensitive = parsedUrl.searchParams.get('isCaseSensitive') === 'true';
            const cacheKey = `${parsedUrl.searchParams.get('documentId')}_${cleanQuery}_${isReverse}_${isCaseSensitive}`;

            // Если Smartcat пагинирует повторно — отдаем из отсортированного кэша
            if (start > 0 && searchCache.has(cacheKey)) {
                const cached = searchCache.get(cacheKey);
                const pageSlice = cached.items.slice(start, start + limit);
                return new Response(JSON.stringify({ total: cached.total, items: pageSlice }), {
                    status: 200,
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
                });
            }

            try {
                // Выполняем оригинальный первый запрос со всеми его токенами
                const initialRes = await originalFetch.apply(this, arguments);
                if (!initialRes.ok) return initialRes;

                const initialData = await initialRes.json();
                const headers = extractHeaders(resource, config);
                const finalData = await processConcordance(urlStr, initialData, headers);

                return new Response(JSON.stringify(finalData), {
                    status: 200,
                    statusText: 'OK',
                    headers: { 'Content-Type': 'application/json; charset=utf-8' }
                });
            } catch (err) {
                console.error('[Smartcat Enhancer] Сбой в обработке fetch:', err);
            }
        }

        return originalFetch.apply(this, arguments);
    };

    // --- Перехват XMLHttpRequest ---
    win.XMLHttpRequest.prototype.open = function (method, url, ...rest) {
        this._smartcatUrl = extractUrlString(url);
        this._smartcatMethod = method;
        this._smartcatHeaders = {};
        return origOpen.apply(this, [method, url, ...rest]);
    };

    win.XMLHttpRequest.prototype.setRequestHeader = function (header, value) {
        if (!this._smartcatHeaders) this._smartcatHeaders = {};
        this._smartcatHeaders[header] = value;
        return origSetRequestHeader.apply(this, arguments);
    };

    win.XMLHttpRequest.prototype.send = function (body) {
        const urlStr = this._smartcatUrl;

        if (isConcordanceUrl(urlStr)) {
            log('Перехвачен запрос (XHR):', urlStr);
            const target = this;
            const parsedUrl = new URL(urlStr, win.location.origin);
            const start = parseInt(parsedUrl.searchParams.get('start') || '0', 10);
            const limit = parseInt(parsedUrl.searchParams.get('limit') || '100', 10);
            const cleanQuery = sanitizeQuery(parsedUrl.searchParams.get('searchText') || '');
            const isReverse = parsedUrl.searchParams.get('isReverse') === 'true';
            const isCaseSensitive = parsedUrl.searchParams.get('isCaseSensitive') === 'true';
            const cacheKey = `${parsedUrl.searchParams.get('documentId')}_${cleanQuery}_${isReverse}_${isCaseSensitive}`;

            if (start > 0 && searchCache.has(cacheKey)) {
                const cached = searchCache.get(cacheKey);
                const pageSlice = cached.items.slice(start, start + limit);
                fulfillXhr(target, { total: cached.total, items: pageSlice });
                return;
            }

            const headers = extractHeaders(null, null, target._smartcatHeaders);
            const firstPageUrl = new URL(urlStr, win.location.origin);
            firstPageUrl.searchParams.set('__enhanced', '1');

            originalFetch(firstPageUrl.toString(), {
                method: target._smartcatMethod || 'GET',
                headers: headers,
                credentials: 'include'
            })
            .then(res => res.json())
            .then(initialData => processConcordance(urlStr, initialData, headers))
            .then(finalData => fulfillXhr(target, finalData))
            .catch(err => {
                console.error('[Smartcat Enhancer] Сбой в обработке XHR, откат на оригинальный запрос:', err);
                origSend.call(target, body);
            });

            return;
        }

        return origSend.call(this, body);
    };

    // Эмуляция ответа XHR со всеми методами, необходимыми Axios
    function fulfillXhr(target, data) {
        const responseText = JSON.stringify(data);

        Object.defineProperties(target, {
            readyState: { value: 4, configurable: true },
            status: { value: 200, configurable: true },
            statusText: { value: 'OK', configurable: true },
            responseText: { value: responseText, configurable: true },
            response: {
                get: () => target.responseType === 'json' ? data : responseText,
                configurable: true
            }
        });

        target.getAllResponseHeaders = function () {
            return 'content-type: application/json; charset=utf-8\r\n';
        };

        target.getResponseHeader = function (header) {
            if (header && header.toLowerCase() === 'content-type') {
                return 'application/json; charset=utf-8';
            }
            return null;
        };

        target.dispatchEvent(new Event('readystatechange'));
        target.dispatchEvent(new ProgressEvent('load'));
        target.dispatchEvent(new ProgressEvent('loadend'));

        if (typeof target.onreadystatechange === 'function') target.onreadystatechange(new Event('readystatechange'));
        if (typeof target.onload === 'function') target.onload(new ProgressEvent('load'));
        if (typeof target.onloadend === 'function') target.onloadend(new ProgressEvent('loadend'));
    }

    log('Активен. Стили применены, перехватчик конкорданса запущен.');

})();
