import { Component } from '@angular/core';
import { GiphyService } from './giphy.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  private previousSearchTerm = '';

  constructor(public giphyService: GiphyService) {
    this.giphyService.pageSize;
  }

  public search(searchTerm: string): void {
    if (this.previousSearchTerm !== searchTerm) {
      this.previousSearchTerm = searchTerm;
      this.giphyService.search(searchTerm);
    }
  }

  public updatePageOptions(event: PageEvent) {
    this.giphyService.setPageSize(event.pageSize);

    if (event.pageIndex !== event.previousPageIndex) {
      this.giphyService.changePage(event.pageIndex);
    }
  }
}
