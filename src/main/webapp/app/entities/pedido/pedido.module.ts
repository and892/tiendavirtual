import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { PedidoComponent } from './pedido.component';
import { PedidoDetailComponent } from './pedido-detail.component';
import { PedidoUpdateComponent } from './pedido-update.component';
import { PedidoDeleteDialogComponent } from './pedido-delete-dialog.component';
import { pedidoRoute } from './pedido.route';

@NgModule({
  imports: [TiendavirtualSharedModule, RouterModule.forChild(pedidoRoute)],
  declarations: [PedidoComponent, PedidoDetailComponent, PedidoUpdateComponent, PedidoDeleteDialogComponent],
  entryComponents: [PedidoDeleteDialogComponent]
})
export class TiendavirtualPedidoModule {}
