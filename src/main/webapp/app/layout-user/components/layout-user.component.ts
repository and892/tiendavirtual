import { Component, OnInit } from '@angular/core';
import {ProductoService} from '../../entities/producto/producto.service';
import { IProducto } from '../../shared/model/producto.model';
import {LayoutUserService} from '../layout-user.service';
// import {LayoutUserService} from './../layout-user.service'
// import {CartService  } from '../../core/services/cart.service';

@Component({
  selector: 'jhi-layout-user',
  templateUrl: './layout-user.component.html',
  styleUrls: ['./layout-user.component.scss']
})
export class LayoutUserComponent implements OnInit {
  productos?: IProducto[] = [];


  filtroPost = '';


  constructor(
      private productoService: ProductoService,
      private layoutUserService: LayoutUserService,
      // private cartService: CartService
    ) { }

  ngOnInit(): void {
    this.fetchProducts();
    // this.layoutUserService.getAllProductos
    // this.productoService.findAll().subscribe( (data) => {

    //   console.warn(data.body)
    // })
  }


  fetchProducts(): void{
    this.layoutUserService.getAllProductos()
      .subscribe((productos:any) => {
        // console.warn("Traer productos")
        // console.warn(productos)
        this.productos = productos;
      })
  }

  clickProduct(id: number): void{
    console.warn(id)
  }

}
