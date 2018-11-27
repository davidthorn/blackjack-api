"use strict";
exports.__esModule = true;
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
            /// add the ace to the used cards array
            this.usedCards.push(a);
            if (t + 11 + c.length <= 21) {
                t += 11;
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
        if (this.cards.length < 2 && this.usedCards.length === 0) {
            throw new Error('The player has not received 2 cards yet therefore a total cannot be produced');
        }
        if (this.hasHeld)
            return this.total;
        var t = 0;
        var totalOfRequiredUsedCards = this.cards.length + this.usedCards.length;
        for (var x = 0; x < this.cards.length; x++) {
            switch (this.cards[x].isAce) {
                case true: break;
                case false:
                    t += this.cards[x].cardNumber > 10 ? 10 : this.cards[x].cardNumber;
                    this.usedCards.push(this.cards[x]);
                    break;
            }
        }
        this.cards = this.cards.filter(function (e, i, d) {
            if (e.isAce === true)
                return d[i];
        });
        if (this.cards.length === 0) {
            this.total += t;
            return this.total;
        }
        this.total += this.addAcesToTotal(this.cards, t);
        if (totalOfRequiredUsedCards !== this.usedCards.length) {
            throw new Error("Used cards should now have " + this.usedCards + " but has " + totalOfRequiredUsedCards);
        }
        return this.total;
    };
    /**
    * Should return true if all cards add up to 21
    * If the player has black jack then this method should set hasHeld
    * to true so that we know that no more cards should be dealt
    * and also that winnings must be paid
    *
    * @returns {boolean}
    * @memberof BlackJackPlayerInterface
    */
    BlackJackPlayer.prototype.hasBlackjack = function () {
        var result = this.totalCards() === 21;
        if (result) {
            this.hasHeld = true;
        }
        return result;
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
        if (this.hasHeld) {
            throw new Error('The player has held and cannot receive any more cards');
        }
        this.cards.push(card);
        // we only continue to check if bust if the user has more than 2 cards
        if (this.cards.length < 2 && this.usedCards.length === 0)
            return;
        if (this.isBust()) {
            throw new Error('The player has bust with a total of : ' + this.total);
        }
        this.hasBlackjack();
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
        if (this.usedCards.length < 2) {
            throw new Error('Player cannot hold until they have received 2 cards minimum');
        }
        this.hasHeld = true;
    };
    /**
     * Should set the wager to null, remove all cards
     *
     *
     * @memberof BlackJackPlayerInterface
     */
    BlackJackPlayer.prototype.reset = function () {
        if (this.usedCards.length < 2) {
            throw new Error('You cannot reset a player until they have at least two cards and called totalCards');
        }
        if (this.hasHeld && this.hasBlackjack()) {
            throw new Error('The player has black jack which means the player must be paid winning');
        }
        while (this.usedCards.length) {
            this.usedCards.pop();
        }
        while (this.cards.length) {
            this.cards.pop();
        }
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
        if (this.isBust()) {
            throw new Error('This player cannot receive winnings because it is bust');
        }
        this.hasHeld = false;
        this.bank += winnings;
    };
    return BlackJackPlayer;
}());
exports.BlackJackPlayer = BlackJackPlayer;
