const cards = [
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' },
  { name: 'aquaman', img: 'aquaman.jpg' },
  { name: 'batman', img: 'batman.jpg' },
  { name: 'captain america', img: 'captain-america.jpg' },
  { name: 'fantastic four', img: 'fantastic-four.jpg' },
  { name: 'flash', img: 'flash.jpg' },
  { name: 'green arrow', img: 'green-arrow.jpg' },
  { name: 'green lantern', img: 'green-lantern.jpg' },
  { name: 'ironman', img: 'ironman.jpg' },
  { name: 'spiderman', img: 'spiderman.jpg' },
  { name: 'superman', img: 'superman.jpg' },
  { name: 'the avengers', img: 'the-avengers.jpg' },
  { name: 'thor', img: 'thor.jpg' }
];

const memoryGame = new MemoryGame(cards);

window.addEventListener('load', event => {
  let html = '';
  memoryGame.cards.forEach(pic => {
    html += `<div class="card" data-card-name="${pic.name}">`;
    html +=   `<div class="back" name="${pic.img}"></div>`;
    html +=   `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`;
    html += `</div>`;
  });

  // Add all the divs to the HTML
  document.querySelector('#memory-board').innerHTML = html;

  function delayedResponse() {
    setTimeout
  }

  // Bind the click event of each element to a function
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      card.setAttribute('class', 'card turned');
      memoryGame.pickedCards.push(card);
      //console.log(memoryGame.pickedCards)

      if(memoryGame.pickedCards.length === 2){
        const compare = memoryGame.checkIfPair(memoryGame.pickedCards[0], memoryGame.pickedCards[1]);
        
        //TODO: set the setTimeout for following "if"
        if(compare){
          memoryGame.pickedCards[0].setAttribute('class', 'card blocked');
          memoryGame.pickedCards[1].setAttribute('class', 'card blocked');
          memoryGame.pickedCards = [];
          const finishGame = memoryGame.isFinished;
          
          if(finishGame){
            //SET FINAL DOM MESSAGE TO USER AND SCORE
          }

        } else {
          memoryGame.pickedCards[0].setAttribute('class', 'card');
          memoryGame.pickedCards[1].setAttribute('class', 'card');
          memoryGame.pickedCards = [];
        }
      }
    });
  });
});
