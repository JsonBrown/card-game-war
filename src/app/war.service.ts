import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  deck: Card[] = [];
  constructor() { 
    this.deck = this.shuffle();
  }

  shuffle(): Card[] {
    let suits: {[k: string]: string} = {
      "0":"Hearts",
      "1":"Spades",
      "2":"Diamonds",
      "3":"Clubs"
    };
    let faces: {[k: number]: string} = {
      11:"Jack",
      12:"Queen",
      13:"King",
      14:"Ace",
    };
    let coreDeck = Object.keys(suits)
      .reduce(function(all, suit){
        for (let i: number = 2; i < 15; i++) {
          all.push({
            number: i,
            CardName: faces[i] || i.toString(),
            suit: +suit,
            SuitName: suits[suit],
          });
        }
        return all;               
      },new Array<Card>);
    coreDeck.push({
      number: 15,
      CardName: "Joker",
      suit: 0,
      SuitName: "Red",
    });
    coreDeck.push({
      number: 15,
      CardName: "Joker",
      suit: 1,
      SuitName: "Black",
    });

    return coreDeck.sort(() => Math.random() - 0.5);
  }

  deal(player: number, of: number) : Card[]
  {
    let hand = new Array<Card>(); 
    let handSize = (54 / of);
    let startPosition = (player * handSize) - handSize;
    for (let i: number = startPosition; i < (startPosition + handSize); i++) {
      hand.push(this.deck[i]);
    }
    return hand;
  }

  compare(cards: Card[]) : number {
    var ordered = cards.map(function(card, i){
      return {
        index: i,
        card: card
      };
    }).sort((a,b) => a.card.number - b.card.number);

    let winner = ordered[0];
    return !ordered.every(c => c.card.number == winner.card.number) ? winner.index
    : -1; // WAR
  }

  
}
