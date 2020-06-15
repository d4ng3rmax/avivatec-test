import { Component, OnInit } from '@angular/core';

import { Observable, Subject } from 'rxjs';

import {
   debounceTime, distinctUntilChanged, switchMap
 } from 'rxjs/operators';

import { Rick } from '../rick';
import { RickService } from '../rick.service';

@Component({
  selector: 'app-rick-search',
  templateUrl: './rick-search.component.html',
  styleUrls: [ './rick-search.component.scss' ]
})
export class RickSearchComponent implements OnInit {
  ricks$: Observable<Rick[]>;
  private searchTerms = new Subject<string>();

  constructor(private rickService: RickService) {}

  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.ricks$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.rickService.searchRicks(term)),
    );
  }
}
