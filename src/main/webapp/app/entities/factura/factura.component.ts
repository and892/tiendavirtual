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

import {Chart, ChartOptions,ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

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

  NombresFactura: any[] = [];
  CantidadNombresFactura: any[] = [];
  IProductos: any[] = [];

  groupProducts: any[] = [];
  productoData: any;

  dringlichkeiten: any[] = []


  // Charts
  barChartOptions: ChartOptions = {
    responsive: true,
    title: {
      display: true,
      text: 'Productos ventidos en el dia',
      fontSize: 30,
      padding: 30,
      fontColor: '#000'
    },

    // },
    // tooltips: {
    //   titleFontSize: 18,
    //   xPadding: 10,
    //   yPadding: 10,
    //   mode:'label',
    //   callbacks: {

    //     label(tooltipItem: ChartTooltipItem , data: ChartData): any{

    //       // console.warn(data)
    //       console.warn(tooltipItem.label)
    //       return tooltipItem.xLabel ='as'
    //     },
    //   },
    // }
  };

  // barChartLabels: Label[] = ['2006', '2007', '2008', '2009', '2010', '2011', '2012'];
  barChartLabels: Label[] = [];
  barChartType: ChartType = 'bar'
  barChartLegend = true;
  barChartPlugins = [];

  barChartData: ChartDataSets[] = [
      { data: [], label: 'Cantidad', stack: '' }
    ];

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

    data.forEach((element: any) => {
      this.CantidadNombresFactura.push(element.pedido.productoPedido.cantidad)
      this.NombresFactura.push(element.pedido.productoPedido.producto.nombre)


      this.barChartLabels.push(element.fecha)
      this.barChartData[0].data?.push(element.pedido.productoPedido.cantidad)
      // this.barChartData.label


      this.productoData = {
        label: element.pedido.productoPedido.producto.nombre,
        data: element.pedido.productoPedido.cantidad,
        fecha: element.fecha
        // backgroundColor: 'rgba(255, 99, 132, 0.6)',
      }
      this.groupProducts.push(this.productoData);

    })
    console.warn(this.groupProducts)


    this.myBarChart = new Chart(contexto, {
      type: 'bar',
      data: {
        labels: this.groupProducts.map(item => new Intl.DateTimeFormat('es-MX', {month: 'long', day: 'numeric'}).format(new Date(item.fecha))),
        // datasets: this.groupProducts.map(p => p.data)
        datasets: [
          {
            label: "Producto",
            data: this.groupProducts.map(p => p.data),
            backgroundColor: ['red', 'green', 'yellow', 'blue', 'orange'],
          }]
      },
      options: {
        title: {
          display: true,
          text: 'Productos ventidos en el dia',
          fontSize: 30,
          padding: 30,
          fontColor: '#000'
        },
        // legend: {
        //   // labels: [0] = this.groupProducts.map(p => p),
        // }
      }

    });


  }
/*
        /*
        datasets: [{
          label: 'Productos',
          // data: [],
          data: this.CantidadNombresFactura,
          backgroundColor: [
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)',
            'rgba(255, 159, 64, 0.6)',
            'rgba(255, 99, 132, 0.6)',
            'rgba(54, 162, 235, 0.6)',
            'rgba(255, 206, 86, 0.6)',
            'rgba(75, 192, 192, 0.6)',
            'rgba(153, 102, 255, 0.6)'
          ]
        },
      ]


        // Barra inferior horizontal

        labels: this.fechas,
        datasets: [
          {
            label: this.IProductos,
            data:[this.IProductos]

          }
        ]

        datasets:[
          {
            label: 'Producto 1',
            backgroundColor: 'red',
            data: [1,20, 30, 50],
          },
          {
            label: 'Producto 2',
            backgroundColor: 'green',
            data: [1,10, 20, 30],
          },
          {
            label: 'Producto 3',
            backgroundColor: 'yellow',
            data: [1,20, 50, 80],
          },
        ],
*/


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
