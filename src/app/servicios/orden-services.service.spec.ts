import { TestBed } from '@angular/core/testing';

import { OrdenServicesService } from './orden-services.service';

describe('OrdenServicesService', () => {
  let service: OrdenServicesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdenServicesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
