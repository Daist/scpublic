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
    //Latest update - Sep 07, 2021

    //padding
    addGlobalStyle('div.l-notification__container {padding: 7px !important}'); //всплывающее окно уведомлений
    addGlobalStyle('@media screen and (min-height: 1200px) {.l-segments__row.l-segments__row_selected.js-active-row {background-color: #bfdae0 !important;}}');

})();
