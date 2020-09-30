//TestingVersionNumberonGIT
// ==UserScript==
// @version 12345
// ==/UserScript==

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


})();