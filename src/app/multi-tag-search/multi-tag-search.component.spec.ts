import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultiTagSearchComponent } from './multi-tag-search.component';

describe('MultiTagSearchComponent', () => {
  let component: MultiTagSearchComponent;
  let fixture: ComponentFixture<MultiTagSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MultiTagSearchComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(MultiTagSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
