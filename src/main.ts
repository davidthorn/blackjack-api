import { BlackJackPlayer } from './BlackJackPlayer'
import { BlackJackAPI } from './BlackJackAPI'
import { PlayingCard  } from './PlayingCard'

Window.prototype.blackjack = ((): BlackApiInterface =>  {
    return new BlackJackAPI(new BlackJackPlayer(-1 , 0 , true))
})()

window.onload = () => {
    
}



Window.prototype.showDealersFirstCard = () => {
    let card = window.blackjack.dealer.cards[0]
    console.log(`Dealer has: ${card.name}`)
}

Window.prototype.showDealersCards = () => {
    const player = window.blackjack.dealer
    let cards = player.cards
    cards.forEach(i => {
        console.log(`Dealer has: ${i.name}`)
    })

    if(player.hasBlackjack()) {
        console.log('BLACKJACK')
    } else {
        console.log(`Total: ${player.totalCards()}`)
    }
}

Window.prototype.showPlayersCards = () => {
    const player = window.blackjack.players[0]
    let cards = window.blackjack.players[0].cards
    cards.forEach(i => {
        console.log(`Dealer has: ${i.name}`)
    })

    if(player.hasBlackjack()) {
        console.log('BLACKJACK')
    } else {
        console.log(`Total: ${player.totalCards()}`)
    }
}

Window.prototype.dealPlayerCard = () => {
    const player = window.blackjack.players[0]
    if(!player.hasBlackjack()) {
        player.hit(window.blackjack.deal())
        window.showPlayersCards()
        
    } else {
        console.log('BLACKJACK')
    }
    
}

Window.prototype.dealDealerCard = () => {
    const player = window.blackjack.dealer
    if(!player.hasBlackjack()) {
        player.hit(window.blackjack.deal())
        window.showDealersCards()
    } else {
        console.log('BLACKJACK')
    }
    
}


Window.prototype.runTest = () => {

    window.blackjack.initialise(10,1)
    window.blackjack.start()

    let cards = [
        { c: [1,13] , t: 21 , bj: true , bust: false },
        { c: [5, 4, 2,10] , t: 21 , bj: true , bust: false },
        { c: [5, 4, 2,10, 1] , t: 22 , bj: false , bust: true },
        { c: [7, 3, 4,12] , t: 24 , bj: false , bust: true },
        { c: [2, 10, 12] , t: 22 , bj: false , bust: true },
        { c: [9,1] , t: 20 , bj: false , bust: false },
        { c: [6, 2, 10] , t: 18 , bj: false , bust: false },
        { c: [9, 7, 5,3] , t: 24 , bj: false , bust: true },
        { c: [13, 12,1] , t: 21 , bj: true , bust: false }
    ]
    let total = 500

    while(cards.length > 0) {

        let player: BlackJackPlayerInterface = new BlackJackPlayer(cards.length, 0, false)
        let data = cards[cards.length - 1]

        data.c.forEach(v => {
            let cd = new PlayingCard("heart", String(v), v, v === 1)
            player.hit(cd)
        })

        window.blackjack.players[0] = player
        window.showPlayersCards()
        cards.pop()
        player.reset()
    }

}

