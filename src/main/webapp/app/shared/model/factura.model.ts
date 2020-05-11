import { Moment } from 'moment';
import { IEnvio } from 'app/shared/model/envio.model';
import { ICliente } from 'app/shared/model/cliente.model';
import { IPedido } from 'app/shared/model/pedido.model';
import { FacturaEstado } from 'app/shared/model/enumerations/factura-estado.model';
import { MetodoPago } from 'app/shared/model/enumerations/metodo-pago.model';

export interface IFactura {
  id?: number;
  fecha?: Moment;
  detalles?: string;
  estado?: FacturaEstado;
  metodoDePago?: MetodoPago;
  fechaDePago?: Moment;
  montoPagado?: number;
  envios?: IEnvio[];
  cliente?: ICliente;
  pedido?: IPedido;
}

export class Factura implements IFactura {
  constructor(
    public id?: number,
    public fecha?: Moment,
    public detalles?: string,
    public estado?: FacturaEstado,
    public metodoDePago?: MetodoPago,
    public fechaDePago?: Moment,
    public montoPagado?: number,
    public envios?: IEnvio[],
    public cliente?: ICliente,
    public pedido?: IPedido
  ) {}
}
