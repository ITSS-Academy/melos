import { TestBed } from '@angular/core/testing';

import { UploadedService } from './uploaded.service';

describe('UploadedService', () => {
  let service: UploadedService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadedService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
