import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IProductoCategoria, ProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { ProductoCategoriaService } from './producto-categoria.service';
import { ProductoCategoriaComponent } from './producto-categoria.component';
import { ProductoCategoriaDetailComponent } from './producto-categoria-detail.component';
import { ProductoCategoriaUpdateComponent } from './producto-categoria-update.component';

@Injectable({ providedIn: 'root' })
export class ProductoCategoriaResolve implements Resolve<IProductoCategoria> {
  constructor(private service: ProductoCategoriaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IProductoCategoria> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((productoCategoria: HttpResponse<ProductoCategoria>) => {
          if (productoCategoria.body) {
            return of(productoCategoria.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new ProductoCategoria());
  }
}

export const productoCategoriaRoute: Routes = [
  {
    path: '',
    component: ProductoCategoriaComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.productoCategoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: ProductoCategoriaDetailComponent,
    resolve: {
      productoCategoria: ProductoCategoriaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.productoCategoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: ProductoCategoriaUpdateComponent,
    resolve: {
      productoCategoria: ProductoCategoriaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.productoCategoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: ProductoCategoriaUpdateComponent,
    resolve: {
      productoCategoria: ProductoCategoriaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.productoCategoria.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
