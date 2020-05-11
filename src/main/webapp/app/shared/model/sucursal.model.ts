export interface ISucursal {
  id?: number;
  nombre?: string;
  direccion?: string;
}

export class Sucursal implements ISucursal {
  constructor(public id?: number, public nombre?: string, public direccion?: string) {}
}
