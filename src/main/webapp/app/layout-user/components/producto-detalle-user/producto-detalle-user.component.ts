import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { LayoutUserService } from './../../layout-user.service';
import { IProducto } from './../../../shared/model/producto.model';

@Component({
  selector: 'jhi-producto-detalle-user',
  templateUrl: './producto-detalle-user.html',
  styleUrls: ['./producto-detalle-user.scss']
})
export class ProductoDetalleUserComponent implements OnInit {
  producto!: IProducto;

  constructor(
    private route: ActivatedRoute,
    private layoutUserService: LayoutUserService
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((params: Params)=>{
      const id = params.id;
      this.fetchProduct(id)
    });
  }

  fetchProduct(id: any): void{
    this.layoutUserService.obtenerUnProducto(id)
      .subscribe((producto:any) => {
        console.warn(producto)
        this.producto = producto;
      })
  }
}
