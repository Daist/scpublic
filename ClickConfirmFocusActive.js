let buttons2 = document.querySelectorAll('.sc-button');
for (let button of buttons2) {
    if (button.innerText === 'Подтвердить' || button.innerText === 'Сonfirm') {
        button.click();
        break;
    }
};
let notifications = Array.from(document.querySelectorAll('.l-notification__container'));
let visibleNotifications = notifications.filter(notification => getComputedStyle(notification).opacity === '1');
let firstNotification = visibleNotifications.reduce((first, current) => {
    let firstTop = parseFloat(getComputedStyle(first).top);
    let currentTop = parseFloat(getComputedStyle(current).top);
    return (currentTop < firstTop) ? current : first;
});
let buttons = Array.from(firstNotification.querySelectorAll('button span'));
let okButton = buttons.find(button => button.innerText === 'Подтвердить' || button.innerText === 'OK, confirm' || button.innerText === 'Сonfirm');
if(okButton) {
    okButton.parentElement.click();
}

(function() {
    'use strict';
    function focusActiveSegment() {
        const activeRow = document.querySelector('.js-active-row.l-segments__row-v2__selected');
        if (activeRow) {
            const targetCell = activeRow.querySelector('.l-segments__cell_editor-target .l-content-editor__view_editor');
            if (targetCell) {
                targetCell.focus();
                targetCell.click();
            }
        }
    }
    focusActiveSegment();
})();
