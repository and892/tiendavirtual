import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { SucursalUpdateComponent } from 'app/entities/sucursal/sucursal-update.component';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';
import { Sucursal } from 'app/shared/model/sucursal.model';

describe('Component Tests', () => {
  describe('Sucursal Management Update Component', () => {
    let comp: SucursalUpdateComponent;
    let fixture: ComponentFixture<SucursalUpdateComponent>;
    let service: SucursalService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [SucursalUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(SucursalUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(SucursalUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(SucursalService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sucursal(123);
        spyOn(service, 'update').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.update).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));

      it('Should call create service on save for new entity', fakeAsync(() => {
        // GIVEN
        const entity = new Sucursal();
        spyOn(service, 'create').and.returnValue(of(new HttpResponse({ body: entity })));
        comp.updateForm(entity);
        // WHEN
        comp.save();
        tick(); // simulate async

        // THEN
        expect(service.create).toHaveBeenCalledWith(entity);
        expect(comp.isSaving).toEqual(false);
      }));
    });
  });
});
