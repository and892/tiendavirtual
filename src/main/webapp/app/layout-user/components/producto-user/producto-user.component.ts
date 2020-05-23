import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import {IProducto} from './../../../shared/model/producto.model';
import {CartService} from './../../../core/services/cart.service';


@Component({
  selector: 'jhi-producto-user',
  templateUrl: './producto-user.component.html',
  styleUrls: ['./producto-user.component.scss']
})
export class ProductoUserComponent implements OnInit {

  @Input() producto!: IProducto;
  @Output() productoSeleccionado: EventEmitter<any> = new EventEmitter();

  constructor(
        private cartService: CartService
      ) { }


  ngOnInit(): void {
  }
  anadirCarrito(): void{
    // this.cartService.addCart(this.producto);
    console.warn('hola')
    // this.productoSeleccionado.emit(this.producto);
    this.cartService.addCart(this.producto);
  }
}
