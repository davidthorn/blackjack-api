"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackJackPlayer = /** @class */ (function () {
    /**
     *Creates an instance of BlackJackPlayer.
     * @param {number} playerId
     * @param {number} bank
     * @param {boolean} isDealer
     * @memberof BlackJackPlayer
     */
    function BlackJackPlayer(playerId, bank, isDealer) {
        this.hasHeld = false;
        this.total = 0;
        this.usedCards = [];
        this.cards = [];
        this.playerId = playerId;
        this.bank = bank;
        this.isDealer = isDealer;
    }
    BlackJackPlayer.prototype.addAcesToTotal = function (cards, total) {
        var c = cards;
        var t = total;
        while (c.length > 0) {
            var a = c.pop();
            if (a === undefined)
                throw new Error('cards cannot be empty');
            if (!a.isAce)
                throw new Error('only aces should be supplied in cards');
            if (t + 10 + c.length <= 21) {
                t += 10;
            }
            else if (t + 1 + c.length <= 21) {
                t += 1;
            }
            else {
                t += 1;
            }
        }
        return t;
    };
    BlackJackPlayer.prototype.totalCards = function () {
        if (this.total !== 0)
            return this.total;
        var t = 0;
        console.log('checking player is dealer ', this.isDealer);
        for (var x = 0; x < this.cards.length; x++) {
            switch (this.cards[x].isAce) {
                case true: break;
                case false:
                    t += this.cards[x].cardNumber > 10 ? 10 : this.cards[x].cardNumber;
                    this.usedCards.push(this.cards[x]);
                    break;
            }
        }
        this.cards = this.cards.filter(function (t) { t.isAce === true; });
        if (this.cards.length === 0) {
            this.total = t;
            return t;
        }
        this.total = this.addAcesToTotal(this.cards, t);
        return this.total;
    };
    /**
    * Should return true if all cards add up to 21
    *
    * @returns {boolean}
    * @memberof BlackJackPlayerInterface
    */
    BlackJackPlayer.prototype.hasBlackjack = function () {
        return this.totalCards() === 21;
    };
    /**
     * Should return true if all cards add up to more than 21
     *
     * @returns {boolean}
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.isBust = function () {
        return this.totalCards() > 21;
    };
    /**
     *
     *
     * @param {PlayingCardInterface} card
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.hit = function (card) {
        for (var x = 0; x < this.usedCards.length; x++) {
            this.cards.push(this.usedCards[x]);
            delete this.usedCards[x];
        }
        this.total = 0;
        this.hasHeld = false;
        this.cards.push(card);
    };
    /**
     * The dealer should call this method prior to giving the player a card
     * if the hold method returns true then the dealer should continue to the
     * next player
     * if the hold method returns false then the dealer should call hit and hand another card.
     * The dealer should then call the isBust() method to find out if the dealer can take the wager
     * from the player and call reset
     *
     * @returns {void}
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.hold = function () {
        this.hasHeld = true;
    };
    /**
     * Should set the wager to null, remove all cards
     *
     *
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.reset = function () {
        while (this.usedCards.length) {
            this.usedCards.pop();
        }
        while (this.cards.length) {
            this.cards.pop();
        }
        console.log(this.usedCards.length);
        console.log(this.cards.length);
        console.log('completed');
        this.hasHeld = false;
        this.total = 0;
        this.wager = undefined;
    };
    /**
     * Should be called if the players isBust method returns false and if the players cards
     * beat the dealer.
     * This method should then call the reset method
     * @param {number} winnings
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.receiveWinnings = function (winnings) {
        this.bank = winnings;
    };
    return BlackJackPlayer;
}());
exports.BlackJackPlayer = BlackJackPlayer;
