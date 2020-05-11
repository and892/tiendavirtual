import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IEnvio, Envio } from 'app/shared/model/envio.model';
import { EnvioService } from './envio.service';
import { EnvioComponent } from './envio.component';
import { EnvioDetailComponent } from './envio-detail.component';
import { EnvioUpdateComponent } from './envio-update.component';

@Injectable({ providedIn: 'root' })
export class EnvioResolve implements Resolve<IEnvio> {
  constructor(private service: EnvioService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IEnvio> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((envio: HttpResponse<Envio>) => {
          if (envio.body) {
            return of(envio.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Envio());
  }
}

export const envioRoute: Routes = [
  {
    path: '',
    component: EnvioComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tiendavirtualApp.envio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: EnvioDetailComponent,
    resolve: {
      envio: EnvioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.envio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: EnvioUpdateComponent,
    resolve: {
      envio: EnvioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.envio.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: EnvioUpdateComponent,
    resolve: {
      envio: EnvioResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.envio.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
