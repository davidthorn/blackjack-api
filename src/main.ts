import { BlackJackPlayer } from './BlackJackPlayer'
import { BlackJackAPI } from './BlackJackAPI'

Window.prototype.blackjack = ((): BlackApiInterface =>  {
    return new BlackJackAPI(new BlackJackPlayer(-1 , 0 , true))
})()

window.onload = () => {
    
}

Window.prototype.runTest = () => {
    window.blackjack.initialise(10,1)
    window.blackjack.start()

    for(var x= 0; x < window.blackjack.players.length; x++) {
        let player = window.blackjack.players[x]
        while(!player.isBust() || player.hasBlackjack()) {
            if(player.isDealer && player.totalCards() >= 17 ) return 
            player.hit(window.blackjack.deal())
        }
        player.totalCards()
    }

}