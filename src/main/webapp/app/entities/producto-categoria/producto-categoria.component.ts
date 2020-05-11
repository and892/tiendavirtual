import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { ProductoCategoriaService } from './producto-categoria.service';
import { ProductoCategoriaDeleteDialogComponent } from './producto-categoria-delete-dialog.component';

@Component({
  selector: 'jhi-producto-categoria',
  templateUrl: './producto-categoria.component.html'
})
export class ProductoCategoriaComponent implements OnInit, OnDestroy {
  productoCategorias?: IProductoCategoria[];
  eventSubscriber?: Subscription;

  constructor(
    protected productoCategoriaService: ProductoCategoriaService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadAll(): void {
    this.productoCategoriaService
      .query()
      .subscribe((res: HttpResponse<IProductoCategoria[]>) => (this.productoCategorias = res.body || []));
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInProductoCategorias();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IProductoCategoria): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInProductoCategorias(): void {
    this.eventSubscriber = this.eventManager.subscribe('productoCategoriaListModification', () => this.loadAll());
  }

  delete(productoCategoria: IProductoCategoria): void {
    const modalRef = this.modalService.open(ProductoCategoriaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.productoCategoria = productoCategoria;
  }
}
