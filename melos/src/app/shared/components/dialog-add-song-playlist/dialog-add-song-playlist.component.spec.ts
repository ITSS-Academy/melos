import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddSongPlaylistComponent } from './dialog-add-song-playlist.component';

describe('DialogAddSongPlaylistComponent', () => {
  let component: DialogAddSongPlaylistComponent;
  let fixture: ComponentFixture<DialogAddSongPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddSongPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogAddSongPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
