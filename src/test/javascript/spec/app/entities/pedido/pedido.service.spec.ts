import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { PedidoService } from 'app/entities/pedido/pedido.service';
import { IPedido, Pedido } from 'app/shared/model/pedido.model';
import { PedidoEstado } from 'app/shared/model/enumerations/pedido-estado.model';

describe('Service Tests', () => {
  describe('Pedido Service', () => {
    let injector: TestBed;
    let service: PedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IPedido;
    let expectedResult: IPedido | IPedido[] | boolean | null;
    let currentDate: moment.Moment;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(PedidoService);
      httpMock = injector.get(HttpTestingController);
      currentDate = moment();

      elemDefault = new Pedido(0, currentDate, PedidoEstado.COMPLETADO, 'AAAAAAA');
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a Pedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0,
            fechaPedido: currentDate.format(DATE_TIME_FORMAT)
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPedido: currentDate
          },
          returnedFromService
        );

        service.create(new Pedido()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a Pedido', () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
            codigoPedido: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPedido: currentDate
          },
          returnedFromService
        );

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of Pedido', () => {
        const returnedFromService = Object.assign(
          {
            fechaPedido: currentDate.format(DATE_TIME_FORMAT),
            estado: 'BBBBBB',
            codigoPedido: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign(
          {
            fechaPedido: currentDate
          },
          returnedFromService
        );

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a Pedido', () => {
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
