import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from './producto.service';

@Component({
  templateUrl: './producto-delete-dialog.component.html'
})
export class ProductoDeleteDialogComponent {
  producto?: IProducto;

  constructor(protected productoService: ProductoService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productoListModification');
      this.activeModal.close();
    });
  }
}
