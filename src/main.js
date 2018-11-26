"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackJackPlayer_1 = require("./BlackJackPlayer");
var BlackJackAPI_1 = require("./BlackJackAPI");
Window.prototype.blackjack = (function () {
    return new BlackJackAPI_1.BlackJackAPI(new BlackJackPlayer_1.BlackJackPlayer(-1, 0, true));
})();
window.onload = function () {
};
Window.prototype.runTest = function () {
    window.blackjack.initialise(10, 1);
    window.blackjack.start();
    for (var x = 0; x < window.blackjack.players.length; x++) {
        var player = window.blackjack.players[x];
        while (!player.isBust() || player.hasBlackjack()) {
            if (player.isDealer && player.totalCards() >= 17)
                return;
            player.hit(window.blackjack.deal());
        }
        player.totalCards();
    }
};
