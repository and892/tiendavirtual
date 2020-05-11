import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { ProductoPedidoUpdateComponent } from 'app/entities/producto-pedido/producto-pedido-update.component';
import { ProductoPedidoService } from 'app/entities/producto-pedido/producto-pedido.service';
import { ProductoPedido } from 'app/shared/model/producto-pedido.model';

describe('Component Tests', () => {
  describe('ProductoPedido Management Update Component', () => {
    let comp: ProductoPedidoUpdateComponent;
    let fixture: ComponentFixture<ProductoPedidoUpdateComponent>;
    let service: ProductoPedidoService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [ProductoPedidoUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(ProductoPedidoUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProductoPedidoUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProductoPedidoService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new ProductoPedido(123);
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
        const entity = new ProductoPedido();
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
