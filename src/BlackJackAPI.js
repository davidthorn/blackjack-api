"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var BlackJackPlayer_1 = require("./BlackJackPlayer");
var PlayingCard_1 = require("./PlayingCard");
var BlackJackAPI = /** @class */ (function () {
    /**
     *Creates an instance of BlackJackAPI.
     * @param {BlackJackPlayerInterface} dealer
     * @memberof BlackJackAPI
     */
    function BlackJackAPI(dealer) {
        /**
       * The number of decks to use for the current game
       *
       * @type {number}
       * @memberof BlackApiInterface
       */
        this.numberOfDecks = 0;
        /**
         *  The number of current active players
         *
         * @type {number}
         * @memberof BlackApiInterface
         */
        this.numberOfPlayers = 0;
        /**
         * All players which are currently active within the game
         *
         * @type {BlackJackPlayerInterface[]}
         * @memberof BlackApiInterface
         */
        this.players = [];
        /**
         * All of the cards which are still available to be used
         * it is a FILO deck
         * so it dealer should call this.cards.pop() to retrieve the next card
         * all cards once popped should then be pushed onto usedCards
         *
         * @type {PlayingCardInterface[]}
         * @memberof BlackApiInterface
         */
        this.cards = [];
        /**
         * All cards which have already been dealt to one of the players
         *
         * @type {PlayingCardInterface[]}
         * @memberof BlackApiInterface
         */
        this.usedCards = [];
        this.dealer = dealer;
    }
    /**
     * Should be called initially to initialise how the deck of cards and how
     * many players which will be playing
     *
     * @param {number} numberOfDecks
     * @param {number} numberOfPlayers
     * @memberof BlackApiInterface
     */
    BlackJackAPI.prototype.initialise = function (numberOfDecks, numberOfPlayers) {
        this.numberOfDecks = numberOfDecks;
        this.numberOfPlayers = numberOfPlayers;
        this.cards = [];
        this.usedCards = [];
        this.players = [];
        this.activePlayer = undefined;
        this.dealer.reset();
        for (var x = 0; x < this.numberOfPlayers; x++) {
            var player = new BlackJackPlayer_1.BlackJackPlayer(x, 0, false);
            this.addPlayer(player);
        }
        this.dealer.playerId = this.numberOfPlayers;
        this.addPlayer(this.dealer);
        for (var y = 0; y < this.numberOfDecks; y++) {
            for (var y1 = 1; y1 <= 13; y1++) {
                var card = new PlayingCard_1.PlayingCard("diamond", y1, y1 === 1);
                this.cards.push(card);
            }
            this.cards = this.shuffle(this.cards);
            for (var y2 = 1; y2 <= 13; y2++) {
                var cardY2 = new PlayingCard_1.PlayingCard("heart", y2, y2 === 1);
                this.cards.push(cardY2);
            }
            this.cards = this.shuffle(this.cards);
            for (var y3 = 1; y3 <= 13; y3++) {
                var cardY3 = new PlayingCard_1.PlayingCard("club", y3, y3 === 1);
                this.cards.push(cardY3);
            }
            this.cards = this.shuffle(this.cards);
            for (var y4 = 1; y4 <= 13; y4++) {
                var cardY4 = new PlayingCard_1.PlayingCard("spade", y4, y4 === 1);
                this.cards.push(cardY4);
            }
            this.cards = this.shuffle(this.cards);
        }
    };
    /**
     * Should be called to deal all initial cards to the players
     *
     * @memberof BlackApiInterface
     */
    BlackJackAPI.prototype.start = function () {
        /// deal the first card to all players
        for (var playerNumber = 0; playerNumber < this.players.length; playerNumber++) {
            this.players[playerNumber].hit(this.deal());
        }
        /// deal the second card to all players
        for (var playerNumber1 = 0; playerNumber1 < this.players.length; playerNumber1++) {
            this.players[playerNumber1].hit(this.deal());
        }
    };
    /**
     * Should be called within the initialise method to add a player to the players array
     *
     * @param {BlackJackPlayerInterface} player
     * @memberof BlackApiInterface
     */
    BlackJackAPI.prototype.addPlayer = function (player) {
        this.players.push(player);
    };
    /**
     * Should return a card to be then be given to the active player
     * by called hit
     * The players hold method should be called in order to indicate if they want
     * another card if hold returns true then the deal should move onto the next player
     * The active player should then be asked if isDealer and if returns true then
     * the dealer should keep dealing until all required cards have been dealt or 21 is achieved
     *
     * @returns {PlayingCardInterface}
     * @memberof BlackApiInterface
     */
    BlackJackAPI.prototype.deal = function () {
        var card = this.cards.pop();
        if (card !== undefined) {
            return card;
        }
        throw new Error('The pack of cards is empty, game must finish');
    };
    /**
     *  This individual game has completed, all players cards should be reset and wagers
     *  banked or paid to the dealer
     *
     * @memberof BlackApiInterface
     */
    BlackJackAPI.prototype.end = function () {
        var dealer = this.players.pop();
        if (dealer === undefined) {
            throw new Error('dealer cannot be undefined');
        }
        /// deal the second card to all players
        for (var playerNumber1 = 0; playerNumber1 < this.players.length - 1; playerNumber1++) {
            var player = this.players[playerNumber1];
            switch (player.isBust()) {
                case true:
                    player.wager = undefined;
                    break;
                case false:
                    var dealTotal = dealer.totalCards();
                    if (player.hasBlackjack() && player.wager !== undefined) {
                        player.receiveWinnings(player.wager * 2);
                    }
                    else if (player.totalCards() < dealTotal) {
                        player.wager = undefined;
                    }
                    else if (player.totalCards() === dealTotal && player.wager !== undefined) {
                        player.receiveWinnings(player.wager);
                    }
                    break;
            }
            this.players[playerNumber1].reset();
        }
    };
    BlackJackAPI.prototype.shuffle = function (cards) {
        var tmpCards = cards;
        var totalCards = cards.length - 1;
        for (var n = 0; n < totalCards * 20000; n++) {
            var r = Math.ceil(Math.random() * totalCards);
            var q = Math.ceil(Math.random() * totalCards);
            if (r !== q) {
                var tmp = tmpCards[r];
                tmpCards[r] = tmpCards[q];
                tmpCards[q] = tmp;
            }
        }
        return cards;
    };
    return BlackJackAPI;
}());
exports.BlackJackAPI = BlackJackAPI;
