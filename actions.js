/**
 * Get a new sorted deck containing 40 cards of 10 types.
 */
const getDeck = () => {
  const deck = [];
  let value = 0;

  for (let i = 0; i < 40; i++) {
    value = i % 4 === 0 ? value + 1 : value;
    deck.push(value);
  }

  return deck;
};

/**
 * Shuffles the deck using Fisher-Yates algorithm.
 */
const shuffle = (deck) => {
  let counter = deck.length;
  let temp = 0;
  let index = 0;
  let newDeck = deck;

  // While there are cards in the deck
  while (counter > 0) {
    // Pick a random index
    index = Math.floor(Math.random() * counter);
    // Decrease counter by 1
    counter--;
    // And swap the last element with it
    temp = newDeck[counter];
    newDeck[counter] = newDeck[index];
    newDeck[index] = temp;
  }

  return newDeck;
};

/**
 * Count the remaining cards a player has.
 */
const countCards = (player) => {
  return player.drawPile.length + player.discardPile.length;
};

/**
 * Draw a card.
 * @returns {number} The value of the drawn card. 0 if there is no card left.
 */
const draw = (player) => {
  const { name, drawPile, discardPile } = player;
  // Get the remaining card count before drawing. 
  const nCards = countCards(player);

  // If there are no more cards in the draw pile, shuffle the discard pile and
  // use those cards as the new draw pile
  if (drawPile.length === 0) {
    // If both card piles are empty, the player loses the round.
    if (discardPile.length === 0) return 0;
    console.log(`Renewing ${name}'s draw pile...`)
    player.drawPile = shuffle(discardPile);
    player.discardPile = [];
  }

  const drawnCard = player.drawPile.pop();
  console.log(`${name} (${nCards}): ${drawnCard}`);
  return drawnCard;
};

/**
 * Play until one player wins the round.
 * @returns {boolean} True if Player 1 wins the round.
 */
const playOneRound = (player1, player2) => {
  // Next drawn cards
  let card1 = 0;
  let card2 = 0;
  let wonCards = [];
  // Both players keep drawing a new card until they draw different cards.
  while (card1 === card2) {
    card1 = draw(player1);
    if (card1 === 0) return false;

    card2 = draw(player2);
    if (card2 === 0) return true;

    wonCards.push(card1, card2);
  }

  if (card1 > card2) {
    player1.discardPile.push(...wonCards);
    return true;
  } else {
    player2.discardPile.push(...wonCards);
    return false;
  }
};

module.exports = {
  getDeck, 
  shuffle,
  countCards,
  draw,
  playOneRound
};
