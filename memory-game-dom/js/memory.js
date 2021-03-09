class MemoryGame {
  constructor(cards){
    this.cards = cards;
    this.pickedCards = [];
    this.pairsClicked = 0;
    this.pairsGuessed = 0;
  }
  shuffleCards(cards) {
    if(!cards){return undefined}
    var currentIndex = cards.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = cards[currentIndex];
    cards[currentIndex] = cards[randomIndex];
    cards[randomIndex] = temporaryValue;
  }
  return cards;
  }
  
  checkIfPair(card1, card2) {
    console.log(card1, card2)
    this.pairsClicked++;
    if(card1 === card2){
      this.pairsGuessed++;
      return true;
    }
    return false;
  }

  isFinished() {
    if(this.pairsGuessed === 8){
      return true
    } else {
      return false
    }
  }
}