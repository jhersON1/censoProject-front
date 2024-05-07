import { TestBed } from '@angular/core/testing';

import { CensoFormService } from './censo-form.service';

describe('CensoFormService', () => {
  let service: CensoFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CensoFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
