import { TestBed } from '@angular/core/testing';

import { NotificationEndpointService } from './notification-endpoint.service';

describe('NotificationEndpointService', () => {
  let service: NotificationEndpointService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NotificationEndpointService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
