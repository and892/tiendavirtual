import { browser, ExpectedConditions as ec /* , promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProductoPedidoComponentsPage,
  /* ProductoPedidoDeleteDialog, */
  ProductoPedidoUpdatePage
} from './producto-pedido.page-object';

const expect = chai.expect;

describe('ProductoPedido e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productoPedidoComponentsPage: ProductoPedidoComponentsPage;
  let productoPedidoUpdatePage: ProductoPedidoUpdatePage;
  /* let productoPedidoDeleteDialog: ProductoPedidoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductoPedidos', async () => {
    await navBarPage.goToEntity('producto-pedido');
    productoPedidoComponentsPage = new ProductoPedidoComponentsPage();
    await browser.wait(ec.visibilityOf(productoPedidoComponentsPage.title), 5000);
    expect(await productoPedidoComponentsPage.getTitle()).to.eq('tiendavirtualApp.productoPedido.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(productoPedidoComponentsPage.entities), ec.visibilityOf(productoPedidoComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProductoPedido page', async () => {
    await productoPedidoComponentsPage.clickOnCreateButton();
    productoPedidoUpdatePage = new ProductoPedidoUpdatePage();
    expect(await productoPedidoUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.productoPedido.home.createOrEditLabel');
    await productoPedidoUpdatePage.cancel();
  });

  /* it('should create and save ProductoPedidos', async () => {
        const nbButtonsBeforeCreate = await productoPedidoComponentsPage.countDeleteButtons();

        await productoPedidoComponentsPage.clickOnCreateButton();

        await promise.all([
            productoPedidoUpdatePage.setCantidadInput('5'),
            productoPedidoUpdatePage.setPrecioTotalInput('5'),
            productoPedidoUpdatePage.estadoSelectLastOption(),
            productoPedidoUpdatePage.productoSelectLastOption(),
            productoPedidoUpdatePage.pedidoSelectLastOption(),
        ]);

        expect(await productoPedidoUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');
        expect(await productoPedidoUpdatePage.getPrecioTotalInput()).to.eq('5', 'Expected precioTotal value to be equals to 5');

        await productoPedidoUpdatePage.save();
        expect(await productoPedidoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await productoPedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last ProductoPedido', async () => {
        const nbButtonsBeforeDelete = await productoPedidoComponentsPage.countDeleteButtons();
        await productoPedidoComponentsPage.clickOnLastDeleteButton();

        productoPedidoDeleteDialog = new ProductoPedidoDeleteDialog();
        expect(await productoPedidoDeleteDialog.getDialogTitle())
            .to.eq('tiendavirtualApp.productoPedido.delete.question');
        await productoPedidoDeleteDialog.clickOnConfirmButton();

        expect(await productoPedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
