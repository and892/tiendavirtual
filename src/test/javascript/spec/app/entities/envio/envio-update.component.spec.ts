import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { of } from 'rxjs';

import { TiendavirtualTestModule } from '../../../test.module';
import { EnvioUpdateComponent } from 'app/entities/envio/envio-update.component';
import { EnvioService } from 'app/entities/envio/envio.service';
import { Envio } from 'app/shared/model/envio.model';

describe('Component Tests', () => {
  describe('Envio Management Update Component', () => {
    let comp: EnvioUpdateComponent;
    let fixture: ComponentFixture<EnvioUpdateComponent>;
    let service: EnvioService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [TiendavirtualTestModule],
        declarations: [EnvioUpdateComponent],
        providers: [FormBuilder]
      })
        .overrideTemplate(EnvioUpdateComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(EnvioUpdateComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(EnvioService);
    });

    describe('save', () => {
      it('Should call update service on save for existing entity', fakeAsync(() => {
        // GIVEN
        const entity = new Envio(123);
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
        const entity = new Envio();
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
