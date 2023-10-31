import { TestBed } from '@angular/core/testing';

import { GeneralniService } from './generalni.service';

describe('GeneralniService', () => {
  let service: GeneralniService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GeneralniService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
