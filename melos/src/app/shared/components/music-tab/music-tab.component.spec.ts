import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MusicTabComponent } from './music-tab.component';

describe('MusicTabComponent', () => {
  let component: MusicTabComponent;
  let fixture: ComponentFixture<MusicTabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MusicTabComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MusicTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
