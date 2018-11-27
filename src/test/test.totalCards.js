"use strict";
exports.__esModule = true;
var BlackJackPlayer_1 = require("../BlackJackPlayer");
var PlayingCard_1 = require("../PlayingCard");
var assert = require("assert");
var tests = [
    { c: [1, 11], t: 21, bj: true, bust: false },
    { c: [5, 4, 2, 10], t: 21, bj: true, bust: false },
    { c: [5, 4, 2, 10, 1], t: 22, bj: false, bust: true },
    { c: [7, 3, 4, 12], t: 24, bj: false, bust: true },
    { c: [2, 10, 12], t: 22, bj: false, bust: true },
    { c: [9, 1], t: 20, bj: false, bust: false },
    { c: [6, 2, 10], t: 18, bj: false, bust: false },
    { c: [9, 7, 5, 3], t: 24, bj: false, bust: true },
    { c: [13, 12, 1], t: 21, bj: true, bust: false }
];
/**
 * Iterates through all the players cards and outputs the result
 *
 * @param {BlackJackPlayer} player
 */
function showPlayersCards(player) {
    player.cards.forEach(function (i) {
        console.log("Dealer has: " + i.name);
    });
    if (player.hasBlackjack()) {
        console.log('BLACKJACK');
    }
    else {
        console.log("Total: " + player.totalCards());
    }
}
var _loop_1 = function () {
    var player = new BlackJackPlayer_1.BlackJackPlayer(tests.length, 0, false);
    var data = tests[tests.length - 1];
    data.c.forEach(function (v) {
        var cd = new PlayingCard_1.PlayingCard("heart", String(v), v, v === 1);
        player.hit(cd);
    });
    showPlayersCards(player);
    tests.pop();
    assert.equal(player.total, data.t, "The players total should be : " + data.t);
    assert.equal(player.hasBlackjack(), data.bj, "The player should have have black jack: " + data.bj);
    assert.equal(player.isBust(), data.bust, "The player should be bust: " + data.bust);
    player.reset();
};
while (tests.length > 0) {
    _loop_1();
}
