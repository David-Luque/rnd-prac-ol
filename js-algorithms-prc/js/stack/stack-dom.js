const stackList = document.getElementById('stack-list');
const stackInput = document.getElementById('stack-input');
const container = document.getElementById('container');
const warningTopStack = document.querySelector('#stack-container .warning-top');
const warningBottomStack = document.querySelector(
  '#stack-container .warning-bottom'
);
const addStackBtn = document.getElementById('add-stack');
const takeStackBtn = document.getElementById('take-stack');

const newStack = new Stack();

const clearStackInput = () => {
  // 
};

const renderListStack = () => {
  // 
};

renderListStack();

const generateWarningStack = (type) => {
  if (type === 'underflow') {
    // 
  } else if (type === 'overflow') {
    // 
  }
};

const addToStack = () => {
  try {
    // 
  } catch (error) {
    // 
  }
};

const removeFromStack = () => {
  try {
    // 
  } catch (error) {
    // 
  }
};

addStackBtn.addEventListener('click', addToStack);
takeStackBtn.addEventListener('click', removeFromStack);
