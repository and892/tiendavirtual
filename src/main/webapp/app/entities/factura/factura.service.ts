import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as moment from 'moment';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IFactura } from 'app/shared/model/factura.model';

type EntityResponseType = HttpResponse<IFactura>;
type EntityArrayResponseType = HttpResponse<IFactura[]>;

@Injectable({ providedIn: 'root' })
export class FacturaService {
  public resourceUrl = SERVER_API_URL + 'api/facturas';

  constructor(protected http: HttpClient) {}

  create(factura: IFactura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(factura);
    return this.http
      .post<IFactura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  update(factura: IFactura): Observable<EntityResponseType> {
    const copy = this.convertDateFromClient(factura);
    return this.http
      .put<IFactura>(this.resourceUrl, copy, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http
      .get<IFactura>(`${this.resourceUrl}/${id}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  findAll(): Observable<EntityResponseType> {
    console.warn('this.resourceUrl');
    console.warn(this.resourceUrl);
    return this.http
      .get<IFactura>(`${this.resourceUrl}`, { observe: 'response' })
      .pipe(map((res: EntityResponseType) => this.convertDateFromServer(res)));
  }
  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http
      .get<IFactura[]>(this.resourceUrl, { params: options, observe: 'response' })
      .pipe(map((res: EntityArrayResponseType) => this.convertDateArrayFromServer(res)));
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  protected convertDateFromClient(factura: IFactura): IFactura {
    const copy: IFactura = Object.assign({}, factura, {
      fecha: factura.fecha && factura.fecha.isValid() ? factura.fecha.toJSON() : undefined,
      fechaDePago: factura.fechaDePago && factura.fechaDePago.isValid() ? factura.fechaDePago.toJSON() : undefined
    });
    return copy;
  }

  protected convertDateFromServer(res: EntityResponseType): EntityResponseType {
    if (res.body) {
      res.body.fecha = res.body.fecha ? moment(res.body.fecha) : undefined;
      res.body.fechaDePago = res.body.fechaDePago ? moment(res.body.fechaDePago) : undefined;
    }
    return res;
  }

  protected convertDateArrayFromServer(res: EntityArrayResponseType): EntityArrayResponseType {
    if (res.body) {
      res.body.forEach((factura: IFactura) => {
        factura.fecha = factura.fecha ? moment(factura.fecha) : undefined;
        factura.fechaDePago = factura.fechaDePago ? moment(factura.fechaDePago) : undefined;
      });
    }
    return res;
  }
}
