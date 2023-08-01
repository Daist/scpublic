//async function copySelectedText() {
//try {
//    const selectedText = window.getSelection().toString();
//    await navigator.clipboard.writeText(selectedText);
//    console.log('Selected text copied to clipboard');
//  } catch (err) {
//    console.error('Failed to copy text: ', err);
//  }
//}
//copySelectedText();

const button = document.querySelector('[data-testid="toogle-replace-panel-button"] .toolbar-button__activator');
const panel = document.querySelector('.replace-row-panel');
if (button && !panel) {
  button.click();
}

async function pasteClipboardContents() {
  try {
    const text = await navigator.clipboard.readText();
    const inputBox1 = document.getElementById("editor-search-input");
    inputBox1.focus();
    inputBox1.value = text;
    inputBox1.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
    const inputBox2 = document.getElementById("replace-input-search");
    inputBox2.focus();
    inputBox2.value = text;
    inputBox2.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
  } catch (err) {
    console.error('Failed to read clipboard contents: ', err);
  }
}
    setTimeout(() => {
        pasteClipboardContents();
    }, 500);

setTimeout(function() {
        const prevButton = document.querySelector('[data-testid="goto-prev-occurrence-button"]');
        const nextButton = document.querySelector('[data-testid="goto-next-occurrence-button"]');
        const replaceInput = document.querySelector('.replace-row-panel__inner');

        // Check if elements exist before attempting to append
        if (prevButton && nextButton && replaceInput) {
            replaceInput.appendChild(prevButton);
            replaceInput.appendChild(nextButton);
        } else {
            console.log('One or more elements could not be found.');
        }
        }, 1000);
