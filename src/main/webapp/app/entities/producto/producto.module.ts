import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { ProductoComponent } from './producto.component';
import { ProductoDetailComponent } from './producto-detail.component';
import { ProductoUpdateComponent } from './producto-update.component';
import { ProductoDeleteDialogComponent } from './producto-delete-dialog.component';
import { productoRoute } from './producto.route';
// import { FiltroPipe } from './../../layout-user/filtro.pipe';

@NgModule({
  imports: [TiendavirtualSharedModule,RouterModule.forChild(productoRoute)],
  declarations: [
    ProductoComponent,
    ProductoDetailComponent,
    ProductoUpdateComponent,
    ProductoDeleteDialogComponent,

  ],
  exports: [ProductoComponent],
  entryComponents: [ProductoDeleteDialogComponent]
})
export class TiendavirtualProductoModule {}
