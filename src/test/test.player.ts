import { BlackJackPlayer } from '../BlackJackPlayer'
import { PlayingCard } from '../PlayingCard'
import * as assert from 'assert'

let bank = 0

let player = new BlackJackPlayer(1, bank, false)

assert.equal(player.bank , bank , "The bank shoud be 0")

assert.equal(player.isDealer , false , "The player should not be a dealer")

let card = new PlayingCard("diamond" , "1" , 1, true)
let card1 = new PlayingCard("diamond" , "11" , 11, false)

player.hit(card)
player.hit(card1)
assert.equal(player.usedCards.length , 2, "The player should have two cards")
let total = player.totalCards()
assert.equal(total , 21, "The cards should equal 21 and equals " + total )
assert.equal(player.hasBlackjack() , true , "The player should have black jack")
assert.equal(player.isBust() , false , "The player should not be bust")
assert.equal(player.cards.length , 0, "The player should have 0 cards in cards")
assert.equal(player.usedCards.length , 2, "The player should have 2 cards in used cards")

player.reset()

assert.equal(player.cards.length , 0, "The player should have 0 cards in cards")
assert.equal(player.usedCards.length , 0, "The player should have 0 cards in used cards")

card = new PlayingCard("diamond" , "10" , 10, false)
card1 = new PlayingCard("diamond" , "11" , 11, false)
let card2 = new PlayingCard("diamond" , "5" , 5, false)

/// Test that the player is Bust

player.hit(card)
player.hit(card1)
assert.throws(() => { player.hit(card2) } , "This player should have bust with this card")
assert.equal(player.usedCards.length , 3, "The player should have three cards")

assert.equal(player.totalCards() , 25, "The cards should equal 25 and equals " + player.totalCards() )
assert.equal(player.hasBlackjack() , false , "The player should not have black jack")
assert.equal(player.isBust() , true , "The player should be bust")

/// Test resetting the players cards and total
player.reset()
player.hit(card)
player.hit(card1)
let amount = 100
player.receiveWinnings(amount)
assert.equal(player.bank , amount, `The players bank should have ${amount} in it`)

let balance = player.bank
player.receiveWinnings(amount)
assert.equal(player.bank ,balance + amount, `The players bank should have ${balance + amount} in it`)

let winnings = player.bank
player.reset()

assert.equal(winnings ,player.bank, `The players bank should have ${winnings} in it`)

let currentTotalOfCards = player.cards.length

assert.throws(() => { player.hold() } , "Must throw because player has not received a minimum of 2 cards")
player.hit(card)
player.hit(card1)
player.hold()

assert.throws(() => { player.hit(card) }, "The functon must throw because the user has held already")
assert.equal(player.hasHeld , true , "The hasHeld should be true because hold has been called")
assert.equal(player.cards.length , currentTotalOfCards , "No more cards should be added because the player has held")

player.reset()

assert.throws( () => { new PlayingCard("spade" , "1" , 1, false) } , "The PlayingCard must throw because isActive is false and must be true because it is an ace")

let badCard = new PlayingCard("spade" , "1" , 1, true)
badCard.isAce = false
player.cards.push(badCard)

assert.throws(() => { player.addAcesToTotal(player.cards , 0) } , "The method should throw because the isAce property is not true")

assert.throws(() => { new PlayingCard("diamond" , "fake" , 12 , false) }, "This method should throw because its card name is invalid")

assert.throws(() => { new PlayingCard("diamond" , "13" , 20 , false) }, "This method should throw because its card number is out of range")

player.reset()
player.hit(card)
player.hit(card1)
assert.throws(() => { player.hit(card2) } , "Should throw" )

assert.throws(() => { player.receiveWinnings(100) } , "Should throw because place is bust and is receive winnings")



