import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { ProductoPedidoDetailComponent } from 'app/entities/producto-pedido/producto-pedido-detail.component';
import { ProductoPedido } from 'app/shared/model/producto-pedido.model';

describe('Component Tests', () => {
  describe('ProductoPedido Management Detail Component', () => {
    let comp: ProductoPedidoDetailComponent;
    let fixture: ComponentFixture<ProductoPedidoDetailComponent>;
    const route = ({ data: of({ productoPedido: new ProductoPedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [ProductoPedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(ProductoPedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(ProductoPedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load productoPedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.productoPedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
