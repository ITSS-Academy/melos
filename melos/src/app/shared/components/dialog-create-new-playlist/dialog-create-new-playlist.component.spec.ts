import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCreateNewPlaylistComponent } from './dialog-create-new-playlist.component';

describe('DialogCreateNewPlaylistComponent', () => {
  let component: DialogCreateNewPlaylistComponent;
  let fixture: ComponentFixture<DialogCreateNewPlaylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCreateNewPlaylistComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogCreateNewPlaylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
