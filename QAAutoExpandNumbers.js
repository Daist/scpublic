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

    addGlobalStyle('.l-qa-check-report__segment-text [data-bind="text: sourceText"] {text-align: right}'); //выравнивание по правому краю текста оригинала
    
    $(document).ready(function() { //When document has loaded
        //$('<style type="text/css">tr.l-corpr__trhover.l-qa-check-goSegment.clickable + tr {display: table-row!important;}</style>').appendTo($("head")); - после 15.03.2019 не пашет, поменяли код
        //$('<style type="text/css">tr.l-corpr__trhover.l-corpr__trhover_clickable.l-qa-check-goSegment + tr {display: table-row!important;}</style>').appendTo($("head")); - после 30.04.2019 не пашет, поменяли код
        $('<style type="text/css">tr.l-corpr__trhover.l-corpr__trhover_clickable.l-qa-check-report__go-segment + tr {display: table-row!important;}</style>').appendTo($("head"));
    });
})();
