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
memoryGame.cards = memoryGame.shuffleCards();

window.addEventListener('load', event => {
  let html = '';
  memoryGame.cards.forEach(pic => {
    html += `<div class="card" data-card-name="${pic.name}">`;
    html +=   `<div class="back" name="${pic.img}"></div>`;
    html +=   `<div class="front" style="background: url(img/${pic.img}) no-repeat"></div>`;
    html += `</div>`;
  });
  document.querySelector('#memory-board').innerHTML = html;
   
  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', () => {
      memoryGame.pickedCards.push(card);
      card.setAttribute('class', 'card turned');

      if(memoryGame.pickedCards.length === 2){
        const cardName1 = memoryGame.pickedCards[0].getAttribute('data-card-name');
        const cardName2 = memoryGame.pickedCards[1].getAttribute('data-card-name');
        
        if(memoryGame.checkIfPair(cardName1, cardName2)){
          memoryGame.pickedCards = [];
          const finishGame = memoryGame.isFinished();
          
          if(finishGame){
            const finalMessage =
            `
            <h1>YOU WIN!</h1>
            <h2>You finish in</h2>
            <br />
            <h1>${memoryGame.pairsClicked}</h1>
            <br />
            <h2>attempts</h2>
            `
            const finalGame = setTimeout(()=>{
              document.querySelector('#memory-board').innerHTML = finalMessage
            }, 1500)
          }

        } else {
          const fail = setTimeout(()=>{
            memoryGame.pickedCards[0].setAttribute('class', 'card');
            memoryGame.pickedCards[1].setAttribute('class', 'card');
            memoryGame.pickedCards = [];
          }, 1000);
        }
      
        document.getElementById('pairs-clicked').innerHTML = memoryGame.pairsClicked;
        document.getElementById('pairs-guessed').innerHTML = memoryGame.pairsGuessed;
      }
    });
  });
});
