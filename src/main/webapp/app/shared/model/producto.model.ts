import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { Talla } from 'app/shared/model/enumerations/talla.model';

export interface IProducto {
  id?: number;
  nombre?: string;
  descripcion?: string;
  precio?: number;
  talla?: Talla;
  imageContentType?: string;
  image?: any;
  productoCatergoria?: IProductoCategoria;
}

export class Producto implements IProducto {
  constructor(
    public id?: number,
    public nombre?: string,
    public descripcion?: string,
    public precio?: number,
    public talla?: Talla,
    public imageContentType?: string,
    public image?: any,
    public productoCatergoria?: IProductoCategoria
  ) {}
}
