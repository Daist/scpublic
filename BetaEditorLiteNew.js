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
    //Latest update - June 06, 2023

    //padding
    //addGlobalStyle('.l-segments__cell.l-segments__cell-number, .l-segments__cell.l-segments__cell-editor.js-source-cell, .l-segments__cell.l-segments__cell-editor.js-target-cell, .l-segments__cell.l-segments__cell-info, .l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 0px 20px 0px 8px !important;}');
    addGlobalStyle('.l-segments__cell.l-segments__cell_number, .l-segments__cell_editor, .l-segments__cell.l-segments__cell-info {padding: 0px 20px 4px 8px !important;}'); // поля ячеек в редакторе - после 03.09.2021
    addGlobalStyle('.grid-number-column-td.handle {padding-top: 0px}!important;}');
    //addGlobalStyle('.l-segments__row-v2.l-segments__editor_source, .l-segments__row-v2.l-segments__editor_target {padding: 0px !important; border-radius: 0px !important;}'); // поля ячеек в редакторе в новой версии - после 15.03.2022 - не работает

    addGlobalStyle('.l-content-editor__view {font-variant-ligatures: none !important;}'); //лечим баг со слипанием для сочетаний "fi" и "fl".

    //window height-based safety
    //addGlobalStyle('@media screen and (min-height: 850px) {.l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 0px 20px 0px 8px !important; min-height: 36px !important;}}');
    addGlobalStyle('@media screen and (min-height: 960px) {.l-segments__number-value {min-height: 36px !important;}}'); //мин. высота строки при высоте окна >960px = 36px - после 03.09.2021

    //addGlobalStyle('.x-segments .x-grid-item {font-size: 16px !important; line-height: 16px !important;}'); //font size, line interval; possible fonts - font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;

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
    addGlobalStyle('.segment-button-confirm-done.sc-button_flat:disabled .sc-button__text .sc-icon[data-v-642de42f] {fill: #A0F9A0 !important;}'); //цвет галки светлее
    addGlobalStyle('button[data-testid="confirm-btn_done"] .sc-icon {width: 10px !important; height: 10px !important;}'); //галка помельче

    //addGlobalStyle('.l-segments__confirm-btn {font-weight: bold !important; color: #000000 !important;}'); //bold unconf tick
    addGlobalStyle('.sc-button_cta-black {background-color: #bfdae0 !important; color: #000000 !important; border: .1rem solid #bfbfbf !important;}'); //фон с галкой в текущем сегменте
    addGlobalStyle('.sc-button_cta-black .sc-icon {fill: #000000 !important;}'); //галка в текущем неподтверждённом сегменте
    addGlobalStyle('.sc-button_simple .sc-icon {fill: #000000 !important;}'); //галка в неподтверждённых сегментах

    //Убираем попугайские лампочки на фуре
    addGlobalStyle('.sc-badge.sc-badge_blue {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_green {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_yellow {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_red {opacity: 0.3 !important;}');
    addGlobalStyle('.sc-badge.sc-badge_purple {opacity: 0.3 !important;}');

    //changed after 7.11.2023
    addGlobalStyle('.stage-select__progressbar.sc-progress {width: 400px !important}'); //full progress bar length
    addGlobalStyle('.sc-progress {height: 1rem !important; background-color: #d1b8ff !important;}'); // progress bar height & background color
    addGlobalStyle('.sc-progress__bar {height: 1rem !important; background-color: #a000cc !important;}'); //completed bar     

    addGlobalStyle('.language-select__wrapper {max-width: 100px !important;}'); //language field length

    //addGlobalStyle('.errors-wrap__count-errors {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения
    addGlobalStyle('.sc-text_12[data-testid="errors-wrap__text"] {font-size: 1px !important;}'); //текст цифр у числа ошибок напротив значка подтверждения


    //addGlobalStyle('.tooltip-comment.tooltip-comment-active {opacity: 0.2 !important;}');//полупрозрачный всплывающий значок коммента
    addGlobalStyle('.tooltip-comment.tooltip-comment-active {display:none !important;}');//полупрозрачный всплывающий значок коммента

    //addGlobalStyle('.l-segments__cell__info__text-workflow {font-weight: bold !important; font: 15px/1 !important; color: #000000 !important;}'); //bold work name
    addGlobalStyle('.l-segments__cell__info__text-workflow.l-segments__confirmed {font-weight: normal !important; font: 10px/1 !important; color: #A0F9A0 !important;}'); //"done" small and green
    addGlobalStyle('svg[data-testid="errors-wrap__icon"] {height: 7px !important; width: 7px !important; color: #fb8c00 !important;}'); //errors? what errors?
    addGlobalStyle('.l-segments-v2__info-left svg[xmlns="http://www.w3.org/2000/svg"] {width: 10px !important; height: 10px !important; opacity: 30% !important}'); //smaller arrow "translated outside smartcat"

    //addGlobalStyle('.l-toolbar-button.l-icon-btn {width: 100% !important;}'); //container spread
    //addGlobalStyle('.g-icon.g-icon_join {width: 120px !important; background-color: #CCFFCC !important;}'); //segment merge is big and green

    //addGlobalStyle('.l-cat__number, .l-cat__source-text, .l-cat__match, .l-cat__target-text, .l-cat__cell.l-cat-text {padding-top: 0px !important; padding-bottom: 0px !important;}'); //CAT - TM & TB - #, Orig, %, Tran. Bad cat, no padding for you
    addGlobalStyle('.content-editable-wrapper__content {padding: 0px !important;}'); //padding в окне редактора

    addGlobalStyle('.table-filter-empty-row {padding: 0px !important;}'); //padding в тупой пустой последней строке

    //addGlobalStyle('.l-cat__cell.l-cat__number, .l-cat__cell.l-cat__cell_text, .l-cat__cell.l-cat__match {padding: 0px 5px 0px 0px !important;}'); //CAT - TM & TB - номера, оригинал, %, перевод, отступы сверху и снизу - после 03.09.2021
    //addGlobalStyle('.l-cat-row {min-height: 20px !important}'); //CAT - TM & TB - line height
    //addGlobalStyle('.l-cat__row {min-height: 20px !important}'); //CAT - TM & TB - высота строки - после 03.09.2021
    //addGlobalStyle('.l-cat__cell.l-cat__number {width: 24px !important}'); //CAT - TM & TB - # - fixed width
    addGlobalStyle('.translation-row__cell {padding: 0px 5px 5px 0px !important;}'); //CAT - TM & TB - оригинал, перевод - отступы  - после 26.02.2023
    addGlobalStyle('.translation-row {grid-template-columns: 50px 1fr 1fr !important}'); //CAT - TM & TB - ширина столбцов  - после 26.02.2023

    addGlobalStyle('.l-search-filter__toggle-extend-filter {min-width: 75px !important}'); //fixed width, no filter button wiggle
    addGlobalStyle('.md-select_options_no-overflow, .md-select__option {padding: 8px !important}'); //выпадающие списки в фильтре - меньше отступ слева, чтобы влезало без прокрутки

    addGlobalStyle('.l-task-selector.sc-popup {width: 90vw !important; height: 90vh !important;}'); //раздвигаем окно под кнопку "редактор или манагер"
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
    addGlobalStyle('.l-revisions-v2__table>*>*>* {padding: 3px !important; min-height: 20px !important; top: 0px !important;}'); //rev history



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
})();
