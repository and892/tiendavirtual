import { Moment } from 'moment';
import { IProductoPedido } from 'app/shared/model/producto-pedido.model';
import { IFactura } from 'app/shared/model/factura.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { PedidoEstado } from 'app/shared/model/enumerations/pedido-estado.model';

export interface IPedido {
  id?: number;
  fechaPedido?: Moment;
  estado?: PedidoEstado;
  codigoPedido?: string;
  productoPedidos?: IProductoPedido[];
  facturas?: IFactura[];
  cliente?: ICliente;
  productoPedido?: IProductoPedido;
}

export class Pedido implements IPedido {
  constructor(
    public id?: number,
    public fechaPedido?: Moment,
    public estado?: PedidoEstado,
    public codigoPedido?: string,
    public productoPedidos?: IProductoPedido[],
    public facturas?: IFactura[],
    public cliente?: ICliente,
    public productoPedido?: IProductoPedido
  ) {}
}
