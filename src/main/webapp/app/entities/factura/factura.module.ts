import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { FacturaComponent } from './factura.component';
import { FacturaDetailComponent } from './factura-detail.component';
import { FacturaUpdateComponent } from './factura-update.component';
import { FacturaDeleteDialogComponent } from './factura-delete-dialog.component';
import { facturaRoute } from './factura.route';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  imports: [TiendavirtualSharedModule, ChartsModule, RouterModule.forChild(facturaRoute)],
  declarations: [FacturaComponent, FacturaDetailComponent, FacturaUpdateComponent, FacturaDeleteDialogComponent],
  entryComponents: [FacturaDeleteDialogComponent]
})
export class TiendavirtualFacturaModule {}
