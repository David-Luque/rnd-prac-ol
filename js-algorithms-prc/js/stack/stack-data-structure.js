class Stack {
  constructor() {
    this.stackControl = [];
    this.MAX_SIZE = 10;
  }

  canPush() {
    if(this.stackControl.length === this.MAX_SIZE) return false;
    return true;
  }

  isEmpty() {
    if(this.stackControl.length === 0) return true;
    return false;
  }

  push(item) {
    if(this.canPush()) {
      this.stackControl.push(item)
      return this.stackControl
    } else {
      throw new Error('STACK_OVERFLOW')
    }
  }

  pop() {
    if(!this.isEmpty()) {
      const item = this.stackControl[this.stackControl.length - 1]
      this.stackControl.pop()
      return item
    } else {
      throw new Error('STACK_UNDERFLOW')
    }
  }

  display() {
    return this.stackControl;
  }  
}


if (typeof module !== 'undefined') module.exports = Stack;
