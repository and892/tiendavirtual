import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IProductoCategoria } from 'app/shared/model/producto-categoria.model';

type EntityResponseType = HttpResponse<IProductoCategoria>;
type EntityArrayResponseType = HttpResponse<IProductoCategoria[]>;

@Injectable({ providedIn: 'root' })
export class ProductoCategoriaService {
  public resourceUrl = SERVER_API_URL + 'api/producto-categorias';

  constructor(protected http: HttpClient) {}

  create(productoCategoria: IProductoCategoria): Observable<EntityResponseType> {
    return this.http.post<IProductoCategoria>(this.resourceUrl, productoCategoria, { observe: 'response' });
  }

  update(productoCategoria: IProductoCategoria): Observable<EntityResponseType> {
    return this.http.put<IProductoCategoria>(this.resourceUrl, productoCategoria, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IProductoCategoria>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IProductoCategoria[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
