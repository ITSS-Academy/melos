import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAllComponent } from './search-all.component';

describe('SearchAllComponent', () => {
  let component: SearchAllComponent;
  let fixture: ComponentFixture<SearchAllComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchAllComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
