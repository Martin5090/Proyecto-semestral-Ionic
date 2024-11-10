import { TestBed } from '@angular/core/testing';

import { SQLite } from '@awesome-cordova-plugins/sqlite/ngx';
import { ServicebdService } from './servicesbd.service';
import { NativeStorage } from '@awesome-cordova-plugins/native-storage/ngx';

describe('ServicebdService', () => {
  let service: ServicebdService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ServicebdService,
        SQLite,
        NativeStorage  
      ]
    });
    service = TestBed.inject(ServicebdService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
