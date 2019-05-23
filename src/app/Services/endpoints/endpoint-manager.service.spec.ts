import { TestBed } from '@angular/core/testing';

import { EndpointManagerService } from './endpoint-manager.service';

describe('EndpointManagerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EndpointManagerService = TestBed.get(EndpointManagerService);
    expect(service).toBeTruthy();
  });
});
