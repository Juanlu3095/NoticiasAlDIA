import { TestBed } from '@angular/core/testing';

import { FirestoreService } from './firestore.service';
import { __values } from 'tslib';

describe('FirestoreService', () => {
  let service: FirestoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FirestoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('devuelve valores de firestore', (done: DoneFn) => {
    service.getUsuario('iTBfdG35sog1dm0oYaciwWN2K1b2').then(response => {
      expect(response).toBeTruthy();
      done();
    })
  })
});
