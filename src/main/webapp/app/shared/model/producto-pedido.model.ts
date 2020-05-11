import { IPedido } from 'app/shared/model/pedido.model';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoPedidoEstado } from 'app/shared/model/enumerations/producto-pedido-estado.model';

export interface IProductoPedido {
  id?: number;
  cantidad?: number;
  precioTotal?: number;
  estado?: ProductoPedidoEstado;
  pedidos?: IPedido[];
  producto?: IProducto;
  pedido?: IPedido;
}

export class ProductoPedido implements IProductoPedido {
  constructor(
    public id?: number,
    public cantidad?: number,
    public precioTotal?: number,
    public estado?: ProductoPedidoEstado,
    public pedidos?: IPedido[],
    public producto?: IProducto,
    public pedido?: IPedido
  ) {}
}
