import { Component, OnInit } from '@angular/core';
import { Card } from './card';
import { WarService } from './war.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  constructor(private warService: WarService) {}
  title = 'war';
  players: number = 2;  
  draws: {[k: number]: Card} = {};
  result: number | undefined;

  iDrew(player: number, card: Card): Boolean {
    let ok = !this.draws[player];
    if(ok) {
      this.draws[player] = card;
      
      let cards = Object.keys(this.draws).map(d => this.draws[+d]);
      if(cards.every(c => !!c)) {
        this.result = this.warService.compare(cards);
        this.draws = {};
      }
    }
    
    return ok;
  }
}
