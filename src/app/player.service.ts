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
  constructor() { }

  deal(player: number, of: number) {
    this.deck = this.warService.deal(player, of);
  }
  
  draw() : Card | undefined{
    return this.deck.pop();
  }

  discard( card: Card) : void {
    this.discards.push(card);
  }
}
