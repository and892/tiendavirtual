import { IUser } from 'app/core/user/user.model';
import { IFactura } from 'app/shared/model/factura.model';
import { IPedido } from 'app/shared/model/pedido.model';
import { Genero } from 'app/shared/model/enumerations/genero.model';

export interface ICliente {
  id?: number;
  nombreCompleto?: string;
  apellidoCompleto?: string;
  genero?: Genero;
  correo?: string;
  telefono?: string;
  direccion?: string;
  ciudad?: string;
  user?: IUser;
  facturas?: IFactura[];
  pedidos?: IPedido[];
}

export class Cliente implements ICliente {
  constructor(
    public id?: number,
    public nombreCompleto?: string,
    public apellidoCompleto?: string,
    public genero?: Genero,
    public correo?: string,
    public telefono?: string,
    public direccion?: string,
    public ciudad?: string,
    public user?: IUser,
    public facturas?: IFactura[],
    public pedidos?: IPedido[]
  ) {}
}
