
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PerfilPage } from './perfil.page';
import { By } from '@angular/platform-browser';

describe('PerfilPage', () => {
  let component: PerfilPage;
  let fixture: ComponentFixture<PerfilPage>; // Fixture implica todos los archivos del componente: html, scss, ts.
  
  beforeEach(() => {
    //TestBed.configureTestingModule({ imports: [PerfilPage]}); // Configuramos un pequeño módulo con las dependencias.
    fixture = TestBed.createComponent(PerfilPage); // Preparamos el componente para las pruebas
    component = fixture.componentInstance; // Recuperamos la clase correspondiente al componente
    fixture.detectChanges(); // Hacemos que el componente inicialice todo, eventos, css...
  });

  it('debería contener texto', () => {
    const element: HTMLElement = fixture.nativeElement; // Obtenemos la etiqueta HTML
    expect(element.textContent).toContain('Municipio'); // Comprobamos que el HTML contiene un contenido concreto
  })

  // Prueba de los binding
  it('debería mostrar todo los datos del usuario', () => {
    const headerDe = fixture.debugElement.query(By.css('span')); // Query selector de css, como en jquery. Podemos usar clases, herencias, etc. En este caso buscamos en elementos <span>.
    const headerEl = headerDe.nativeElement; // Con esto nos traemos el elemento nativo para comprobaciones internas igual que antes

    // Creamos un usuario ficticio
    const testUsuario = { id: '1', nombre: 'Juanlu', email: 'jcooldevelopment@gmail.com', apinoticias: '12345', ccaa: 'andalucia', localidad: 'malaga', apieltiempo: '12345', municipioeltiempo: 29067};
    component.user = testUsuario; // Hacemos que el user sea el de testUsuario para hacer la prueba.

    fixture.detectChanges(); // Forzamos a que coja los cambios.

    expect(headerEl.textContent).toBe(`${testUsuario.nombre}`); // Buscamos el nombre de usuario en etiquetas <span>
  })

  it('debería cerrar sesión', () => {
    component.ngOnInit();
    expect(component.idUser).withContext('Al ejecutar el NgOnInit.').not.toBe(''); // Esperamos que el usuario esté logueado, por tanto habrá una uid.
    component.logout(); // Ejecutamos la función para cerrar sesión.
    expect(component.idUser).withContext('Al hacer el logout.').toBe(''); // Al ejecutar el cierre de sesión esperamos que el idUser esté vacío.
  })
});
