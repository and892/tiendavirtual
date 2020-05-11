import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { TiendavirtualSharedModule } from 'app/shared/shared.module';
import { SucursalComponent } from './sucursal.component';
import { SucursalDetailComponent } from './sucursal-detail.component';
import { SucursalUpdateComponent } from './sucursal-update.component';
import { SucursalDeleteDialogComponent } from './sucursal-delete-dialog.component';
import { sucursalRoute } from './sucursal.route';

@NgModule({
  imports: [TiendavirtualSharedModule, RouterModule.forChild(sucursalRoute)],
  declarations: [SucursalComponent, SucursalDetailComponent, SucursalUpdateComponent, SucursalDeleteDialogComponent],
  entryComponents: [SucursalDeleteDialogComponent]
})
export class TiendavirtualSucursalModule {}
