import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEnvio } from 'app/shared/model/envio.model';
import { EnvioService } from './envio.service';

@Component({
  templateUrl: './envio-delete-dialog.component.html'
})
export class EnvioDeleteDialogComponent {
  envio?: IEnvio;

  constructor(protected envioService: EnvioService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.envioService.delete(id).subscribe(() => {
      this.eventManager.broadcast('envioListModification');
      this.activeModal.close();
    });
  }
}
