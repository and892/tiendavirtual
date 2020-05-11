import { IProducto } from 'app/shared/model/producto.model';

export interface IProductoCategoria {
  id?: number;
  nombre?: string;
  descripcion?: string;
  productos?: IProducto[];
}

export class ProductoCategoria implements IProductoCategoria {
  constructor(public id?: number, public nombre?: string, public descripcion?: string, public productos?: IProducto[]) {}
}
