const { getDeck, shuffle, draw } = require('./actions');
const utils = require('./utils.js');
const assert = require('assert');

const deck = getDeck();

const testGetDeck = () => {
  assert(utils.isValidDeck(deck), 'The initiated deck should be a valid deck');
};

const testShuffle = () => {
  const shuffledDeck = shuffle(deck);
  assert(
    utils.isValidDeck(shuffledDeck),
    'The shuffled deck should be a valid deck'
  );

  const results = [];
  for (let i = 0; i < 100; i++) {
    const shuffledDeck = shuffle(deck);
    results.push(utils.isEqual(deck, shuffledDeck));
  }
  assert(
    results.every(result => result === true),
    'When shuffled 100 times, the deck should never be in the original order'
  );

  const sortedShuffledDeck = shuffle(deck).sort((a, b) => a - b);
  assert(
    utils.isEqual(sortedShuffledDeck, deck),
    'When shuffled and sorted, the deck should be in the original order'
  );
};

const testDraw = () => {
  const player = {
    name: 'John Doe',
    drawPile: [],
    discardPile: [1, 2, 3, 4, 5]
  };

  // Attempt to draw a card.
  const drawnCard = draw(player);

  assert(
    player.discardPile.length === 0,
    'The discard pile should be empty'
  );

  const drawPile = player.drawPile
    .concat([drawnCard])
    .sort((a, b) => a - b);
  assert(
    utils.isEqual(drawPile, [1, 2, 3, 4, 5]),
    'The draw pile should be a shuffled version of the original discard pile'
  );
};

testGetDeck();
testShuffle();
testDraw();
