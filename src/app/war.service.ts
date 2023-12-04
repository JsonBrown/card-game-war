import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  deck: Card[] = [];
  hands: {[k: string]: Card[]} = {};

  constructor() { 
    this.deck = this.shuffle();
  }

  shuffle(): Card[] {
    var suits: {[k: string]: string} = {
      "0":"Hearts",
      "1":"Spades",
      "2":"Diamonds",
      "3":"Clubs"
    };
    var faces: {[k: number]: string} = {
      1:"Ace",
      11:"Jack",
      12:"Queen",
      13:"King"
    };
    let coreDeck = Object.keys(suits)
      .reduce(function(all, suit){
        for (let i: number = 1; i < 14; i++) {
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
      number: 14,
      CardName: "Joker",
      suit: 0,
      SuitName: "Joker",
    });
    coreDeck.push({
      number: 14,
      CardName: "Joker",
      suit: 1,
      SuitName: "Joker",
    });

    return coreDeck.sort(() => Math.random() - 0.5);
  }

  deal(player: number, of: number) : Card[]
  {
    let hand = Array<Card>(); 
    let handSize = (54 / of);
    let startPosition = (player * handSize) - handSize;
    for (let i: number = startPosition; i < (startPosition + handSize); i++) {
      hand.push(this.deck[i]);
    }
    return hand;
  }
}
