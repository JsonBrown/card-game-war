import { Component, Input, OnInit, inject } from '@angular/core';
import { WarService } from '../war.service';
import { Card } from '../card';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less']
})
export class PlayerComponent implements OnInit {
  deck: Card[] = [];
  discards: Card[] = [];
  currentCard: Card | undefined = undefined;
  @Input("player") player: number = 1;

  constructor(private warService: WarService) {}
  ngOnInit(): void {
    this.deck = this.warService.deal(this.player, 2);
    this.currentCard = this.draw();
  }
  private draw() : Card | undefined{
    return this.deck.pop();
  }
  private discard(card: Card) : void {
    this.discards.push(card);
  }
}
