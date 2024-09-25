import { TestBed } from '@angular/core/testing';

import { ServicesbdService } from './servicesbd.service';

describe('ServicesbdService', () => {
  let service: ServicesbdService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ServicesbdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
