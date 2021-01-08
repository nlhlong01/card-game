const { getDeck, shuffle, draw, playOneRound } = require('./src/actions');
const utils = require('./test/utils.js');
const assert = require('assert');

const deck = getDeck();

/**
 * Test #getDeck()
 */
const testGetDeck = () => {
  assert(utils.isValidDeck(deck), 'The initiated deck should be a valid deck');
};

/**
 * Test #shuffle()
 */
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

/**
 * Test #draw()
 */
const testDraw = () => {
  const player = {
    name: 'John Doe',
    drawPile: [],
    discardPile: [1, 2, 3, 4, 5]
  };

  // Attempt to draw a card.
  const drawnCard = draw(player, false);

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

/**
 * Test #playOneRound()
 */
const testPlayOneRound = () => {
  const harry = { name: 'Harry', drawPile: [5], discardPile: [] };
  const ron = { name: 'Ron', drawPile: [2], discardPile: [] };
  assert(
    playOneRound(harry, ron) === true,
    'The player with a higher card should win'
  );

  const albus = { name: 'Albus', drawPile: [5, 7], discardPile: [] };
  const severus = { name: 'Severus', drawPile: [2, 7], discardPile: [] };
  const winner = playOneRound(albus, severus, false);
  assert(
    winner === true &&
    albus.discardPile.length === 4 &&
    severus.discardPile.length === 0,
    'When comparing two cards of the same value, the winner of the next round' +
    'should win 4 cards'
  );
};

testGetDeck();
testShuffle();
testDraw();
testPlayOneRound();
