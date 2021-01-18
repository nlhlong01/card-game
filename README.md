# A Weird Card Game

## Prerequisites

Node >= v14.15

## Installing

`npm install`

## Run

After installing, you can start the game with

`npm start`

The program will run from start to finish. Please examine the logs to see the results.

At the beginning, it initiate and display the deck, as well as the initial draw pile of 2 players taken from that deck.
Every time a player draws a card, it shows which card was drawn and how many cards that player currently has. If the
draw pile is empty, it says "renewing player's draw pile". After each round, it shows the round winner. When the game
ends, the game winner is announced.

Due to the random nature of shuffling, sometimes, a game may take so many turns to finish that its logs are not able
to be fully shown on the console window. In that case, please scroll all the way up the beginning of the game if you
want to inspect the game from start to finish.

## Test

`npm run test`
