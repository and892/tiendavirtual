import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { PedidoDetailComponent } from 'app/entities/pedido/pedido-detail.component';
import { Pedido } from 'app/shared/model/pedido.model';

describe('Component Tests', () => {
  describe('Pedido Management Detail Component', () => {
    let comp: PedidoDetailComponent;
    let fixture: ComponentFixture<PedidoDetailComponent>;
    const route = ({ data: of({ pedido: new Pedido(123) }) } as any) as ActivatedRoute;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [PedidoDetailComponent],
        providers: [{ provide: ActivatedRoute, useValue: route }]
      })
        .overrideTemplate(PedidoDetailComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(PedidoDetailComponent);
      comp = fixture.componentInstance;
    });

    describe('OnInit', () => {
      it('Should load pedido on init', () => {
        // WHEN
        comp.ngOnInit();

        // THEN
        expect(comp.pedido).toEqual(jasmine.objectContaining({ id: 123 }));
      });
    });
  });
});
