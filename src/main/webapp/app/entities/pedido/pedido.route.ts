import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { JhiResolvePagingParams } from 'ng-jhipster';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { PedidoComponent } from './pedido.component';
import { PedidoDetailComponent } from './pedido-detail.component';
import { PedidoUpdateComponent } from './pedido-update.component';

@Injectable({ providedIn: 'root' })
export class PedidoResolve implements Resolve<IPedido> {
  constructor(private service: PedidoService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IPedido> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((pedido: HttpResponse<Pedido>) => {
          if (pedido.body) {
            return of(pedido.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Pedido());
  }
}

export const pedidoRoute: Routes = [
  {
    path: '',
    component: PedidoComponent,
    resolve: {
      pagingParams: JhiResolvePagingParams
    },
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'tiendavirtualApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/view',
    component: PedidoDetailComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: 'new',
    component: PedidoUpdateComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  },
  {
    path: ':id/edit',
    component: PedidoUpdateComponent,
    resolve: {
      pedido: PedidoResolve
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'tiendavirtualApp.pedido.home.title'
    },
    canActivate: [UserRouteAccessService]
  }
];
