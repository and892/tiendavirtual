import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';

@Component({
  templateUrl: './pedido-delete-dialog.component.html'
})
export class PedidoDeleteDialogComponent {
  pedido?: IPedido;

  constructor(protected pedidoService: PedidoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pedidoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('pedidoListModification');
      this.activeModal.close();
    });
  }
}
