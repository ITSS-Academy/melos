import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchSongsComponent } from './search-songs.component';

describe('SearchSongsComponent', () => {
  let component: SearchSongsComponent;
  let fixture: ComponentFixture<SearchSongsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchSongsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchSongsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
