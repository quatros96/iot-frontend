import { TestBed } from '@angular/core/testing';

import { IconNameService } from './icon-name.service';

describe('IconNameService', () => {
  let service: IconNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
