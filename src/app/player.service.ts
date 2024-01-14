import { Injectable, inject } from '@angular/core';
import { Card } from './card';
import { WarService } from './war.service';

@Injectable({
  providedIn: 'any'
})
export class PlayerService {
  warService: WarService = inject(WarService);
  deck: Card[] = [];
  discards: Card[] = [];
  player?: number = undefined;
  constructor() { }

  deal(player: number, of: number) {
    this.player = player;
    this.deck = this.warService.deal(player, of);
  }
  
  draw() : Card | undefined {
    let card = this.deck.pop();
    this.warService.draw(card!, this.player!)
    return card;
  }

  discard( card: Card) : void {
    this.discards.push(card);
  }
}
