import { Component, OnInit } from '@angular/core';
import {IProducto} from './../../../shared/model/producto.model'
import {CartService} from './../../../core/services/cart.service'
import {Observable} from 'rxjs'
import { FormControl, Validators } from '@angular/forms';
import {ProductoCategoriaService} from './../../../entities/producto-categoria/producto-categoria.service'


@Component({
  selector: 'jhi-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  productos$: Observable<IProducto[]>;

  nombreCategoriaField: FormControl;
  descripcionCategoriaField: FormControl;

  constructor(
    private cartService: CartService,
    private productoCategoriaService: ProductoCategoriaService
    ) {
      // Escucha continua de los productos
      this.productos$ = this.cartService.cart$;

      // Params: Cadena que se mostrara en el input - Array de validaciones: ¿Que tipo quiero?
      this.nombreCategoriaField = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]);

      this.descripcionCategoriaField = new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(10)
      ]);

      // Controlar datos Observar los datos-Observar los datos. Escuchar cambios dinamicamente
      // this.nombreCategoriaField.valueChanges.subscribe(valor => console.warn(valor))
      // this.descripcionCategoriaField.valueChanges.subscribe(valor => console.warn(valor))


    }

    ngOnInit(): void {

      // penCity();
    }

    saveData(): void{
      // const JSON = {
      //   "apellidoCompleto": "string",
      //   "ciudad": "string",
      //   "correo": "string",
      //   "direccion": "string",
      //   "facturas": [
      //     {
      //       "detalles": "string",
      //       "envios": null,
      //       "estado": "PAGADO",
      //       "fecha": "2020-05-24T23:27:31.758Z",
      //       "fechaDePago": "2020-05-24T23:27:31.758Z",
      //       "id": 0,
      //       "metodoDePago": "TARJETA_DE_CREDITO",
      //       "montoPagado": 0,
      //       "pedido": {
      //         "codigoPedido": "string",
      //         "estado": "COMPLETADO",
      //         "facturas": null,
      //         "fechaPedido": "2020-05-24T23:27:31.758Z",
      //         "id": 0,
      //         "productoPedido": {
      //           "cantidad": 0,
      //           "estado": "DISPONIBLE",
      //           "id": 0,
      //           "pedidos":null,
      //           "precioTotal": 0,
      //           "producto": {
      //             "descripcion": "string",
      //             "id": 0,
      //             "image": "string",
      //             "imageContentType": "string",
      //             "nombre": "string",
      //             "precio": 0,
      //             "productoCatergoria": null,
      //             "talla": "S"
      //           }
      //         },
      //         "productoPedidos":null
      //       }
      //     }
      //   ],
      //   "genero": "HOMBRE",
      //   "id": 0,
      //   "nombreCompleto": "string",
      //   "pedidos": null,
      //   "telefono": "string",
      //   "user": null
      // }

      if(this.nombreCategoriaField.valid &&  this.descripcionCategoriaField.valid ){
          console.warn(this.nombreCategoriaField.value)
      }
    }

}
