import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductoPedido } from 'app/shared/model/producto-pedido.model';

type EntityResponseType = HttpResponse<IProductoPedido>;
type EntityArrayResponseType = HttpResponse<IProductoPedido[]>;

@Injectable({ providedIn: 'root' })
export class ProductoPedidoService {
  public resourceUrl = SERVER_API_URL + 'api/producto-pedidos';

  constructor(protected http: HttpClient) {}

  create(productoPedido: IProductoPedido): Observable<EntityResponseType> {
    return this.http.post<IProductoPedido>(this.resourceUrl, productoPedido, { observe: 'response' });
  }

  update(productoPedido: IProductoPedido): Observable<EntityResponseType> {
    return this.http.put<IProductoPedido>(this.resourceUrl, productoPedido, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductoPedido>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductoPedido[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
