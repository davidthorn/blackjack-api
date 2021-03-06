export class BlackJackPlayer implements BlackJackPlayerInterface {
    hasHeld: boolean = false
    total: number = 0
    playerId: number
    usedCards: PlayingCardInterface[] = []
    cards: PlayingCardInterface[] = []
    wager?: number
    bank: number
    isDealer: boolean 

    /**
     *Creates an instance of BlackJackPlayer.
     * @param {number} playerId
     * @param {number} bank
     * @param {boolean} isDealer
     * @memberof BlackJackPlayer
     */
    constructor(playerId: number ,bank: number , isDealer: boolean ) {
        this.playerId = playerId
        this.bank = bank
        this.isDealer = isDealer
    }

    addAcesToTotal(cards: PlayingCardInterface[], total: number): number {
        let c = cards
        let t = total;
        
        while (c.length > 0) {
            
            let a = c.pop()
            if(a === undefined) throw new Error('cards cannot be empty')
            if(!a.isAce) throw new Error('only aces should be supplied in cards') 
            
            /// add the ace to the used cards array
            this.usedCards.push(a)
            
            if(t + 11 + c.length <= 21) {
                t += 11
            } else if ( t + 1 + c.length <= 21 ) {
                t += 1
            } else {
                t += 1
            }
        }
        return t
    }

    totalCards(): number {
       
        if(this.cards.length < 2 && this.usedCards.length === 0) {
            throw new Error('The player has not received 2 cards yet therefore a total cannot be produced')
        }

        if(this.hasHeld) return this.total

        let t: number = 0
        
        let totalOfRequiredUsedCards = this.cards.length + this.usedCards.length

        for(let x = 0; x < this.cards.length; x++) {
            switch(this.cards[x].isAce) {
                case true: break
                case false: 
                t += this.cards[x].cardNumber > 10 ? 10 : this.cards[x].cardNumber
                this.usedCards.push(this.cards[x])
                break
            }
        }
        
        this.cards = this.cards.filter((e,i,d) => { 
            if (e.isAce === true) return d[i]
        })

        if(this.cards.length === 0)  {
            this.total += t    
            return this.total
        }
       
        this.total += this.addAcesToTotal(this.cards , t)

        if(totalOfRequiredUsedCards !== this.usedCards.length) {
            throw new Error(`Used cards should now have ${this.usedCards} but has ${totalOfRequiredUsedCards}`)
        }

        return this.total
    }



     /**
     * Should return true if all cards add up to 21
     * If the player has black jack then this method should set hasHeld
     * to true so that we know that no more cards should be dealt
     * and also that winnings must be paid
     *
     * @returns {boolean}
     * @memberof BlackJackPlayerInterface
     */
    hasBlackjack(): boolean {
        const result = this.totalCards() === 21
        if(result) {
            this.hasHeld = true
        }
        return result
    }

    /**
     * Should return true if all cards add up to more than 21
     *
     * @returns {boolean}
     * @memberof BlackJackPlayerInterface
     */
    isBust(): boolean {
        return this.totalCards() > 21
    }

    /**
     *
     *
     * @param {PlayingCardInterface} card
     * @memberof BlackJackPlayerInterface
     */
    hit(card: PlayingCardInterface): void {

        if(this.hasHeld) {
            throw new Error('The player has held and cannot receive any more cards')
        }

        this.cards.push(card)

        // we only continue to check if bust if the user has more than 2 cards
        if(this.cards.length < 2 && this.usedCards.length === 0) return

        if(this.isBust()) {
            throw new Error('The player has bust with a total of : ' + this.total)
        }

        this.hasBlackjack()
    }

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
    hold() {

        if(this.usedCards.length < 2) {
            throw new Error('Player cannot hold until they have received 2 cards minimum')
        }

        this.hasHeld = true
    }

    /**
     * Should set the wager to null, remove all cards
     * 
     *
     * @memberof BlackJackPlayerInterface
     */
    reset(): void {
        
        if(this.usedCards.length < 2) {
            throw new Error('You cannot reset a player until they have at least two cards and called totalCards')
        }

        if(this.hasHeld && this.hasBlackjack()) {
            throw new Error('The player has black jack which means the player must be paid winning')
        }

        while(this.usedCards.length) {
            this.usedCards.pop()
        }

        while(this.cards.length) {
            this.cards.pop()
        }
       
        this.hasHeld = false
        this.total = 0
        this.wager = undefined
    }

    /**
     * Should be called if the players isBust method returns false and if the players cards
     * beat the dealer.
     * This method should then call the reset method
     * @param {number} winnings
     * @memberof BlackJackPlayerInterface
     */
    receiveWinnings(winnings: number): void {

        if(this.isBust()) {
            throw new Error('This player cannot receive winnings because it is bust')
        }

        this.hasHeld = false
        this.bank += winnings
    }

}
