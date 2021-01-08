const { getDeck, shuffle, count, playOneRound } = require('./actions');

const deck = shuffle(getDeck());
const player1 = {
  name: 'Player 1',
  drawPile: deck.filter((v, i) => i % 2 !== 0),
  discardPile: []
};
const player2 = {
  name: 'Player 2',
  drawPile: deck.filter((v, i) => i % 2 === 0),
  discardPile: []
};

console.log('Initiating a new deck...', deck);
console.log(`${player1.name}:`, player1.drawPile);
console.log(`${player2.name}:`, player2.drawPile);

// Play until one player has 0 card left
while (count(player1) * count(player2) !== 0) {
  const roundWinner = (
    playOneRound(player1, player2, true) ? player1.name : player2.name
  );
  console.log(`${roundWinner} wins this round.\n`);
}

const winner = count(player1) === 0 ? player2.name : player1.name;
console.log(`${winner} wins the game!!`);
