(function() {
    'use strict';
    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}
    //addGlobalStyle(''); //шаблон пустой строки на будущее
    //Последняя версия - от 06.10.2020

    //поля в нумерации, оригинале, переводе, значках ошибок и текущей задачи
    addGlobalStyle('.l-segments__cell.l-segments__cell-number, .l-segments__cell.l-segments__cell-editor.js-source-cell, .l-segments__cell.l-segments__cell-editor.js-target-cell, .l-segments__cell.l-segments__cell-info {padding: 0px 8px !important;}');

    //по высоте окна
    addGlobalStyle('@media screen and (min-height: 300px) {.l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 0px 8px !important;}}'); //поля в оригинале и переводе - от 300 до 970px = 0px
    addGlobalStyle('@media screen and (min-height: 850px) {.l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 8px 8px !important;}}'); //поля в оригинале и переводе - свыше 970px и до упора 8px, чтоб не висли однострочные сегменты

    //addGlobalStyle('.x-segments .x-grid-item {font-size: 16px !important; line-height: 16px !important;}'); //размер шрифта и межстрочный интервал; шрифт - font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;

    //Улучшение читабельности шрифта, а то дюже бледнючий в оригинале
    //addGlobalStyle('.l-segments__table {font-weight: 500 !important;}'); //толщина шрифта как альтернатива
    addGlobalStyle('.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 0px !important; -webkit-text-stroke-width: 0.01px !important;}'); //обмазываемся жЫрным антиалиасингом

    //Ниже попытка визуально выделить неподтверждённые сегменты на фоне уже подтверждённых
    addGlobalStyle('.l-segments__confirm-btn.l-segments__confirmed {font: 10px/1 "smartcat-icons" !important; color: #A0F9A0 !important;}'); //галка помельче; цвет галки светлее
    addGlobalStyle('.l-segments__confirm-btn {font-weight: bold !important; color: #000000 !important;}'); //галка неподтверждённых жирно; цвет чёрный
    //addGlobalStyle('.l-segments__cell__info__text-workflow {font-weight: bold !important; font: 15px/1 !important; color: #000000 !important;}'); //надпись "Редактура" жирно; цвет чёрный
    addGlobalStyle('.l-segments__cell__info__text-workflow.l-segments__confirmed {font-weight: normal !important; font: 10px/1 !important; color: #A0F9A0 !important;}'); //"готово" помельче; цвет светлее
    addGlobalStyle('.l-segments__cell__info-errors__icon {font: 10px/1 "smartcat-icons" !important; color: #fb8c00 !important;}'); //значок ошибки ещё меньше

    //addGlobalStyle('.l-menu-button.l-icon-btn {width: 100% !important;}'); //раздвинуть контейнер, чтоб показать всю кнопку
    //addGlobalStyle('.g-icon.g-icon_confirm.js-confirm-btn {width: 50px !important;}'); //кнопка подтверждения сегмента побольше; my def 50px
    addGlobalStyle('.l-toolbar-button.l-icon-btn {width: 100% !important;}'); //раздвинуть контейнер, чтоб показать всю кнопку
    addGlobalStyle('.g-icon.g-icon_join {width: 120px !important; background-color: #CCFFCC !important;}'); //кнопка объединения сегментов побольше и цветная

    addGlobalStyle('.l-cat__number, .l-cat__source-text, .l-cat__match, .l-cat__target-text, .l-cat__cell.l-cat-text {padding-top: 0px !important; padding-bottom: 0px !important;}'); //CAT - TM & TB - номера, оригинал, %, перевод, отступы сверху и снизу
    addGlobalStyle('.l-cat-row {min-height: 20px !important}'); //CAT - TM & TB - высота строки
    addGlobalStyle('.l-cat__cell.l-cat__number {width: 24px !important}'); //CAT - TM & TB - номера - постоянная ширина

    addGlobalStyle('.l-search-filter__toggle-extend-filter {min-width: 75px !important}'); //фиксированная ширина поля с числом результатов фильтрации для предотвращения сдвига кнопок при вкл/выкл фильтрации

    addGlobalStyle('div#assigned-stages-select.x-segmented-button.x-box-item.x-segmented-button-vertical.x-segmented-button-default {width: 80vw !important; height: 75vh !important}'); //кнопка для редактора, я задолбался целиться;
    addGlobalStyle('a#select-manager-btn.x-btn.x-unselectable.x-box-item.x-btn-default-medium {width: 80vw !important; height: 10vh !important}'); //кнопка для менеджера

    addGlobalStyle('.workflow-progress-tip {right: auto; top: 1px !important; z-index: 19010; left: 50% !important; height: 50px !important; width: 350px !important; display: block !important}'); //закрепление прогресса
    addGlobalStyle('.x-tip-body.x-tip-body-default.x-tip-body-default {left: 0px;top: 0px; padding: 0px 0px 0px 0px !important;}'); //скукоживание всплывающей таблички прогресса (и до кучи других всплывающих табличек)
    addGlobalStyle('.progress-legend-name{font-size:12px !important; padding-bottom: 0px !important;}'); // размер шрифта надписи вида работ и скукоживание по высоте
    //addGlobalStyle('.progress-legend-words{min-width: 100px !important; padding-bottom: 0px !important;}'); //прогресс в словах не разваливает строку после увеличения ее длины
    addGlobalStyle('.progress-legend{min-width: 350px !important;}'); //прогресс в процентах не разваливает строку после увеличения ее длины
    addGlobalStyle('.l-workflow-progress-tip__words-count{min-width: 150px !important; padding-bottom: 0px !important;}'); //прогресс в словах не разваливает строку после увеличения ее длины

    addGlobalStyle('.x-column-header-inner, .x-grid-cell-inner {padding: 0px 12px !important;}'); //скукоживание высоты строк заголовка и данных на вкладке истории изменений
    addGlobalStyle('.x-tab {padding: 0px 15px !important}'); //скукоживание высоты заголовков вкладок
    addGlobalStyle('.x-toolbar {padding: 0px 8px !important}'); //скукоживание высоты панелей
    addGlobalStyle('.l-comment-text {margin-top: 0px !important;}'); //скукоживание истории комментариев
    
    addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__row.l-segments__row-selected {background-color: #bfdae0 !important;}}'); //с большим разрешением приходит большая ответственность
    //addGlobalStyle('.l-segments__row.l-segments__row-selected {background-color: #CCFFCC !important;}'); //цвет фона текущего сегмента в редакторе; можно #BFDAE0
    //addGlobalStyle('.l-segments__row:nth-child(2n) {background-color: #F0F0F0 !important;}'); //цвет фона чётных сегментов в редакторе
    //addGlobalStyle('.l-segments__row:nth-child(odd) {background-color: #FFFFFF !important;}'); //цвет фона нечётных сегментов в редакторе
    //addGlobalStyle('.l-segments__row.l-segments__row-selected:nth-child(odd) {background-color: #CCFFCC !important;}'); //цвет фона текущего сегмента в редакторе
    //addGlobalStyle('.l-segments__row.l-segments__row-selected:nth-child(2n) {background-color: #CCFFCC !important;}'); //цвет фона текущего сегмента в редакторе

    //addGlobalStyle('.l-segments__row {background-color: #808080 !important;}'); //цвет фона всех остальных сегментов в редакторе
    //addGlobalStyle('.x-grid-body {background-color: #808080 !important;}'); //цвет фона в CAT
    //addGlobalStyle('.x-panel-body-default {background-color: #808080 !important;}'); //цвет фона в истории
    //addGlobalStyle('.x-form-item-label-default {color: #E5E5E5 !important;}'); //цвет шрифта на панелях
    //addGlobalStyle('.x-body {background-color: #E1E1E1; !important;}'); //цвет фона шапки


})();
