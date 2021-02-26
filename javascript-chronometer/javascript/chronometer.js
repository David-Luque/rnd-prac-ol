class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId = 0;
  }
  startClick(callback) {
    const increaseCurrentTime = setInterval(()=>{
      this.currentTime++;
    }, 1000)
    this.intervalId = increaseCurrentTime;
  }
  getMinutes() {
    const minutes = Math.floor(this.currentTime / 60);
    return minutes;
  }
  getSeconds() {
    const minutes = Math.floor(this.currentTime / 60);
    const seconds = this.currentTime - (minutes * 60);
    return seconds;
  }
  twoDigitsNumber(number) {
    const stringNum = number.toString();
    if(stringNum.length < 2){
      return `0${stringNum}`;
    } else {
      return stringNum;
    }
  }
  stopClick() {
    clearInterval(this.intervalId);
  }
  resetClick() {
    this.currentTime = 0;
  }
  splitClick() {
    let minutes = this.getMinutes();
    let seconds = this.getSeconds();

    if(minutes.toString().length === 1){
      minutes = `0${minutes}`;
    };
    if(seconds.toString().length === 1){
      seconds = `0${seconds}`
    }
    return `${minutes}:${seconds}`;
  }
}
