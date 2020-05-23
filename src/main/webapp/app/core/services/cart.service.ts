import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {IProducto} from './../../shared/model/producto.model'



@Injectable({
  providedIn: 'root'
})
export class CartService {

  private productos: IProducto[] = [];
  // Va hacer un array de productos que inicializara en null
  private cart = new BehaviorSubject<IProducto[]>([]);
// Propiedad para que se suscriban, el asObservable es para que se compomporte como un
// observe
  cart$ = this.cart.asObservable();


  constructor() { }

  addCart(Producto: IProducto): void{
    // Tecnica de no mutacion, no usar push()
    this.productos = [...this.productos, Producto];
    // Notificar a todos los componentes suscritos que hubo un cambio, que algo se agrego
    this.cart.next(this.productos);
  }


}
