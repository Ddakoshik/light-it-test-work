import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { GiphyService } from '../giphy.service';

export interface SearchTermTag {
  searchTerm: string;
}

@Component({
  selector: 'app-multi-tag-search',
  templateUrl: './multi-tag-search.component.html',
  styleUrls: ['./multi-tag-search.component.scss'],
})
export class MultiTagSearchComponent {
  addOnBlur = true;
  readonly separatorKeysCodes = [ENTER, COMMA] as const;
  searchTermTegs: SearchTermTag[] = [];

  @Output() searchTermUpdate: EventEmitter<string> = new EventEmitter<string>();

  constructor() {}

  public add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    if (value) {
      this.searchTermTegs.push({ searchTerm: value });
    }
    event.chipInput!.clear();
    this.updateSearchTerm();
  }

  public remove(fruit: SearchTermTag): void {
    const index = this.searchTermTegs.indexOf(fruit);

    if (index >= 0) {
      this.searchTermTegs.splice(index, 1);
    }
    this.updateSearchTerm();
  }

  public updateSearchTerm(): void {
    console.log('event', this.searchTermTegs);

    const searchTerm = this.searchTermTegs.map(item => item.searchTerm).join(', ');
    this.searchTermUpdate.emit(searchTerm);
  }
}
