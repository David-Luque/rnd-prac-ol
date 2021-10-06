const stackList = document.getElementById('stack-list');
const stackInput = document.getElementById('stack-input');
const container = document.getElementById('container');
const warningTopStack = document.querySelector('#stack-container .warning-top');
const warningBottomStack = document.querySelector('#stack-container .warning-bottom');
const addStackBtn = document.getElementById('add-stack');
const takeStackBtn = document.getElementById('take-stack');

const newStack = new Stack();

const clearStackInput = () => {
  stackInput.value = '';
};

const renderListStack = () => {
  stackList.innerHTML = '';
  const allStackElements = newStack.display();
  allStackElements.map(elem => {
    let piece = document.createElement('li');
    piece.setAttribute('class', 'active');
    piece.innerHTML = elem;
    stackList.appendChild(piece)
  })
  if(allStackElements.length < 10) {
    const rest = 10 - allStackElements.length;
    
    for(i = rest; i > 0; i--) {  
      const emptyBlock = document.createElement('li');
      emptyBlock.setAttribute('class', 'inactive');
      stackList.appendChild(emptyBlock);
    }
  }
};

renderListStack();

const generateWarningStack = (type) => {
  if (type === 'underflow') {
    warningBottomStack.style.display = 'block'
    warningBottomStack.innerHTML = 'Stack underflow';
  } else if (type === 'overflow') {
    warningTopStack.style.display = 'block';
    warningTopStack.innerHTML = 'Stack overflow'
  }
};

const addToStack = () => {
  try {
    if(warningBottomStack.style.display === 'block') {
      warningBottomStack.style.display = 'none';
    }
    let blockValue = stackInput.value;
    newStack.push(blockValue);
    clearStackInput();
    renderListStack();
  } catch (error) {
    console.log('display add catch throw')
    generateWarningStack('overflow')
  }
};

const removeFromStack = () => {
  try {
    if(warningTopStack.style.display === 'block') {
      warningTopStack.style.display = 'none'
    }
    newStack.pop();
    renderListStack();
  } catch (error) {
    console.log('display remove catch throw')
    generateWarningStack('underflow')
  }
};

addStackBtn.addEventListener('click', addToStack);
takeStackBtn.addEventListener('click', removeFromStack);
