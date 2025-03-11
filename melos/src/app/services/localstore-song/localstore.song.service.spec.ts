import { TestBed } from '@angular/core/testing';

import { LocalstoreSongService } from './localstore.song.service';

describe('LocalstoreSongService', () => {
  let service: LocalstoreSongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalstoreSongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
