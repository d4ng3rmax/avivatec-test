import { Component, OnInit } from '@angular/core';
import { Rick } from '../rick';
import { RickService } from '../rick.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ]
})
export class HomeComponent implements OnInit {
  ricks: Rick[] = [];

  constructor(private rickService: RickService) { }

  ngOnInit() {
    this.getRicks();
  }

  getRicks(): void {
    this.rickService.getRicks()
      .subscribe(ricks => this.ricks = ricks.slice(1, 5));
  }
}
