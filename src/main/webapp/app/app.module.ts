import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
// import { HttpClientModule } from '@angular/common/http';

import './vendor';
import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { TiendavirtualCoreModule } from 'app/core/core.module';
import { TiendavirtualAppRoutingModule } from './app-routing.module';
import { TiendavirtualHomeModule } from './home/home.module';
import { TiendavirtualEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ActiveMenuDirective } from './layouts/navbar/active-menu.directive';
import { ErrorComponent } from './layouts/error/error.component';
// import { ProductoUserComponent } fro./layout-user/components/producto-user/producto-user.componentent';
import { LayoutUserModule } from './layout-user/layout-user.module';
// import { ProductoUserComponent } from './producto-user/producto-user.component';
// ./layout-user/filtro.pipe
// import { ProductoUserComponent } from './layout-user/components/producto-user/producto-user.component';
// import { CategoriasProductosUserComponent } from './categorias-productos-user/categorias-productos-user.component';



@NgModule({
  imports: [
    BrowserModule,
    TiendavirtualSharedModule,
    TiendavirtualCoreModule,
    TiendavirtualHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    TiendavirtualEntityModule,
    TiendavirtualAppRoutingModule,
    LayoutUserModule,
    // HttpClientModule
  ],
  declarations: [
    MainComponent,
    NavbarComponent,
    ErrorComponent,
    PageRibbonComponent,
    ActiveMenuDirective,
    FooterComponent,
    // ProductoUserComponent,
    // FiltroPipe,
    // CategoriasProductosUserComponent
  ],
  bootstrap: [MainComponent]
})
export class TiendavirtualAppModule {}
