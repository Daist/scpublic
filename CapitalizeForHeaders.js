let currentSegment = document.activeElement;
let selectionString = window.getSelection().toString();
let selectionArray = selectionString.split(' ');
let noCapitalization = ['a', 'about', 'above', 'across', 'after',
  'against', 'along', 'among', 'an', 'and', 'around', 'as', 'at',
  'before', 'beside', 'besides', 'between', 'beyond', 'but', 'by',
  'despite', 'down', 'during', 'except', 'excepting', 'excluding', 'for',
  'from', 'in', 'including', 'inside', 'into', 'like', 'near', 'nearer',
  'nearest', 'of', 'off', 'on', 'or', 'onto', 'out', 'outside', 'over',
  'per', 'regarding', 'respecting', 'short', 'since', 'than', 'the',
  'through', 'throughout', 'till', 'to', 'toward', 'towards', 'under',
  'underneath', 'unlike', 'until', 'unto', 'up', 'upon', 'v.', 'versus',
  'via', 'vs.', 'with', 'within', 'without'];
let selectionRemade = selectionArray.map(item => {
  item = item.toLowerCase(); // Convert all items to lowercase
  return (noCapitalization.includes(item)) ? item : item[0].toUpperCase() + item.slice(1);
}).join(' ');
let output = currentSegment.innerHTML.replace(selectionString, selectionRemade);
currentSegment.innerHTML = output;
currentSegment.dispatchEvent(new Event('input', {bubbles: true, cancelable: true}));
