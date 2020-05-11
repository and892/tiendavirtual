import { IProducto } from 'app/shared/model/producto.model';
import { ISucursal } from 'app/shared/model/sucursal.model';

export interface IStock {
  id?: number;
  cantidad?: number;
  producto?: IProducto;
  sucursal?: ISucursal;
}

export class Stock implements IStock {
  constructor(public id?: number, public cantidad?: number, public producto?: IProducto, public sucursal?: ISucursal) {}
}
