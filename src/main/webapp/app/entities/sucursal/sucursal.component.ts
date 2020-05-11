import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';
import { SucursalDeleteDialogComponent } from './sucursal-delete-dialog.component';

@Component({
  selector: 'jhi-sucursal',
  templateUrl: './sucursal.component.html'
})
export class SucursalComponent implements OnInit, OnDestroy {
  sucursals?: ISucursal[];
  eventSubscriber?: Subscription;

  constructor(protected sucursalService: SucursalService, protected eventManager: JhiEventManager, protected modalService: NgbModal) {}

  loadAll(): void {
    this.sucursalService.query().subscribe((res: HttpResponse<ISucursal[]>) => (this.sucursals = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInSucursals();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: ISucursal): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInSucursals(): void {
    this.eventSubscriber = this.eventManager.subscribe('sucursalListModification', () => this.loadAll());
  }

  delete(sucursal: ISucursal): void {
    const modalRef = this.modalService.open(SucursalDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.sucursal = sucursal;
  }
}
