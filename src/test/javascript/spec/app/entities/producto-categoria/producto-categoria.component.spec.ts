import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { TiendavirtualTestModule } from '../../../test.module';
import { ProductoCategoriaComponent } from 'app/entities/producto-categoria/producto-categoria.component';
import { ProductoCategoriaService } from 'app/entities/producto-categoria/producto-categoria.service';
import { ProductoCategoria } from 'app/shared/model/producto-categoria.model';

describe('Component Tests', () => {
  describe('ProductoCategoria Management Component', () => {
    let comp: ProductoCategoriaComponent;
    let fixture: ComponentFixture<ProductoCategoriaComponent>;
    let service: ProductoCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [ProductoCategoriaComponent]
      })
        .overrideTemplate(ProductoCategoriaComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoCategoriaComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoCategoriaService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new ProductoCategoria(123)],
            headers
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.productoCategorias && comp.productoCategorias[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
