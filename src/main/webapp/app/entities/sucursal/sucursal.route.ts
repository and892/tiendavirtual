import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { ISucursal, Sucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';
import { SucursalComponent } from './sucursal.component';
import { SucursalDetailComponent } from './sucursal-detail.component';
import { SucursalUpdateComponent } from './sucursal-update.component';

@Injectable({ providedIn: 'root' })
export class SucursalResolve implements Resolve<ISucursal> {
  constructor(private service: SucursalService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<ISucursal> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((sucursal: HttpResponse<Sucursal>) => {
          if (sucursal.body) {
            return of(sucursal.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Sucursal());
  }
}

export const sucursalRoute: Routes = [
  {
    path: '',
    component: SucursalComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: SucursalDetailComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: SucursalUpdateComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: SucursalUpdateComponent,
    resolve: {
      sucursal: SucursalResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.sucursal.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
