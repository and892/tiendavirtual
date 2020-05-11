import { browser, ExpectedConditions as ec /* , protractor, promise */ } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  PedidoComponentsPage,
  /* PedidoDeleteDialog, */
  PedidoUpdatePage
} from './pedido.page-object';

const expect = chai.expect;

describe('Pedido e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let pedidoComponentsPage: PedidoComponentsPage;
  let pedidoUpdatePage: PedidoUpdatePage;
  /* let pedidoDeleteDialog: PedidoDeleteDialog; */

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Pedidos', async () => {
    await navBarPage.goToEntity('pedido');
    pedidoComponentsPage = new PedidoComponentsPage();
    await browser.wait(ec.visibilityOf(pedidoComponentsPage.title), 5000);
    expect(await pedidoComponentsPage.getTitle()).to.eq('tiendavirtualApp.pedido.home.title');
    await browser.wait(ec.or(ec.visibilityOf(pedidoComponentsPage.entities), ec.visibilityOf(pedidoComponentsPage.noResult)), 1000);
  });

  it('should load create Pedido page', async () => {
    await pedidoComponentsPage.clickOnCreateButton();
    pedidoUpdatePage = new PedidoUpdatePage();
    expect(await pedidoUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.pedido.home.createOrEditLabel');
    await pedidoUpdatePage.cancel();
  });

  /* it('should create and save Pedidos', async () => {
        const nbButtonsBeforeCreate = await pedidoComponentsPage.countDeleteButtons();

        await pedidoComponentsPage.clickOnCreateButton();

        await promise.all([
            pedidoUpdatePage.setFechaPedidoInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
            pedidoUpdatePage.estadoSelectLastOption(),
            pedidoUpdatePage.setCodigoPedidoInput('codigoPedido'),
            pedidoUpdatePage.clienteSelectLastOption(),
            pedidoUpdatePage.productoPedidoSelectLastOption(),
        ]);

        expect(await pedidoUpdatePage.getFechaPedidoInput()).to.contain('2001-01-01T02:30', 'Expected fechaPedido value to be equals to 2000-12-31');
        expect(await pedidoUpdatePage.getCodigoPedidoInput()).to.eq('codigoPedido', 'Expected CodigoPedido value to be equals to codigoPedido');

        await pedidoUpdatePage.save();
        expect(await pedidoUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

        expect(await pedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
    }); */

  /* it('should delete last Pedido', async () => {
        const nbButtonsBeforeDelete = await pedidoComponentsPage.countDeleteButtons();
        await pedidoComponentsPage.clickOnLastDeleteButton();

        pedidoDeleteDialog = new PedidoDeleteDialog();
        expect(await pedidoDeleteDialog.getDialogTitle())
            .to.eq('tiendavirtualApp.pedido.delete.question');
        await pedidoDeleteDialog.clickOnConfirmButton();

        expect(await pedidoComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
    }); */

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
