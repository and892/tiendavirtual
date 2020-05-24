import { NgModule } from '@angular/core';
import {RouterModule } from '@angular/router';
// import { errorRoute } from './layouts/error/error.route';
import { navbarRoute } from './layouts/navbar/navbar.route';
import { DEBUG_INFO_ENABLED } from 'app/app.constants';
import { Authority } from 'app/shared/constants/authority.constants';

import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';

const LAYOUT_ROUTES = [navbarRoute]

@NgModule({
  imports: [
    RouterModule.forRoot(
      [
        {
          path: 'user/productos',
          loadChildren: () => import('./layout-user//layout-user-routing.module').then(m => m.LayoutUserRoutingModule)
        },
        {
          path:'order',
          loadChildren: () => import('./order/order.module').then(m => m.OrderModule)
        },
        {
          path: 'admin',
          data: {
            authorities: [Authority.ADMIN]
          },
          canActivate: [UserRouteAccessService],
          loadChildren: () => import('./admin/admin-routing.module').then(m => m.AdminRoutingModule)
        },
        {
          path: 'account',
          loadChildren: () => import('./account/account.module').then(m => m.AccountModule)
        },
        ...LAYOUT_ROUTES
      ],
      { enableTracing: DEBUG_INFO_ENABLED }
    )
  ],
  exports: [RouterModule]
})
export class TiendavirtualAppRoutingModule {}
