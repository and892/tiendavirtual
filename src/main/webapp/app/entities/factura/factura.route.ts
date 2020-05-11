import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IFactura, Factura } from 'app/shared/model/factura.model';
import { FacturaService } from './factura.service';
import { FacturaComponent } from './factura.component';
import { FacturaDetailComponent } from './factura-detail.component';
import { FacturaUpdateComponent } from './factura-update.component';

@Injectable({ providedIn: 'root' })
export class FacturaResolve implements Resolve<IFactura> {
  constructor(private service: FacturaService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IFactura> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((factura: HttpResponse<Factura>) => {
          if (factura.body) {
            return of(factura.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Factura());
  }
}

export const facturaRoute: Routes = [
  {
    path: '',
    component: FacturaComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tiendavirtualApp.factura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: FacturaDetailComponent,
    resolve: {
      factura: FacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.factura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: FacturaUpdateComponent,
    resolve: {
      factura: FacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.factura.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: FacturaUpdateComponent,
    resolve: {
      factura: FacturaResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.factura.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
