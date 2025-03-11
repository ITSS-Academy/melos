import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditPlaylistComponent } from './dialog-edit-playlist.component';

describe('DialogEditPlaylistComponent', () => {
  let component: DialogEditPlaylistComponent;
  let fixture: ComponentFixture<DialogEditPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogEditPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
