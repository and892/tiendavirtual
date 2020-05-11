import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductoPedido, ProductoPedido } from 'app/shared/model/producto-pedido.model';
import { ProductoPedidoService } from './producto-pedido.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IProducto } from 'app/shared/model/producto.model';
import { ProductoService } from 'app/entities/producto/producto.service';

type SelectableEntity = IProducto | IPedido;

@Component({
  selector: 'jhi-producto-pedido-update',
  templateUrl: './producto-pedido-update.component.html'
})
export class ProductoPedidoUpdateComponent implements OnInit {
  isSaving = false;
  productos: IProducto[] = [];
  pedidos: IPedido[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required, Validators.min(0)]],
    precioTotal: [null, [Validators.required, Validators.min(0)]],
    estado: [],
    producto: [null, Validators.required],
    pedido: []
  });

  constructor(
    protected productoPedidoService: ProductoPedidoService,
    protected pedidoService: PedidoService,
    protected productoService: ProductoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoPedido }) => {
      this.updateForm(productoPedido);

      this.productoService.query().subscribe((res: HttpResponse<IProducto[]>) => (this.productos = res.body || []));

      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => (this.pedidos = res.body || []));
    });
  }

  updateForm(productoPedido: IProductoPedido): void {
    this.editForm.patchValue({
      id: productoPedido.id,
      cantidad: productoPedido.cantidad,
      precioTotal: productoPedido.precioTotal,
      estado: productoPedido.estado,
      producto: productoPedido.producto,
      pedido: productoPedido.pedido
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productoPedido = this.createFromForm();
    if (productoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.productoPedidoService.update(productoPedido));
    } else {
      this.subscribeToSaveResponse(this.productoPedidoService.create(productoPedido));
    }
  }

  private createFromForm(): IProductoPedido {
    return {
      ...new ProductoPedido(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      precioTotal: this.editForm.get(['precioTotal'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      producto: this.editForm.get(['producto'])!.value,
      pedido: this.editForm.get(['pedido'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductoPedido>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
