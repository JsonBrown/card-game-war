import { Component, OnInit } from '@angular/core';
import { WarService } from './war.service';
import { States } from './states';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent {
  title = 'war';
  players: number = 2;  
  state: States = States.Draw;

  constructor(private warService: WarService) {
    this.warService.init(this.players);
    this.warService
      .currentState
      .subscribe(state => this.state = state);
  }
}
