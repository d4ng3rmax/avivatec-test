import { Component, OnInit } from '@angular/core';

import { Rick } from '../rick';
import { RickService } from '../rick.service';

@Component({
  selector: 'app-ricks',
  templateUrl: './ricks.component.html',
  styleUrls: ['./ricks.component.scss']
})
export class RicksComponent implements OnInit {
  ricks: Rick[];

  constructor(private rickService: RickService) { }

  ngOnInit() {
    this.getRicks();
  }

  getRicks(): void {
    this.rickService.getRicks()
      .subscribe(ricks => this.ricks = ricks);
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.rickService.addRick({ name } as Rick)
      .subscribe(rick => {
        this.ricks.push(rick);
      });
  }

  delete(rick: Rick): void {
    this.ricks = this.ricks.filter(h => h !== rick);
    this.rickService.deleteRick(rick).subscribe();
  }

}
