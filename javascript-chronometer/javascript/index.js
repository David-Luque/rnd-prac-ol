const chronometer = new Chronometer();
chronometer.printClock;

// get the buttons:
const btnLeft = document.getElementById('btnLeft');

btnLeft.addEventListener('click', ()=>{
  const btnLeftClassName = btnLeft.getAttribute('class');
  if(btnLeftClassName === 'btn start'){
    chronometer.startClick();
    chronometer.printClock = setInterval(printTime, 1000)
    btnLeft.setAttribute('class', 'btn stop');
    btnLeft.innerHTML = "STOP";
  } else {
    chronometer.stopClick();
    clearInterval(chronometer.printClock);
    console.log('stop print');
    btnLeft.setAttribute('class', 'btn start');
    btnLeft.innerHTML = "START";
  }
})


const btnRight = document.getElementById('btnRight');

btnRight.addEventListener('click', ()=>{
  const btnRightClassName = btnRight.getAttribute('class');
  if(btnRightClassName === 'btn reset'){
    chronometer.resetClick();
    btnRight.setAttribute('class', 'btn split');
    btnRight.innerHTML = 'SPLIT';
  } else {
    chronometer.splitClick();
    btnRight.setAttribute('class', 'btn reset');
    btnRight.innerHTML = 'RESET';
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
  printSeconds();
  printMinutes();
}

function printMinutes() {
  let minutes = (chronometer.getMinutes()).toString();
  if(minutes.length === 1){
    minUni.innerHTML = minutes;
  } else {
    minDec.innerHTML = minutes[0];
    minUni.innerHTML = minutes[1];
  }
}

function printSeconds() {
  let seconds = chronometer.getSeconds().toString();
  if(seconds.length === 1){
    secUni.innerHTML = seconds;
  } else {
    secUni.innerHTML = seconds[1];
    secDec.innerHTML = seconds[0];
  }
}

// ==> BONUS
function printMilliseconds() {
  // ... your code goes here
}

function printSplit() {
  // ... your code goes here
}

function clearSplits() {
  // ... your code goes here
}

function setStopBtn() {
  // ... your code goes here
}

function setSplitBtn() {
  // ... your code goes here
}

function setStartBtn() {
  // ... your code goes here
}

function setResetBtn() {
  // ... your code goes here
}
