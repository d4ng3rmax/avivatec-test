import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Rick } from '../rick';
import { RickService } from '../rick.service';

@Component({
  selector: 'app-rick-detail',
  templateUrl: './rick-detail.component.html',
  styleUrls: ['./rick-detail.component.scss']
})
export class RickDetailComponent implements OnInit {
  @Input() rick: Rick;

  constructor(
    private route: ActivatedRoute,
    private rickService: RickService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getRick();
  }

  getRick(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.rickService.getRick(id)
      .subscribe(rick => this.rick = rick);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.rickService.updateRick(this.rick)
      .subscribe(() => this.goBack());
  }
}
