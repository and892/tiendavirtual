import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ProductoPedidoService } from 'app/entities/producto-pedido/producto-pedido.service';
import { IProductoPedido, ProductoPedido } from 'app/shared/model/producto-pedido.model';
import { ProductoPedidoEstado } from 'app/shared/model/enumerations/producto-pedido-estado.model';

describe('Service Tests', () => {
  describe('ProductoPedido Service', () => {
    let injector: TestBed;
    let service: ProductoPedidoService;
    let httpMock: HttpTestingController;
    let elemDefault: IProductoPedido;
    let expectedResult: IProductoPedido | IProductoPedido[] | boolean | null;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      expectedResult = null;
      injector = getTestBed();
      service = injector.get(ProductoPedidoService);
      httpMock = injector.get(HttpTestingController);

      elemDefault = new ProductoPedido(0, 0, 0, ProductoPedidoEstado.DISPONIBLE);
    });

    describe('Service methods', () => {
      it('should find an element', () => {
        const returnedFromService = Object.assign({}, elemDefault);

        service.find(123).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(elemDefault);
      });

      it('should create a ProductoPedido', () => {
        const returnedFromService = Object.assign(
          {
            id: 0
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.create(new ProductoPedido()).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'POST' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should update a ProductoPedido', () => {
        const returnedFromService = Object.assign(
          {
            cantidad: 1,
            precioTotal: 1,
            estado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.update(expected).subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'PUT' });
        req.flush(returnedFromService);
        expect(expectedResult).toMatchObject(expected);
      });

      it('should return a list of ProductoPedido', () => {
        const returnedFromService = Object.assign(
          {
            cantidad: 1,
            precioTotal: 1,
            estado: 'BBBBBB'
          },
          elemDefault
        );

        const expected = Object.assign({}, returnedFromService);

        service.query().subscribe(resp => (expectedResult = resp.body));

        const req = httpMock.expectOne({ method: 'GET' });
        req.flush([returnedFromService]);
        httpMock.verify();
        expect(expectedResult).toContainEqual(expected);
      });

      it('should delete a ProductoPedido', () => {
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
