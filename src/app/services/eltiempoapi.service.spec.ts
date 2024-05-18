import { TestBed } from '@angular/core/testing';

import { EltiempoapiService } from './eltiempoapi.service';

describe('EltiempoapiService', () => {
  let service: EltiempoapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EltiempoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
