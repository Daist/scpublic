//Better QA Window
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

    addGlobalStyle('.g-menubox__dropbox{max-height:95vh !important;}'); //accounts list, no-scroll window
    addGlobalStyle('.g-drpdwn__list.g-drpdwn__list-multiselect {max-height: 300px !important;}'); //list for order filtering, no-scroll

    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__client-vendor-td {width: 130px !important;}'); //client width
    addGlobalStyle('.l-project-list__th.l-corpr__th.l-project-list__projname-th {width: 330px !important;}'); //project width 
    addGlobalStyle('.l-corpr__th.l-project__td.l-project__td_progress {width: 120px !important;}'); //progress bar width
    
    addGlobalStyle('div.ui-progressbar__line.ui-progressbar__line--2 {background-color: #e5a5e5 !important;}'); //calm pink progress bar
    
    addGlobalStyle('.g-popupbox_size_xl {height:75vh !important; width: 75vw !important;}'); //QA window
    addGlobalStyle('.g-popupbox.g-popupbox_size_xl.g-popupbox_content_flexable {max-height:75vh !important;}'); //QA window

    addGlobalStyle('.l-corpr__td.l-qa-check-report__document-title {COLOR: #EFEFEF !important}'); //grey-out filenames
    addGlobalStyle('.g-link {COLOR: #EFEFEF !important}'); //grey-out links
    addGlobalStyle('.g-link:visited {COLOR: #AFFFCF !important}'); //visited links color
    
    addGlobalStyle('.g-link.g-link_upper.g-link_bold {COLOR: #7e64bd !important}'); //regular server link color

    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.g-tabs__panel_clearfix {bottom: 20px; !important;}'); //formatting
    addGlobalStyle('div.g-popupbox__panel.g-tabs__panel.l-project__executive-tab {min-height: 150px !important; height: 150px !important; display: block !important;}'); //show mass confirm here too, don't switch tabs
    addGlobalStyle('div.g-popupbox__bd {height: 555px !important;}'); //window size to avoid clashing with ok/cancel buttons

    //addGlobalStyle('.l-corpr__td.l-qa-check-report__segment-number.l-corpr__td_openable {padding-right: 4px !important;}'); //used to cure epilepsy, fixed
    addGlobalStyle('.g-row.g-row_spacing_xxxl {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.md-select__container.md-select__label_float {padding-top: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_2 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    addGlobalStyle('.g-row.g-row_spacing_m.g-grid.g-grid_cols_3 {margin-bottom: 0px !important;}'); //hole cleanup, button alignment
    
    addGlobalStyle('.l-corpr__td {padding-top: 0px !important; padding-bottom: 0px !important;}'); //vertical list compression

})();
