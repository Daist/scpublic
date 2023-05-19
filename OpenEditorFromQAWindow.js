(function() {
    'use strict';

    document.addEventListener('click', function(e) {
        var target = e.target;
        while (target && target.tagName !== 'A') {
            target = target.parentElement;
        }
        if (!target) return;
        var url = target.getAttribute('href');
        var regex = /&SegmentIndex=\d+$/;
        if (regex.test(url)) {
            e.preventDefault();
            e.stopPropagation();
            url += '&selectedStage=1';
            window.open(url); 
        }
    }, true);
})();
