import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TiendavirtualTestModule } from '../../../test.module';
import { SucursalComponent } from 'app/entities/sucursal/sucursal.component';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';
import { Sucursal } from 'app/shared/model/sucursal.model';

describe('Component Tests', () => {
  describe('Sucursal Management Component', () => {
    let comp: SucursalComponent;
    let fixture: ComponentFixture<SucursalComponent>;
    let service: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [SucursalComponent]
      })
        .overrideTemplate(SucursalComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SucursalComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SucursalService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Sucursal(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.sucursals && comp.sucursals[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
