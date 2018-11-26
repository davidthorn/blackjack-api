"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var PlayingCard = /** @class */ (function () {
    function PlayingCard(suite, cardNumber, isAce) {
        if (isAce === void 0) { isAce = false; }
        this.suite = suite;
        this.cardNumber = cardNumber;
        this.isAce = isAce;
        if (this.cardNumber > 13 || this.cardNumber < 0) {
            throw new Error("Card number " + this.cardNumber + " should be between 1 and 13");
        }
    }
    return PlayingCard;
}());
exports.PlayingCard = PlayingCard;
