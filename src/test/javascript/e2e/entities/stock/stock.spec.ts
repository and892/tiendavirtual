import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { StockComponentsPage, StockDeleteDialog, StockUpdatePage } from './stock.page-object';

const expect = chai.expect;

describe('Stock e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let stockComponentsPage: StockComponentsPage;
  let stockUpdatePage: StockUpdatePage;
  let stockDeleteDialog: StockDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Stocks', async () => {
    await navBarPage.goToEntity('stock');
    stockComponentsPage = new StockComponentsPage();
    await browser.wait(ec.visibilityOf(stockComponentsPage.title), 5000);
    expect(await stockComponentsPage.getTitle()).to.eq('tiendavirtualApp.stock.home.title');
    await browser.wait(ec.or(ec.visibilityOf(stockComponentsPage.entities), ec.visibilityOf(stockComponentsPage.noResult)), 1000);
  });

  it('should load create Stock page', async () => {
    await stockComponentsPage.clickOnCreateButton();
    stockUpdatePage = new StockUpdatePage();
    expect(await stockUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.stock.home.createOrEditLabel');
    await stockUpdatePage.cancel();
  });

  it('should create and save Stocks', async () => {
    const nbButtonsBeforeCreate = await stockComponentsPage.countDeleteButtons();

    await stockComponentsPage.clickOnCreateButton();

    await promise.all([
      stockUpdatePage.setCantidadInput('5'),
      stockUpdatePage.productoSelectLastOption(),
      stockUpdatePage.sucursalSelectLastOption()
    ]);

    expect(await stockUpdatePage.getCantidadInput()).to.eq('5', 'Expected cantidad value to be equals to 5');

    await stockUpdatePage.save();
    expect(await stockUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await stockComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Stock', async () => {
    const nbButtonsBeforeDelete = await stockComponentsPage.countDeleteButtons();
    await stockComponentsPage.clickOnLastDeleteButton();

    stockDeleteDialog = new StockDeleteDialog();
    expect(await stockDeleteDialog.getDialogTitle()).to.eq('tiendavirtualApp.stock.delete.question');
    await stockDeleteDialog.clickOnConfirmButton();

    expect(await stockComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
