import { Moment } from 'moment';
import { IFactura } from 'app/shared/model/factura.model';

export interface IEnvio {
  id?: number;
  fecha?: string;
  detalles?: Moment;
  codigoLocalizacion?: string;
  factura?: IFactura;
}

export class Envio implements IEnvio {
  constructor(
    public id?: number,
    public fecha?: string,
    public detalles?: Moment,
    public codigoLocalizacion?: string,
    public factura?: IFactura
  ) {}
}
