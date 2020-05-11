import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IFactura } from 'app/shared/model/factura.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { FacturaService } from './factura.service';
import { FacturaDeleteDialogComponent } from './factura-delete-dialog.component';
// import {ImasVendidos} from './masVendidos.model';

@Component({
  selector: 'jhi-factura',
  templateUrl: './factura.component.html'
})
export class FacturaComponent implements OnInit, OnDestroy {
  facturas?: IFactura[];
  eventSubscriber?: Subscription;
  totalItems = 0;
  itemsPerPage = ITEMS_PER_PAGE;
  page!: number;
  predicate!: string;
  ascending!: boolean;
  ngbPaginationPage = 1;
  grafica: any;
  graficaCtx: any;
  myBarChart: any;
  fechas: string[] = [];
  IProductos: any[] = [];
  lel: any;

  constructor(
    protected facturaService: FacturaService,
    protected activatedRoute: ActivatedRoute,
    protected router: Router,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal
  ) {}

  loadPage(page?: number): void {
    const pageToLoad: number = page || this.page;

    this.facturaService
      .query({
        page: pageToLoad - 1,
        size: this.itemsPerPage,
        sort: this.sort()
      })
      .subscribe(
        (res: HttpResponse<IFactura[]>) => this.onSuccess(res.body, res.headers, pageToLoad),
        () => this.onError()
      );
  }

  ngOnInit(): void {
    // console.warn("hoalaaaaaaaaaaaaaa")
    this.facturaService.findAll().subscribe((data)=>{
      console.warn(data.body)
      this.renderChart(data.body)
    })
    // console.warn("fiiiiiiiiiiiiiiin")

    this.activatedRoute.data.subscribe(data => {
      this.page = data.pagingParams.page;
      this.ascending = data.pagingParams.ascending;
      this.predicate = data.pagingParams.predicate;
      this.ngbPaginationPage = data.pagingParams.page;
      this.loadPage();
    });
    this.registerChangeInFacturas();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  totalGraphicChart(contexto: any, data: any): any{

    data.forEach((element: any, index: number) => {
      console.warn(element.fecha)
      this.fechas.push(element.fecha)

      this.lel = {
        producto: element.pedido.productoPedido.producto.nombre,
        cantidad: element.pedido.productoPedido.cantidad,
      }
      this.IProductos.push(this.lel)
    });
    console.warn(this.IProductos)

    console.warn(this.fechas)
    this.myBarChart = new Chart(contexto, {
      type: 'bar',
      data: {
        // Barra inferior horizontal
        labels: this.fechas,
        datasets: this.IProductos
        // [
        //   {
        //     label: 'Producto 1',
        //     backgroundColor: 'red',
        //     data: [1,20, 30, 50],
        //   },
        //   {
        //     label: 'Producto 2',
        //     backgroundColor: 'green',
        //     data: [1,10, 20, 30],
        //   },
        //   {
        //     label: 'Producto 3',
        //     backgroundColor: 'yellow',
        //     data: [1,20, 50, 80],
        //   },
        // ],
      },
    });
  }

  renderChart(data: any): any{
    this.grafica = document.querySelector('#chartjs');
    this.graficaCtx = this.grafica.getContext('2d');
    this.totalGraphicChart(this.graficaCtx, data);
  }



  trackId(index: number, item: IFactura): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInFacturas(): void {
    this.eventSubscriber = this.eventManager.subscribe('facturaListModification', () => this.loadPage());
  }

  delete(factura: IFactura): void {
    const modalRef = this.modalService.open(FacturaDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.factura = factura;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected onSuccess(data: IFactura[] | null, headers: HttpHeaders, page: number): void {
    this.totalItems = Number(headers.get('X-Total-Count'));
    this.page = page;
    this.router.navigate(['/factura'], {
      queryParams: {
        page: this.page,
        size: this.itemsPerPage,
        sort: this.predicate + ',' + (this.ascending ? 'asc' : 'desc')
      }
    });
    this.facturas = data || [];
  }

  protected onError(): void {
    this.ngbPaginationPage = this.page;
  }
}
