import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { GiphyService } from './giphy.service';

describe('GiphyService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule
    ],
  }));

  it('should be created', () => {
    const service: GiphyService = TestBed.get(GiphyService);
    expect(service).toBeTruthy();
  });
});
