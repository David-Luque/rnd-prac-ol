class Chronometer {
  constructor() {
    this.currentTime = 0;
    this.intervalId = 0;
  }
  startClick(callback) {
    const increaseCurrentTime = setInterval(()=>{
      this.currentTime++;
    }, 10)
    this.intervalId = increaseCurrentTime;
  }
  getMinutes() {
    const minutes = Math.floor(this.currentTime / 6000);
    return minutes;
  }
  getSeconds() {
    const minutes = Math.floor(this.currentTime / 6000);
    const remainingTime = this.currentTime - minutes * 6000;
    const seconds = Math.floor(remainingTime / 100);
    return seconds;
  }
  getMilliseconds(){
    const minutes = Math.floor(this.currentTime / 6000);
    const remainingTime = this.currentTime - minutes * 6000;
    const seconds = Math.floor(remainingTime / 100);
    const milliseconds = this.currentTime - (minutes * 6000) - (seconds * 100);
    return milliseconds
  }

  twoDigitsNumber(number) {
    const stringNum = number.toString();
    if(stringNum.length < 2){
      return `0${stringNum}`;
    } else {
      return stringNum.substring(0, 2);
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
    let milliseconds = this.getMilliseconds();
    let chronoMinutes = this.twoDigitsNumber(minutes);
    let chronoSeconds = this.twoDigitsNumber(seconds);
    let chronoMiliseconds = this.twoDigitsNumber(milliseconds);

    return `${chronoMinutes}:${chronoSeconds}:${chronoMiliseconds}`;
  }
}
