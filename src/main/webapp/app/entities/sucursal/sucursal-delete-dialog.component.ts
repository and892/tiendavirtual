import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
  templateUrl: './sucursal-delete-dialog.component.html'
})
export class SucursalDeleteDialogComponent {
  sucursal?: ISucursal;

  constructor(protected sucursalService: SucursalService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.sucursalService.delete(id).subscribe(() => {
      this.eventManager.broadcast('sucursalListModification');
      this.activeModal.close();
    });
  }
}
