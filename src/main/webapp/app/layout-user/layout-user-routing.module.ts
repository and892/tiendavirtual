import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LayoutUserComponent} from './components/layout-user.component';
import {ProductoDetalleUserComponent} from './components/producto-detalle-user/producto-detalle-user.component'


const routes: Routes = [
  {
    path:'',
    component: LayoutUserComponent,
  },
  {
    path: 'user/productos/:id',
    component: ProductoDetalleUserComponent
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutUserRoutingModule{}
