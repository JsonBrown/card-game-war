import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PlayerService } from '../player.service';
import { Card } from '../card';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.less'],
  providers: [ PlayerService ]
})
export class PlayerComponent implements OnInit {
  currentCard: Card | undefined = undefined;
  @Input("player") player: number = 1;
  @Output() iDrew = new EventEmitter<Card>();

  constructor(private playerService: PlayerService) {}
  ngOnInit(): void {
    this.playerService.deal(this.player, 2);
    //this.currentCard = this.draw();
  }
  private draw() : Card | undefined{
    return this.playerService.draw();
  }
  
  private discard(card: Card) : void {
    if(!!card) {
      this.playerService.discard(card);
    }
  }

  drawACard():void {
    this.currentCard = this.draw();
    this.iDrew.emit(this.currentCard);
  }
}
