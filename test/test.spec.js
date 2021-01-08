const {
  getDeck,
  shuffle,
  count,
  draw,
  playOneRound
} = require('../src/actions');
const assert = require('assert');

/**
 * Check if 2 arrays are identical.
 */
const isEqual = (arr1, arr2) => ( 
  arr1.length === arr2.length &&
  arr1.every((val, idx) => val === arr2[idx])
);

describe('Card Game', function() {
  describe('#getDeck()', function() {
    it('should return a sorted deck', function() {
      assert(isEqual(
        getDeck(),
        [
          1, 1, 1, 1, 2, 2, 2, 2,
          3, 3, 3, 3, 4, 4, 4, 4,
          5, 5, 5, 5, 6, 6, 6, 6,
          7, 7, 7, 7, 8, 8, 8, 8,
          9, 9, 9, 9, 10, 10, 10, 10
        ]
      ));
    });
  });

  // Reference: http://www2.unb.ca/~owen/courses/2383-2019/tutorials/tut-permute-junit.txt
  describe('#shuffle()', function() {
    it(
      'should never be in the original order after shuffled 100 times',
      function() {
        const N_REPS = 100;
        const results = new Array(N_REPS);
        let deck = [1, 2, 3, 4, 5, 6, 7, 8, 9];
        for (let i = 0; i < N_REPS; i++) {
          deck = shuffle(deck);
          results[i] = isEqual(deck, [1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
        assert(results.every((v) => v === false));
      }
    );

    it(
      'should be in the original order, after shuffled and sorted',
      function() {
        assert(isEqual(
          shuffle([1, 2, 3, 4]).sort((a, b) => a - b), [1, 2, 3, 4]
        ));
      }
    );

    it(
      'should result [3, 1, 4, 2, 5] after shuffled for a while',
      function(done) {
        this.timeout(2000);
        let deck = [1, 2, 3, 4, 5];
        while (!isEqual(deck, [3, 1, 4, 2, 5])) {
          deck = shuffle(deck);
        }
        done();
      }
    );
  });

  describe('#count()', function() {
    it(
      'should return the total number of remaining cards a player has',
      function() {
        const player = {
          drawPile: [1, 3, 2, 9, 7],
          discardPile: [4, 5]
        };
        assert.strictEqual(count(player), 7);
      }
    );
  });

  describe('#draw()', function() {
    it('should draw a card from the draw pile', function() {
      const player = {
        drawPile: [1, 2, 3, 4, 5],
        discardPile: [7, 6]
      };
      assert.strictEqual(draw(player, false), 5);
      assert(isEqual(player.drawPile, [1, 2, 3, 4]));
      assert(isEqual(player.discardPile, [7, 6]));
    });

    describe('When the player attempts to draw from an empty pile', function () {
      it('should shuffle the discard pile into the draw pile', function() {
        const player = {
          name: 'John Doe',
          drawPile: [],
          discardPile: [1, 2, 3, 4, 5]
        };
        const card = draw(player, false);
        assert.strictEqual(player.discardPile.length, 0);
        // Put the card back to draw pile after drawing.
        player.drawPile.push(card);
        assert(!isEqual(player.drawPile, [1, 2, 3, 4, 5]));
        player.drawPile = player.drawPile.sort((a, b) => a - b);
        assert(isEqual(player.drawPile, [1, 2, 3, 4, 5]));
      });

      it('should return 0 if the discard pile is also empty', function() {
        player = { name: 'John Doe', drawPile: [], discardPile: [] };
        assert.strictEqual(draw(player,), 0);
      });
    });
  });

  describe('#playOneRound()', function() {
    it('should let the player with a higher card win', function() {
      const winner = { name: 'Harry', drawPile: [5], discardPile: [] };
      const loser = { name: 'Draco', drawPile: [2], discardPile: [] };
      assert(playOneRound(winner, loser, false));
      assert(isEqual(winner.discardPile, [5, 2]));
      assert(isEqual(loser.discardPile, []));
    });

    it(
      'should let the player with a higher card win 4 cards after an even turn',
      function() {
        const winner = { name: 'Severus', drawPile: [5, 7], discardPile: [] };
        const loser = { name: 'Voldemort', drawPile: [2, 7], discardPile: [] };
        assert(playOneRound(winner, loser, false));
        assert(isEqual(winner.discardPile, [7, 7, 5, 2]));
        assert(isEqual(loser.discardPile, []));
      }
    );

    it(
      'should let the player with both empty piles lose even if the last turn was even',
      function() {
        const winner = {
          name: 'Sirius',
          drawPile: [5],
          discardPile: [1, 2, 3, 4, 5, 6, 7]
        };
        const loser = { name: 'Dementor', drawPile: [5], discardPile: [] };
        assert(playOneRound(winner, loser, false));
      });
  });
});
