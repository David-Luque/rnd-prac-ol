const queueUL = document.querySelector('.list-queue');
const queueInput = document.querySelector('.queue-input');
const warningTopQueue = document.querySelector('#queue-container .warning-top');
const warningBottomQueue = document.querySelector('#queue-container .warning-bottom');
const addQueue = document.querySelector('.btn-add-queue');
const dequeue = document.querySelector('.btn-take-dequeue');

const queue = new Queue();

const clearQueueInput = () => {
  queueInput.value = ''
};

const generateListQueue = () => {
  queueUL.innerHTML = '';
  const queueElements = queue.display();
  queueElements.map(elem => {
    const queueElement = document.createElement('li')
    queueElement.setAttribute('class', 'active')
    queueElement.innerHTML = elem;
    queueUL.appendChild(queueElement);
  })

  if(queueElements.length < 10) {
    const rest = 10 - queueElements.length;
    for(let i = rest; i > 0; i--) {
      const placeholderBlock = document.createElement('li');
      placeholderBlock.setAttribute('class', 'inactive');
      queueUL.appendChild(placeholderBlock)
    }
  }
};

generateListQueue();

const generateWarningQueue = (type) => {
  if (type === 'underflow') {
    warningBottomQueue.innerHTML = 'Stack underflow'
    warningBottomQueue.style.display = 'block'
  } else if (type === 'overflow') {
    warningTopQueue.innerHTML = 'Stack overflow';
    warningTopQueue.style.display = 'block';
  }
};

const addToQueue = () => {
  warningBottomQueue.style.display = 'none';
  try {
    queue.enqueue(queueInput.value);
    clearQueueInput();
    generateListQueue();
  } catch (error) {
    generateWarningQueue('overflow')
  }
};

const removeFromQueue = () => {
  warningTopQueue.style.display = 'none';
  try {
    queue.dequeue();
    generateListQueue();
  } catch (error) {
    generateWarningQueue('underflow');
  }
};

addQueue.addEventListener('click', addToQueue);
dequeue.addEventListener('click', removeFromQueue);
