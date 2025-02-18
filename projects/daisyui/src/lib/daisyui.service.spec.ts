import { TestBed } from '@angular/core/testing';

import { DaisyuiService } from './daisyui.service';

describe('DaisyuiService', () => {
  let service: DaisyuiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DaisyuiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
