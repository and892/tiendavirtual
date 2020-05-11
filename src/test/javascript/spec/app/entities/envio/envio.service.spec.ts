import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { EnvioService } from 'app/entities/envio/envio.service';
import { IEnvio, Envio } from 'app/shared/model/envio.model';

describe('Service Tests', () => {
  describe('Envio Service', () => {
    let injector: TestBed;
    let service: EnvioService;
    let httpMock: HttpTestingController;
    let elemDefault: IEnvio;
    let expectedResult: IEnvio | IEnvio[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(EnvioService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Envio(0, 'AAAAAAA', currentDate, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            detalles: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Envio', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            detalles: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            detalles: currentDate
          },
          returnedFromService
        );

        service.create(new Envio()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Envio', () => {
        const returnedFromService = Object.assign(
          {
            fecha: 'BBBBBB',
            detalles: currentDate.format(DATE_TIME_FORMAT),
            codigoLocalizacion: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            detalles: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Envio', () => {
        const returnedFromService = Object.assign(
          {
            fecha: 'BBBBBB',
            detalles: currentDate.format(DATE_TIME_FORMAT),
            codigoLocalizacion: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            detalles: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Envio', () => {
        service.delete(123).subscribe(resp => (expectedResult = resp.ok));

        const req = httpMock.expectOne({ method: 'DELETE' });
        req.flush({ status: 200 });
        expect(expectedResult);
      });
    });

    afterEach(() => {
      httpMock.verify();
    });
  });
});
