import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoService } from './pedido.service';
import { IProductoPedido } from 'app/shared/model/producto-pedido.model';
import { ProductoPedidoService } from 'app/entities/producto-pedido/producto-pedido.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';

type SelectableEntity = ICliente | IProductoPedido;

@Component({
  selector: 'jhi-pedido-update',
  templateUrl: './pedido-update.component.html'
})
export class PedidoUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  productopedidos: IProductoPedido[] = [];

  editForm = this.fb.group({
    id: [],
    fechaPedido: [null, [Validators.required]],
    estado: [],
    codigoPedido: [null, [Validators.required]],
    cliente: [null, Validators.required],
    productoPedido: [null, Validators.required]
  });

  constructor(
    protected pedidoService: PedidoService,
    protected productoPedidoService: ProductoPedidoService,
    protected clienteService: ClienteService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedido }) => {
      if (!pedido.id) {
        const today = moment().startOf('day');
        pedido.fechaPedido = today;
      }

      this.updateForm(pedido);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));

      this.productoPedidoService.query().subscribe((res: HttpResponse<IProductoPedido[]>) => (this.productopedidos = res.body || []));
    });
  }

  updateForm(pedido: IPedido): void {
    this.editForm.patchValue({
      id: pedido.id,
      fechaPedido: pedido.fechaPedido ? pedido.fechaPedido.format(DATE_TIME_FORMAT) : null,
      estado: pedido.estado,
      codigoPedido: pedido.codigoPedido,
      cliente: pedido.cliente,
      productoPedido: pedido.productoPedido
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const pedido = this.createFromForm();
    if (pedido.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoService.update(pedido));
    } else {
      this.subscribeToSaveResponse(this.pedidoService.create(pedido));
    }
  }

  private createFromForm(): IPedido {
    return {
      ...new Pedido(),
      id: this.editForm.get(['id'])!.value,
      fechaPedido: this.editForm.get(['fechaPedido'])!.value
        ? moment(this.editForm.get(['fechaPedido'])!.value, DATE_TIME_FORMAT)
        : undefined,
      estado: this.editForm.get(['estado'])!.value,
      codigoPedido: this.editForm.get(['codigoPedido'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      productoPedido: this.editForm.get(['productoPedido'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedido>>): void {
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
