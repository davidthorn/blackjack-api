interface Window {
    blackjack: BlackApiInterface
    runTest(): void
}

interface PlayingCardInterface {
    suite: "diamond" | "heart" | "club" | "spade"
    cardNumber: number
    isAce: boolean
}

interface BlackApiInterface {

    /**
     * The number of decks to use for the current game
     *
     * @type {number}
     * @memberof BlackApiInterface
     */
    numberOfDecks: number

    /**
     *  The number of current active players
     *
     * @type {number}
     * @memberof BlackApiInterface
     */
    numberOfPlayers: number

    /**
     * The active player which is being dealt cards
     *
     * @type {(number | undefined)}
     * @memberof BlackApiInterface
     */
    activePlayer: number | undefined

    /**
     * All players which are currently active within the game
     *
     * @type {BlackJackPlayerInterface[]}
     * @memberof BlackApiInterface
     */
    players: BlackJackPlayerInterface[]

    /**
     * All of the cards which are still available to be used
     * it is a FILO deck
     * so it dealer should call this.cards.pop() to retrieve the next card
     * all cards once popped should then be pushed onto usedCards
     *
     * @type {PlayingCardInterface[]}
     * @memberof BlackApiInterface
     */
    cards: PlayingCardInterface[]

    /**
     * All cards which have already been dealt to one of the players
     *
     * @type {PlayingCardInterface[]}
     * @memberof BlackApiInterface
     */
    usedCards: PlayingCardInterface[]

    /**
     * The dealer player
     *
     * @type {BlackJackPlayerInterface}
     * @memberof BlackApiInterface
     */
    dealer: BlackJackPlayerInterface

    /**
     * Should be called initially to initialise how the deck of cards and how
     * many players which will be playing
     *
     * @param {number} numberOfDecks
     * @param {number} numberOfPlayers
     * @memberof BlackApiInterface
     */
    initialise(numberOfDecks: number, numberOfPlayers: number): void

    /**
     * Should be called to deal all initial cards to the players
     *
     * @memberof BlackApiInterface
     */
    start(): void

    /**
     * Should be called within the initialise method to add a player to the players array
     *
     * @param {BlackJackPlayerInterface} player
     * @memberof BlackApiInterface
     */
    addPlayer(player: BlackJackPlayerInterface): void

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
    deal(): PlayingCardInterface

    /**
     *  This individual game has completed, all players cards should be reset and wagers
     *  banked or paid to the dealer
     *
     * @memberof BlackApiInterface
     */
    end(): void
}

interface BlackJackPlayerInterface {
    hasHeld: boolean
    playerId: number
    cards: PlayingCardInterface[]
    wager?: number
    bank: number
    isDealer: boolean 

    totalCards(): number
    
    /**
     * Should return true if all cards add up to 21
     *
     * @returns {boolean}
     * @memberof BlackJackPlayerInterface
     */
    hasBlackjack(): boolean

    /**
     * Should return true if all cards add up to more than 21
     *
     * @returns {boolean}
     * @memberof BlackJackPlayerInterface
     */
    isBust(): boolean

    /**
     *
     *
     * @param {PlayingCardInterface} card
     * @memberof BlackJackPlayerInterface
     */
    hit(card: PlayingCardInterface): void

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
    hold(): void

    /**
     * Should set the wager to null, remove all cards, set isBust to false
     * 
     *
     * @memberof BlackJackPlayerInterface
     */
    reset(): void

    /**
     * Should be called if the players isBust method returns false and if the players cards
     * beat the dealer.
     * This method should then call the reset method
     * @param {number} winnings
     * @memberof BlackJackPlayerInterface
     */
    receiveWinnings(winnings: number): void
}
