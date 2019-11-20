import {TestBed} from '@angular/core/testing';

import {ThemeApplierService} from './theme-applier.service';

describe('ThemeApplierService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ThemeApplierService = TestBed.get(ThemeApplierService);
    expect(service).toBeTruthy();
  });
});
