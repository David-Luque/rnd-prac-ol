const chronometer = new Chronometer();

// get the buttons:
const btnLeft = document.getElementById('btnLeft');
const btnRight = document.getElementById('btnRight');

btnLeft.addEventListener('click', ()=>{
  const btnLeftClassName = btnLeft.getAttribute('class');
  if(btnLeftClassName === 'btn start'){
    chronometer.startClick();
    chronometer.printClock = setInterval(printTime, 10)
    setStopBtn();
    setSplitBtn();
  } else if(btnLeftClassName === 'btn stop'){
    chronometer.stopClick();
    clearInterval(chronometer.printClock);
    setStartBtn();
    setResetBtn();
  }
})

btnRight.addEventListener('click', ()=>{
  const btnRightClassName = btnRight.getAttribute('class');
  if(btnRightClassName === 'btn reset'){
    chronometer.resetClick();
    printTime();
    clearSplits();
  } else if(btnRightClassName === 'btn split'){
    printSplit();
  }
})

// get the DOM elements that will serve us to display the time:
let minDec = document.getElementById('minDec');
let minUni = document.getElementById('minUni');
let secDec = document.getElementById('secDec');
let secUni = document.getElementById('secUni');
let milDec = document.getElementById('milDec');
let milUni = document.getElementById('milUni');
let splits = document.getElementById('splits');


function printTime() {
  printMilliseconds();
  printSeconds();
  printMinutes();
}

function printMinutes() {
  let minutes = (chronometer.getMinutes()).toString();
  if(minutes.length === 1){
    minUni.innerHTML = minutes;
    minDec.innerHTML = 0;
  } else {
    minDec.innerHTML = minutes[0];
    minUni.innerHTML = minutes[1];
  }
}

function printSeconds() {
  let seconds = chronometer.getSeconds().toString();
  if(seconds.length < 2){
    secUni.innerHTML = seconds;
    secDec.innerHTML = 0;
  } else {
    secUni.innerHTML = seconds[1];
    secDec.innerHTML = seconds[0];
  }
}

function printMilliseconds() {
  const miliseconds = chronometer.getMilliseconds().toString();
  //console.log(miliseconds.charAt(0))
  // milUni.innerHTML = miliseconds;
  // milDec.innerHTML = '';
  if(miliseconds.length === 1){
    milUni.innerHTML = miliseconds.charAt(0);
    milDec.innerHTML = 0;
  } else if (miliseconds.length > 1){
    milUni.innerHTML = miliseconds.charAt(1);
    milDec.innerHTML = miliseconds.charAt(0);
  }
}

function printSplit() {
  const time = chronometer.splitClick();
  const newTime = document.createElement('li');
  newTime.innerHTML = time;
  splits.appendChild(newTime);
}

function clearSplits() {
  splits.innerHTML = '';
}

function setStopBtn() {
  btnLeft.setAttribute('class', 'btn stop');
  btnLeft.innerHTML = "STOP";
}

function setSplitBtn() {
  btnRight.setAttribute('class', 'btn split');
  btnRight.innerHTML = 'SPLIT';
}

function setStartBtn() {
  btnLeft.setAttribute('class', 'btn start');
  btnLeft.innerHTML = "START";
}

function setResetBtn() {
  btnRight.setAttribute('class', 'btn reset');
  btnRight.innerHTML = 'RESET';
}
