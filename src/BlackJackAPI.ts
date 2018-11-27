import { BlackJackPlayer }  from './BlackJackPlayer'
import { PlayingCard } from './PlayingCard'

export class BlackJackAPI implements BlackApiInterface {

    /**
   * The number of decks to use for the current game
   *
   * @type {number}
   * @memberof BlackApiInterface
   */
  numberOfDecks: number = 0

  /**
   *  The number of current active players
   *
   * @type {number}
   * @memberof BlackApiInterface
   */
  numberOfPlayers: number = 0

  /**
   * The active player which is being dealt cards
   *
   * @type {number}
   * @memberof BlackApiInterface
   */
  activePlayer: number | undefined

  /**
   * All players which are currently active within the game
   *
   * @type {BlackJackPlayerInterface[]}
   * @memberof BlackApiInterface
   */
  players: BlackJackPlayerInterface[] = []

  /**
   * All of the cards which are still available to be used
   * it is a FILO deck
   * so it dealer should call this.cards.pop() to retrieve the next card
   * all cards once popped should then be pushed onto usedCards
   *
   * @type {PlayingCardInterface[]}
   * @memberof BlackApiInterface
   */
  cards: PlayingCardInterface[] = []

  /**
   * All cards which have already been dealt to one of the players
   *
   * @type {PlayingCardInterface[]}
   * @memberof BlackApiInterface
   */
  usedCards: PlayingCardInterface[] = []

  /**
   * The dealer player
   *
   * @type {BlackJackPlayerInterface}
   * @memberof BlackApiInterface
   */
  dealer: BlackJackPlayerInterface

  /**
   *Creates an instance of BlackJackAPI.
   * @param {BlackJackPlayerInterface} dealer
   * @memberof BlackJackAPI
   */
  constructor(dealer: BlackJackPlayerInterface) { 
      this.dealer = dealer
  }

  /**
   * Should be called initially to initialise how the deck of cards and how
   * many players which will be playing
   *
   * @param {number} numberOfDecks
   * @param {number} numberOfPlayers
   * @memberof BlackApiInterface
   */
  initialise(numberOfDecks: number, numberOfPlayers: number): void {
      this.numberOfDecks = numberOfDecks
      this.numberOfPlayers = numberOfPlayers
      this.cards = []
      this.usedCards = []
      this.players = []
      this.activePlayer = undefined
      this.dealer.reset()

      for(let x = 0; x < this.numberOfPlayers; x++) {
          const player = new BlackJackPlayer(x, 0, false)
          this.addPlayer(player)
      }
      this.dealer.playerId = this.numberOfPlayers
      this.addPlayer(this.dealer)

      for(let y = 0; y < this.numberOfDecks; y++) {

          for(let y1 = 1; y1 <= 13; y1++) {
              const card = new PlayingCard("diamond", String(y1) , y1 , y1 === 1)
              this.cards.push(card)
          }

          this.cards = this.shuffle(this.cards)

          for(let y2 = 1; y2 <= 13; y2++) {
              const cardY2 = new PlayingCard("heart", String(y2) ,y2 , y2 === 1)
              this.cards.push(cardY2)
          }

          this.cards = this.shuffle(this.cards)

          for(let y3 = 1; y3 <= 13; y3++) {
              const cardY3 = new PlayingCard("club", String(y3) ,y3 , y3 === 1)
              this.cards.push(cardY3)
          }
          
          this.cards = this.shuffle(this.cards)
          
          for(let y4 = 1; y4 <= 13; y4++) {
              const cardY4 = new PlayingCard("spade",String(y4) , y4 , y4 === 1)
              this.cards.push(cardY4)
          }
          
          this.cards = this.shuffle(this.cards)
          

      }
  }

  /**
   * Should be called to deal all initial cards to the players
   *
   * @memberof BlackApiInterface
   */
  start(): void{

      /// deal the first card to all players
      for(let playerNumber = 0; playerNumber < this.players.length; playerNumber++) {
          this.players[playerNumber].hit(this.deal())
      }

      /// deal the second card to all players
      for(let playerNumber1 = 0; playerNumber1 < this.players.length; playerNumber1++) {
          this.players[playerNumber1].hit(this.deal())
      }
      
  }

  /**
   * Should be called within the initialise method to add a player to the players array
   *
   * @param {BlackJackPlayerInterface} player
   * @memberof BlackApiInterface
   */
  addPlayer(player: BlackJackPlayerInterface): void{
      this.players.push(player)
  }

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
  deal(): PlayingCardInterface {
      let card = this.cards.pop()
      if(card !== undefined) {
          return card
      }
      throw new Error('The pack of cards is empty, game must finish')
  }

  /**
   *  This individual game has completed, all players cards should be reset and wagers
   *  banked or paid to the dealer
   *
   * @memberof BlackApiInterface
   */
  end(): void{
      let dealer = this.players.pop()
      if(dealer === undefined) {
          throw new Error('dealer cannot be undefined')
      }
       /// deal the second card to all players
       for(let playerNumber1 = 0; playerNumber1 < this.players.length - 1; playerNumber1++) {
          let player = this.players[playerNumber1]
          switch(player.isBust()) {
              case true:
              player.wager = undefined
              break;
              case false:
              let dealTotal = dealer.totalCards()
              
              if (player.hasBlackjack() && player.wager !== undefined) {
                  player.receiveWinnings(player.wager * 2)
              } else if (player.totalCards() < dealTotal ) {
                  player.wager = undefined
              } else if (player.totalCards() === dealTotal && player.wager !== undefined ) {
                  player.receiveWinnings(player.wager)
              }
              break;
          }

          this.players[playerNumber1].reset()
      }
     
  }

  shuffle(cards: PlayingCardInterface[]): PlayingCardInterface[] {
    let tmpCards = cards
    const totalCards = cards.length - 1

    for(let n = totalCards; n > 0; n--) {
        let r = Math.floor(Math.random() * n)
        let tmp = tmpCards[r]
        tmpCards[r] = tmpCards[n]
        tmpCards[n] = tmp
    }

    return tmpCards
  }

}