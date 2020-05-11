import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { ProductoCategoriaUpdateComponent } from 'app/entities/producto-categoria/producto-categoria-update.component';
import { ProductoCategoriaService } from 'app/entities/producto-categoria/producto-categoria.service';
import { ProductoCategoria } from 'app/shared/model/producto-categoria.model';

describe('Component Tests', () => {
  describe('ProductoCategoria Management Update Component', () => {
    let comp: ProductoCategoriaUpdateComponent;
    let fixture: ComponentFixture<ProductoCategoriaUpdateComponent>;
    let service: ProductoCategoriaService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [ProductoCategoriaUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductoCategoriaUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoCategoriaUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoCategoriaService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductoCategoria(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductoCategoria();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
