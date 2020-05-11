import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductoPedido } from 'app/shared/model/producto-pedido.model';
import { ProductoPedidoService } from './producto-pedido.service';

@Component({
  templateUrl: './producto-pedido-delete-dialog.component.html'
})
export class ProductoPedidoDeleteDialogComponent {
  productoPedido?: IProductoPedido;

  constructor(
    protected productoPedidoService: ProductoPedidoService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoPedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productoPedidoListModification');
      this.activeModal.close();
    });
  }
}
