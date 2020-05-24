import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
// import {IProducto } from './../shared/model/producto.model';
// import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LayoutUserService {
  public resourceUrl = SERVER_API_URL + 'api/productos';
  public resourceUrl2 = SERVER_API_URL + 'api/producto-categorias';
  public resourceUrl3 = SERVER_API_URL + 'api/productos';

  constructor(
        private http: HttpClient
      ) { }

  getAllProductos():any{
    return this.http.get(this.resourceUrl);
  }
  obtenerUnProducto(id: any):any{
    console.warn(`${this.resourceUrl3}/${id}`)
    return this.http.get(`${this.resourceUrl3}/${id}`);
  }
  getAllCategorias():any {
    return this.http.get(this.resourceUrl2);
  }
}
