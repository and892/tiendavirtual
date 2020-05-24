import { Component, OnInit } from '@angular/core';
import {IProducto} from './../../../shared/model/producto.model'
import {CartService} from './../../../core/services/cart.service'
import {Observable} from 'rxjs'

@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  productos$: Observable<IProducto[]>;

  constructor(
    private cartService: CartService,
    ) {
      // Escucha continua de los productos
      this.productos$ = this.cartService.cart$;

    }

    ngOnInit(): void {

      // penCity();
    }

}
