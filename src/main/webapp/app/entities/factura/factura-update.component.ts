import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { IFactura, Factura } from 'app/shared/model/factura.model';
import { FacturaService } from './factura.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente/cliente.service';
import { IPedido } from 'app/shared/model/pedido.model';
import { PedidoService } from 'app/entities/pedido/pedido.service';

type SelectableEntity = ICliente | IPedido;

@Component({
  selector: 'jhi-factura-update',
  templateUrl: './factura-update.component.html'
})
export class FacturaUpdateComponent implements OnInit {
  isSaving = false;
  clientes: ICliente[] = [];
  pedidos: IPedido[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    detalles: [],
    estado: [null, [Validators.required]],
    metodoDePago: [null, [Validators.required]],
    fechaDePago: [null, [Validators.required]],
    montoPagado: [null, [Validators.required]],
    cliente: [null, Validators.required],
    pedido: [null, Validators.required]
  });

  constructor(
    protected facturaService: FacturaService,
    protected clienteService: ClienteService,
    protected pedidoService: PedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ factura }) => {
      if (!factura.id) {
        const today = moment().startOf('day');
        factura.fecha = today;
        factura.fechaDePago = today;
      }

      this.updateForm(factura);

      this.clienteService.query().subscribe((res: HttpResponse<ICliente[]>) => (this.clientes = res.body || []));

      this.pedidoService.query().subscribe((res: HttpResponse<IPedido[]>) => (this.pedidos = res.body || []));
    });
  }

  updateForm(factura: IFactura): void {
    this.editForm.patchValue({
      id: factura.id,
      fecha: factura.fecha ? factura.fecha.format(DATE_TIME_FORMAT) : null,
      detalles: factura.detalles,
      estado: factura.estado,
      metodoDePago: factura.metodoDePago,
      fechaDePago: factura.fechaDePago ? factura.fechaDePago.format(DATE_TIME_FORMAT) : null,
      montoPagado: factura.montoPagado,
      cliente: factura.cliente,
      pedido: factura.pedido
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const factura = this.createFromForm();
    if (factura.id !== undefined) {
      this.subscribeToSaveResponse(this.facturaService.update(factura));
    } else {
      this.subscribeToSaveResponse(this.facturaService.create(factura));
    }
  }

  private createFromForm(): IFactura {
    return {
      ...new Factura(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value ? moment(this.editForm.get(['fecha'])!.value, DATE_TIME_FORMAT) : undefined,
      detalles: this.editForm.get(['detalles'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      metodoDePago: this.editForm.get(['metodoDePago'])!.value,
      fechaDePago: this.editForm.get(['fechaDePago'])!.value
        ? moment(this.editForm.get(['fechaDePago'])!.value, DATE_TIME_FORMAT)
        : undefined,
      montoPagado: this.editForm.get(['montoPagado'])!.value,
      cliente: this.editForm.get(['cliente'])!.value,
      pedido: this.editForm.get(['pedido'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IFactura>>): void {
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
