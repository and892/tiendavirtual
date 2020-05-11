import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IFactura } from 'app/shared/model/factura.model';
import { FacturaService } from './factura.service';

@Component({
  templateUrl: './factura-delete-dialog.component.html'
})
export class FacturaDeleteDialogComponent {
  factura?: IFactura;

  constructor(protected facturaService: FacturaService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.facturaService.delete(id).subscribe(() => {
      this.eventManager.broadcast('facturaListModification');
      this.activeModal.close();
    });
  }
}
