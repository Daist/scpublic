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
    //Latest update - Oct 06, 2020

    //padding
    addGlobalStyle('.l-segments__cell.l-segments__cell-number, .l-segments__cell.l-segments__cell-editor.js-source-cell, .l-segments__cell.l-segments__cell-editor.js-target-cell, .l-segments__cell.l-segments__cell-info, .l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 0px 20px 0px 8px !important;}');

    //window height-based safety
    addGlobalStyle('@media screen and (min-height: 850px) {.l-segments__cell__editor.source, .l-segments__cell__editor.target {padding: 0px 20px 0px 8px !important; min-height: 36px !important;}}');

    //addGlobalStyle('.x-segments .x-grid-item {font-size: 16px !important; line-height: 16px !important;}'); //font size, line interval; possible fonts - font-family: "Tahoma", "Times New Roman", Roboto, Helvetica, Arial, sans-serif !important;

    //Improve font readability
    //addGlobalStyle('.l-segments__table {font-weight: 500 !important;}'); //font thickness, ugly alternative
    //addGlobalStyle('.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 0px !important; -webkit-text-stroke-width: 0.01px !important;}'); //less ugly, fat AA
    
    //после 14.04.2021 тень замыливает-размыливает текст при любых изменениях, пришлось отключить
    //04.05.2021 наконец нашёл решение - браузер, видимо, самовольно включал радиус 1, а потом возвращал 0. Пофиксил.
    addGlobalStyle('@media screen and (-webkit-min-device-pixel-ratio:0) {.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: 0px 0px 1px rgba(80,80,80,0.3) !important; -webkit-text-stroke-width: 0.01px !important;}}'); //обмазываемся жЫрным антиалиасингом, но только в хроме
    addGlobalStyle('@media screen and (min--moz-device-pixel-ratio:0) {.l-segments__table {-webkit-font-smoothing: subpixel-antialiased !important; text-shadow: none !important}}'); //в ФФ не обмазываемся
    
    addGlobalStyle('.l-segments__cell__preview.g-icon.g-icon_preview.l-segments__cell__preview_alone {display:none !important;}'); //hide irritating preview icon

    addGlobalStyle('.l-workflow-progress-panel__ls-wordcount {color:#000000 !important;}'); // stat text color
    
    //Make non-confirmed stand out vs confirmed
    addGlobalStyle('.l-segments__confirm-btn.l-segments__confirmed {font: 10px/1 "smartcat-icons" !important; color: #A0F9A0 !important;}'); //my tick is small and green
    addGlobalStyle('.l-segments__confirm-btn {font-weight: bold !important; color: #000000 !important;}'); //bold unconf tick
    //addGlobalStyle('.l-segments__cell__info__text-workflow {font-weight: bold !important; font: 15px/1 !important; color: #000000 !important;}'); //bold work name
    addGlobalStyle('.l-segments__cell__info__text-workflow.l-segments__confirmed {font-weight: normal !important; font: 10px/1 !important; color: #A0F9A0 !important;}'); //"done" small and green
    addGlobalStyle('.l-segments__cell__info-errors__icon {font: 10px/1 "smartcat-icons" !important; color: #fb8c00 !important;}'); //errors? what errors?

    addGlobalStyle('.l-toolbar-button.l-icon-btn {width: 100% !important;}'); //container spread
    addGlobalStyle('.g-icon.g-icon_join {width: 120px !important; background-color: #CCFFCC !important;}'); //segment merge is big and green

    addGlobalStyle('.l-cat__number, .l-cat__source-text, .l-cat__match, .l-cat__target-text, .l-cat__cell.l-cat-text {padding-top: 0px !important; padding-bottom: 0px !important;}'); //CAT - TM & TB - #, Orig, %, Tran. Bad cat, no padding for you
    addGlobalStyle('.l-cat-row {min-height: 20px !important}'); //CAT - TM & TB - line height
    addGlobalStyle('.l-cat__cell.l-cat__number {width: 24px !important}'); //CAT - TM & TB - # - fixed width

    addGlobalStyle('.l-search-filter__toggle-extend-filter {min-width: 75px !important}'); //fixed width, no filter button wiggle

    addGlobalStyle('div#assigned-stages-select.x-segmented-button.x-box-item.x-segmented-button-vertical.x-segmented-button-default {width: 80vw !important; height: 75vh !important}'); //editor button, aiming sucks
    addGlobalStyle('a#select-manager-btn.x-btn.x-unselectable.x-box-item.x-btn-default-medium {width: 80vw !important; height: 10vh !important}'); //manager button

    addGlobalStyle('.workflow-progress-tip {right: auto; top: 1px !important; z-index: 19010; left: 50% !important; height: 50px !important; width: 350px !important; display: block !important}'); //stick progress
    addGlobalStyle('.x-tip-body.x-tip-body-default.x-tip-body-default {left: 0px;top: 0px; padding: 0px 0px 0px 0px !important;}'); //shrink my progress baby (and other popups)
    addGlobalStyle('.progress-legend-name{font-size:12px !important; padding-bottom: 0px !important;}'); // work font, shrink'em
    addGlobalStyle('.progress-legend{min-width: 350px !important;}'); //progress in %, line intact
    addGlobalStyle('.l-workflow-progress-tip__words-count{min-width: 150px !important; padding-bottom: 0px !important;}'); //progress in words, line intact

    addGlobalStyle('.l-revisions-toolbar {padding: 0px !important;}'); //rev history
    addGlobalStyle('.l-revisions__column.l-revisions__column-number, .l-revisions__column.l-revisions__column-text, .l-revisions__column.l-revisions__column-date, .l-revisions__column.l-revisions__column-stage, .l-revisions__column.l-revisions__column-user, .l-revisions__column.l-revisions__column-save, .l-comment__row.l-comment_new.l-comment_own {padding: 0px 12px !important; min-height: 20px !important}'); //rev history & comments
    addGlobalStyle('.l-revisions__scrollable-body {top: 46px !important;}'); //rev history

    addGlobalStyle('.l-errors__column.l-errors__column-number, .l-errors__column.l-errors__column-text.l-errors__column-text_with-checker, .l-errors__column.l-errors__column-checker {padding: 0px 12px !important; min-height: 20px !important}'); //errors
    addGlobalStyle('.l-errors__scrollable-body {top: 20px !important;}'); //errors
    
    addGlobalStyle('.x-column-header-inner, .x-grid-cell-inner {padding: 0px 12px !important;}'); //shrink my history
    addGlobalStyle('.x-tab {padding: 0px 15px !important}'); //and tab headers
    addGlobalStyle('.x-toolbar {padding: 0px 8px !important}'); //and tabs
    addGlobalStyle('.l-comment-text {margin-top: 0px !important;}'); //and comments
    addGlobalStyle('.l-comment__row {font-weight: 400 !important;}'); //fix for the fucked up comments font
    
    addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__row.l-segments__row-selected {background-color: #bfdae0 !important;}}'); //With great resolution comes great color

})();
