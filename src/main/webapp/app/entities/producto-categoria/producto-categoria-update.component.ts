import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IProductoCategoria, ProductoCategoria } from 'app/shared/model/producto-categoria.model';
import { ProductoCategoriaService } from './producto-categoria.service';

@Component({
  selector: 'jhi-producto-categoria-update',
  templateUrl: './producto-categoria-update.component.html'
})
export class ProductoCategoriaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required]],
    descripcion: []
  });

  constructor(
    protected productoCategoriaService: ProductoCategoriaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ productoCategoria }) => {
      this.updateForm(productoCategoria);
    });
  }

  updateForm(productoCategoria: IProductoCategoria): void {
    this.editForm.patchValue({
      id: productoCategoria.id,
      nombre: productoCategoria.nombre,
      descripcion: productoCategoria.descripcion
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const productoCategoria = this.createFromForm();
    if (productoCategoria.id !== undefined) {
      this.subscribeToSaveResponse(this.productoCategoriaService.update(productoCategoria));
    } else {
      this.subscribeToSaveResponse(this.productoCategoriaService.create(productoCategoria));
    }
  }

  private createFromForm(): IProductoCategoria {
    return {
      ...new ProductoCategoria(),
      id: this.editForm.get(['id'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProductoCategoria>>): void {
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
}
