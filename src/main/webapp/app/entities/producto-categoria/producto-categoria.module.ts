import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { ProductoCategoriaComponent } from './producto-categoria.component';
import { ProductoCategoriaDetailComponent } from './producto-categoria-detail.component';
import { ProductoCategoriaUpdateComponent } from './producto-categoria-update.component';
import { ProductoCategoriaDeleteDialogComponent } from './producto-categoria-delete-dialog.component';
import { productoCategoriaRoute } from './producto-categoria.route';

@NgModule({
  imports: [TiendavirtualSharedModule, RouterModule.forChild(productoCategoriaRoute)],
  declarations: [
    ProductoCategoriaComponent,
    ProductoCategoriaDetailComponent,
    ProductoCategoriaUpdateComponent,
    ProductoCategoriaDeleteDialogComponent
  ],
  entryComponents: [ProductoCategoriaDeleteDialogComponent]
})
export class TiendavirtualProductoCategoriaModule {}
