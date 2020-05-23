import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LayoutUserComponent} from './components/layout-user.component';
// import { ProductoUserComponent } from './components/producto-user/producto-user.component';
// import {CategoriasProductosUserComponent  } from './components/categorias-productos-user/categorias-productos-user.component';
// import {ProductoDetalleUserComponent  } from './components/producto-detalle-user/producto-detalle-user.component';



const routes: Routes = [
  {
    path:'',
    component: LayoutUserComponent,
  },
  // {
  //   path:'user/productos/:id',
  //   // component: ProductoDetalleUserComponent,
  // },
  // {
  //   path:'',
  //   component: ,
  // },
  // {
  //   path:'',
  //   component: ,
  // },

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
