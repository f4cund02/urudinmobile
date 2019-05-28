import { TestBed } from '@angular/core/testing';

import { PushNotService } from './push-not.service';

describe('PushNotService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PushNotService = TestBed.get(PushNotService);
    expect(service).toBeTruthy();
  });
});
