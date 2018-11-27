import { timingSafeEqual } from "crypto";

export class PlayingCard implements PlayingCardInterface {

    suite: "diamond" | "heart" | "club" | "spade"
    cardNumber: number
    isAce: boolean
    name: string

    constructor(suite: "diamond" | "heart" | "club" | "spade", cardName: string  , cardNumber: number , isAce: boolean = false ) {
        
        const names = ["1", "2","3","4","5","6","7","8","9","10","11","12","13"]

        if(names.indexOf(cardName) === -1) {
            throw new Error('Invalid card name provide')
        }
        
        switch(cardName) {
            case "1":
            this.name = "Ace " + suite + "s"
            break;
            case "11":
            this.name = "Jack of " + suite + "s"
            break;
            case "12":
            this.name = "Queen of " + suite + "s"
            break;
            case "13":
            this.name = "King of " + suite + "s"
            break;
            default: 
            this.name = cardNumber + " of " + suite + "s"
            break;
        }
        this.suite = suite
        this.cardNumber = cardNumber
        this.isAce = isAce

        if(this.cardNumber === 1 && this.isAce !== true) {
            throw new Error('The card number is 1 and isAce is false. It must be true')
        }

        if(this.cardNumber > 13 || this.cardNumber < 0) {
            throw new Error(`Card number ${this.cardNumber} should be between 1 and 13`)
        }
    }

}