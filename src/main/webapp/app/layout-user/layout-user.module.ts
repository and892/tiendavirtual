import { NgModule } from '@angular/core';
import {CommonModule} from "@angular/common";

import { HttpClientModule } from '@angular/common/http';

import {LayoutUserRoutingModule} from './layout-user-routing.module';
import {LayoutUserComponent} from './components/layout-user.component';
import { ProductoDetalleUserComponent } from './components/producto-detalle-user/producto-detalle-user.component';
// import {CategoriasProductosUserComponent  } from './components/categorias-productos-user/categorias-productos-user.component';
// import {ProductoDetalleUserComponent  } from './components/producto-detalle-user/producto-detalle-user.component';
// import {TiendavirtualProductoModule} from './../entities/producto/producto.module';
import {TiendavirtualProductoModule} from './../entities/producto/producto.module';
import { FiltroPipe } from './filtro.pipe';
import {FormsModule  } from '@angular/forms';
import {ProductoUserComponent} from './components/producto-user/producto-user.component'

@NgModule({
  declarations: [
    LayoutUserComponent,
    ProductoUserComponent,
    // CategoriasProductosUserComponent,
    ProductoDetalleUserComponent,
    FiltroPipe,
  ],
  imports: [
    LayoutUserRoutingModule,
    CommonModule,
    TiendavirtualProductoModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [
    LayoutUserComponent,
    FiltroPipe
  ]
})
export class LayoutUserModule{ }
