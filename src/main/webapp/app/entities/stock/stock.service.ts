import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IStock } from 'app/shared/model/stock.model';

type EntityResponseType = HttpResponse<IStock>;
type EntityArrayResponseType = HttpResponse<IStock[]>;

@Injectable({ providedIn: 'root' })
export class StockService {
  public resourceUrl = SERVER_API_URL + 'api/stocks';

  constructor(protected http: HttpClient) {}

  create(stock: IStock): Observable<EntityResponseType> {
    return this.http.post<IStock>(this.resourceUrl, stock, { observe: 'response' });
  }

  update(stock: IStock): Observable<EntityResponseType> {
    return this.http.put<IStock>(this.resourceUrl, stock, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IStock>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IStock[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
