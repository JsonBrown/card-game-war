import { Injectable } from '@angular/core';
import { Card } from './card';
import { Subject } from 'rxjs';
import { States } from './states';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  private players: Array<number> = new Array<number>();
  currentState: Subject<States> = new Subject<States>();
  results: Subject<number> = new Subject<number>();
  deck: Card[] = [];
  private iDrew: {[k: number]: Card | undefined} = {};
  constructor() { 
    this.deck = this.shuffle();
    this.players = new Array<number>();
  }

  init(players: number) {
    for (let i = 0; i < players; i++) {
      this.players.push(i+1);
    }
  }

  draw(card: Card, player: number)
  {
    this.iDrew[player] = card;
    if(this.players.every(p => !!this.iDrew[p])) {
      let result = this.compare(this.players.map(p => this.iDrew[p]!));
      this.results.next(result);
      this.currentState.next(States.Compare);
    }
  }

  shuffle(): Card[] {
    let suits: {[k: string]: string} = {
      "0":"heart",
      "1":"spade",
      "2":"diamond",
      "3":"club"
    };
    let faces: {[k: number]: string} = {
      11:"J",
      12:"Q",
      13:"K",
      14:"A",
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
      },new Array<Card>());
      
    coreDeck.push({
      number: 15,
      CardName: "JK",
      suit: 0,
      SuitName: "heart",
    });
    coreDeck.push({
      number: 15,
      CardName: "JK",
      suit: 1,
      SuitName: "spade",
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

  private compare(cards: Card[]) : number {
    var ordered = cards.map(function(card, i){
      return {
        index: i + 1,
        card: card
      };
    }).sort((a,b) => b.card.number - a.card.number);

    let winner = ordered[0];
    return !ordered.every(c => c.card.number == winner.card.number) ? winner.index
    : -1; // WAR
  }  
}
