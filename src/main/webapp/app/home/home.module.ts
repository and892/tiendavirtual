import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';
// import {TiendavirtualProductoModule} from './../entities/producto/producto.module';
// import {ProductoUserComponent } from './../layout-user/components/producto-user/producto-user.component';
// import {LayoutUserModule } from './../layout-user/layout-user.module';

@NgModule({
  imports: [TiendavirtualSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
  // imports: [TiendavirtualProductoModule]
})
export class TiendavirtualHomeModule {}
