import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IProductoPedido } from 'app/shared/model/producto-pedido.model';

@Component({
  selector: 'jhi-producto-pedido-detail',
  templateUrl: './producto-pedido-detail.component.html'
})
export class ProductoPedidoDetailComponent implements OnInit {
  productoPedido: IProductoPedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoPedido }) => (this.productoPedido = productoPedido));
  }

  previousState(): void {
    window.history.back();
  }
}
