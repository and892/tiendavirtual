import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { ProductoCategoriaService } from './producto-categoria.service';

@Component({
  templateUrl: './producto-categoria-delete-dialog.component.html'
})
export class ProductoCategoriaDeleteDialogComponent {
  productoCategoria?: IProductoCategoria;

  constructor(
    protected productoCategoriaService: ProductoCategoriaService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.productoCategoriaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('productoCategoriaListModification');
      this.activeModal.close();
    });
  }
}
