import { Injectable } from '@angular/core';
import { Card } from './card';

@Injectable({
  providedIn: 'root'
})
export class WarService {
  deck: Card[] = [];

  constructor() { 
    var suits: {[k: string]: string} = {
      "0":"Hearts",
      "1":"Spades",
      "2":"Diamonds",
      "3":"Clubs"
    };
    var faces: {[k: number]: string} = {
      11:"Jack",
      12:"Queen",
      13:"King"
    };
    this.deck = Object.keys(suits).reduce(function(all, suit){
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
  }

}
