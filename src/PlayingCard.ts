export class PlayingCard implements PlayingCardInterface {

    suite: "diamond" | "heart" | "club" | "spade"
    cardNumber: number
    isAce: boolean

    constructor(suite: "diamond" | "heart" | "club" | "spade"  , cardNumber: number , isAce: boolean = false ) {
        this.suite = suite
        this.cardNumber = cardNumber
        this.isAce = isAce
        if(this.cardNumber > 13 || this.cardNumber < 0) {
            throw new Error(`Card number ${this.cardNumber} should be between 1 and 13`)
        }
    }

}