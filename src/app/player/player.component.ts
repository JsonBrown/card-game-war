import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() iDrew = new EventEmitter<Card>();

  constructor(private warService: WarService) {}
  ngOnInit(): void {
    this.deck = this.warService.deal(this.player, 2);
    //this.currentCard = this.draw();
  }
  private draw() : Card | undefined{
    return this.deck.pop();
  }
  private discard(card: Card) : void {
    if(!!card) {
      this.discards.push(card);
    }
  }

  drawACard():void {
    this.currentCard = this.draw();
    this.iDrew.emit(this.currentCard);
  }
}
