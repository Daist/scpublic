//Better QA Window
(function() {
    'use strict';

    //$(document).ready(function() { //When document has loaded
    //    $('<style type="text/css">tr.l-corpr__trhover.l-qa-check-goSegment.clickable + tr {display: table-row!important;}</style>').appendTo($("head")); // автораскрытие всех строк в категории
    //});

    function addGlobalStyle(css) {
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css;
    head.appendChild(style);
}

    addGlobalStyle('.g-menubox__dropbox{max-height:95vh !important;}'); //список аккаунтов в окошке без прокрутки
    addGlobalStyle('.g-drpdwn__list.g-drpdwn__list-multiselect {max-height: 300px !important;}'); //список для фильтрации заказов без прокрутки

    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__client-vendor-td {width: 130px !important;}'); //ширина столбца с названием клиента
    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__projname-th {width: 330px !important;}'); //ширина столбца с названием проекта
    addGlobalStyle('.l-corpr__th.l-project__td.l-project__td_progress {width: 120px !important;}'); //ширина столбца с прогрессом

    //с мая 2019
    addGlobalStyle('.g-popupbox_size_xl {height:75vh !important; width: 75vw !important;}'); //размер окна для проверки
    addGlobalStyle('.g-popupbox.g-popupbox_size_xl.g-popupbox_content_flexable {max-height:75vh !important;}'); //размер окна для проверки

    addGlobalStyle('.l-corpr__td.l-qa-check-report__document-title {COLOR: #EFEFEF}'); //снижение видимости имён файлов
    addGlobalStyle('.g-link {COLOR: #EFEFEF !important}'); //снижение видимости ссылки для перехода в списке ошибок
    addGlobalStyle('.g-link:visited {COLOR: #AFFFCF !important}'); //снижение видимости ссылки для перехода в списке ошибок

    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.g-tabs__panel_clearfix {bottom: 20px; !important;}'); //отступ для форматирования
    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.l-project__executive-tab {min-height: 150px !important; height: 150px !important; display: block !important;}'); //отображение разрешения массового подтверждения сразу, чтоб не переключаться между вкладками
    addGlobalStyle('div.g-popupbox__bd {height: 555px !important;}'); //размер окна, чтоб пункты  не наползали на кнопки ок/отмены

    addGlobalStyle('.l-corpr__td.l-qa-check-report__segment-number.l-corpr__td_openable {padding-right: 4px !important;}'); //лечение эпилепсии от наведения курсора на активную строку

    //после обновления 6.12.2018
    addGlobalStyle('.g-row.g-row_spacing_xxxl {margin-bottom: 0px !important;}'); //подчищаем дыры для выравнивания кнопок
    addGlobalStyle('.md-select__container.md-select__label_float {padding-top: 0px !important;}'); //подчищаем дыры для выравнивания кнопок
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_2 {margin-bottom: 0px !important;}'); //подчищаем дыры для выравнивания кнопок
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_3 {margin-bottom: 0px !important;}'); //подчищаем дыры для выравнивания кнопок

    //ТОТАЛЬНОЕ уплотнение списков в окне просмотра проекта и поиска ошибок
    addGlobalStyle('.l-corpr__td {padding-top: 1px !important; padding-bottom: 1px !important;}'); //уплотнение по вертикали

})();