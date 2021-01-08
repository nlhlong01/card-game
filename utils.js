/**
 * Check if a deck should have totally 40 cards
 * and each type of card should have 4 cards.
 */
const isValidDeck = (deck) => {
  const cardTypes = new Array(10).fill(0);
  deck.forEach((val) => {
    cardTypes[val - 1]++;
  });

  return deck.length === 40 && cardTypes.every((val) => val === 4);
};

/**
 * Check if 2 decks are identical.
 */
const isEqual = (deck1, deck2) => ( 
  deck1.length === deck2.length &&
  deck1.every((val, idx) => val === deck2[idx])
);

module.exports = { isValidDeck, isEqual };
