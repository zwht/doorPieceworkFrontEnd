import { TestBed, inject } from '@angular/core/testing';

import { SetCodeService } from './set-code.service';

describe('SetCodeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SetCodeService]
    });
  });

  it('should be created', inject([SetCodeService], (service: SetCodeService) => {
    expect(service).toBeTruthy();
  }));
});
