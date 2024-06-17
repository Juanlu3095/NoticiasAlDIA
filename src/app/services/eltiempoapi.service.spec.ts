import { TestBed } from '@angular/core/testing';

import { EltiempoapiService } from './eltiempoapi.service';
import { HttpClientModule } from '@angular/common/http';
import { __values } from 'tslib';

describe('EltiempoapiService', () => {
  let service: EltiempoapiService;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [HttpClientModule] });
    service = TestBed.inject(EltiempoapiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getMunicipios devuelve los municipios', (done: DoneFn) => {
    service.getMunicipios().subscribe(response => {
      expect(response).toBeTruthy();
      done(); // Se añade esto porque es la función getMunicipios() es una función asíncrona por devolver un observable y si no le decimos que pare, seguirá ejecutándose.
    })
  })
});
