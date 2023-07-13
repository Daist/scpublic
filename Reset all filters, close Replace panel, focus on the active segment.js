//Reset all filters
const button1 = document.querySelector('button[data-testid="clear-filter-button"]');
if (button1) {
  button1.click();
};
const button2 = document.querySelector('.g-btn__icon.g-icon.g-icon_filter-reset');
if (button2) {
  button2.click();
};
const button3 = document.querySelector('button[data-v-fdd29a42][data-v-5c653a04]');
if (button3) {
  button3.click();
};
//close the Replace panel
const button = document.querySelector('[data-testid="toogle-replace-panel-button"] .toolbar-button__activator');
const panel = document.querySelector('.replace-row-panel');
if (button && panel) {
  button.click();
};
let intervalId = null;
let elapsedSeconds = 0;

//Go to the active segment
function focusActiveSegment() {
    const activeRow = document.querySelector('.js-active-row.l-segments__row-v2__selected');
    if (activeRow) {
        const targetCell = activeRow.querySelector('.l-segments__cell_editor-target .l-content-editor__view_editor');
        if (targetCell) {
            targetCell.focus();
            targetCell.click();
        }
        // activeRow is available and the targetCell is clicked, so stop checking
        clearInterval(intervalId);
    } else {
        elapsedSeconds++;
        // Stop checking after 10 seconds if the activeRow is still not available
        if (elapsedSeconds >= 10) {
            clearInterval(intervalId);
        }
    }
}

// Check for activeRow every second
intervalId = setInterval(focusActiveSegment, 1000);
