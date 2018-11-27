"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var BlackJackPlayer_1 = require("./BlackJackPlayer");
var BlackJackAPI_1 = require("./BlackJackAPI");
var PlayingCard_1 = require("./PlayingCard");
var assert = __importStar(require("assert"));
Window.prototype.blackjack = (function () {
    return new BlackJackAPI_1.BlackJackAPI(new BlackJackPlayer_1.BlackJackPlayer(-1, 0, true));
})();
window.onload = function () {
};
Window.prototype.showDealersFirstCard = function () {
    var card = window.blackjack.dealer.cards[0];
    console.log("Dealer has: " + card.name);
};
Window.prototype.showDealersCards = function () {
    var player = window.blackjack.dealer;
    var cards = player.cards;
    cards.forEach(function (i) {
        console.log("Dealer has: " + i.name);
    });
    if (player.hasBlackjack()) {
        console.log('BLACKJACK');
    }
    else {
        console.log("Total: " + player.totalCards());
    }
};
Window.prototype.showPlayersCards = function () {
    var player = window.blackjack.players[0];
    var cards = window.blackjack.players[0].cards;
    cards.forEach(function (i) {
        console.log("Dealer has: " + i.name);
    });
    if (player.hasBlackjack()) {
        console.log('BLACKJACK');
    }
    else {
        console.log("Total: " + player.totalCards());
    }
};
Window.prototype.dealPlayerCard = function () {
    var player = window.blackjack.players[0];
    if (!player.hasBlackjack()) {
        player.hit(window.blackjack.deal());
        window.showPlayersCards();
    }
    else {
        console.log('BLACKJACK');
    }
};
Window.prototype.dealDealerCard = function () {
    var player = window.blackjack.dealer;
    if (!player.hasBlackjack()) {
        player.hit(window.blackjack.deal());
        window.showDealersCards();
    }
    else {
        console.log('BLACKJACK');
    }
};
Window.prototype.runTest = function () {
    window.blackjack.initialise(10, 1);
    window.blackjack.start();
    var cards = [
        { c: [1, 13], t: 21, bj: true, bust: false },
        { c: [5, 4, 2, 10], t: 21, bj: true, bust: false },
        { c: [5, 4, 2, 10, 1], t: 22, bj: false, bust: true },
        { c: [7, 3, 4, 12], t: 24, bj: false, bust: true },
        { c: [2, 10, 12], t: 22, bj: false, bust: true },
        { c: [9, 1], t: 20, bj: false, bust: false },
        { c: [6, 2, 10], t: 18, bj: false, bust: false },
        { c: [9, 7, 5, 3], t: 24, bj: false, bust: true },
        { c: [13, 12, 1], t: 21, bj: true, bust: false }
    ];
    var total = 500;
    var _loop_1 = function () {
        var player = new BlackJackPlayer_1.BlackJackPlayer(cards.length, 0, false);
        var data = cards[cards.length - 1];
        data.c.forEach(function (v) {
            var cd = new PlayingCard_1.PlayingCard("heart", String(v), v, v === 1);
            player.hit(cd);
        });
        window.blackjack.players[0] = player;
        window.showPlayersCards();
        cards.pop();
        assert.equal(player.total, data.t, "The players total should be : " + data.t);
        assert.equal(player.hasBlackjack(), data.bj, "The player should have have black jack: " + data.bj);
        assert.equal(player.isBust(), data.bust, "The player should be bust: " + data.bust);
        player.reset();
    };
    // function assert(equation: boolean , message: string , errorMessage: string): void {
    //     switch(equation) {
    //         case true:
    //         console.log(message)
    //     }
    // }
    while (cards.length > 0) {
        _loop_1();
    }
    // window.blackjack.initialise(10,1)
    // window.blackjack.start()
    // window.blackjack.dealer.cards = cards
    // window.showDealersCards()
    // for(var x= 0; x < window.blackjack.players.length; x++) {
    //     let player = window.blackjack.players[x]
    //     while(!player.isBust() || player.hasBlackjack()) {
    //         if(player.isDealer && player.totalCards() >= 17 ) return 
    //         player.hit(window.blackjack.deal())
    //     }
    //     player.totalCards()
    // }
};
