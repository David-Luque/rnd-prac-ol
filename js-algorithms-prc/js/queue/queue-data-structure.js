class Queue {
  constructor() {
    this.queueControl = [];
    this.MAX_SIZE = 10;
  }

  canEnqueue() {
    if(this.queueControl.length < this.MAX_SIZE) return true;
    return false 
  }

  isEmpty() {
    if(this.queueControl.length === 0) return true;
    return false
  }

  enqueue(item) {
    if(this.canEnqueue()) {
      this.queueControl.unshift(item)
      return this.queueControl
    } else {
      throw new Error('QUEUE_OVERFLOW')
    }
  }

  dequeue() {
    if(!this.isEmpty()) {
      this.queueControl.shift()
      return this.queueControl[0]
    } else {
      throw new Error('QUEUE_UNDERFLOW')
    }
  }

  display() {
    return this.queueControl;
  }  
}


if (typeof module !== 'undefined') module.exports = Queue;
