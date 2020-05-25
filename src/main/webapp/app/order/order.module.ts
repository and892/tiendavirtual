import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OrderRoutingModule } from './order-routing.module';
import { OrderComponent } from './components/order/order.component';
import { MaterialModule } from './../material/material.module';
import { TiendavirtualSharedModule } from './../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import {GroupByPipe} from './group-by.pipe'

@NgModule({
  declarations: [
    OrderComponent,
    GroupByPipe
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    TiendavirtualSharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    GroupByPipe
  ]
})



export class OrderModule { }
