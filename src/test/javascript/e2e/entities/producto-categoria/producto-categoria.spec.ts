import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import {
  ProductoCategoriaComponentsPage,
  ProductoCategoriaDeleteDialog,
  ProductoCategoriaUpdatePage
} from './producto-categoria.page-object';

const expect = chai.expect;

describe('ProductoCategoria e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let productoCategoriaComponentsPage: ProductoCategoriaComponentsPage;
  let productoCategoriaUpdatePage: ProductoCategoriaUpdatePage;
  let productoCategoriaDeleteDialog: ProductoCategoriaDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load ProductoCategorias', async () => {
    await navBarPage.goToEntity('producto-categoria');
    productoCategoriaComponentsPage = new ProductoCategoriaComponentsPage();
    await browser.wait(ec.visibilityOf(productoCategoriaComponentsPage.title), 5000);
    expect(await productoCategoriaComponentsPage.getTitle()).to.eq('tiendavirtualApp.productoCategoria.home.title');
    await browser.wait(
      ec.or(ec.visibilityOf(productoCategoriaComponentsPage.entities), ec.visibilityOf(productoCategoriaComponentsPage.noResult)),
      1000
    );
  });

  it('should load create ProductoCategoria page', async () => {
    await productoCategoriaComponentsPage.clickOnCreateButton();
    productoCategoriaUpdatePage = new ProductoCategoriaUpdatePage();
    expect(await productoCategoriaUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.productoCategoria.home.createOrEditLabel');
    await productoCategoriaUpdatePage.cancel();
  });

  it('should create and save ProductoCategorias', async () => {
    const nbButtonsBeforeCreate = await productoCategoriaComponentsPage.countDeleteButtons();

    await productoCategoriaComponentsPage.clickOnCreateButton();

    await promise.all([
      productoCategoriaUpdatePage.setNombreInput('nombre'),
      productoCategoriaUpdatePage.setDescripcionInput('descripcion')
    ]);

    expect(await productoCategoriaUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await productoCategoriaUpdatePage.getDescripcionInput()).to.eq(
      'descripcion',
      'Expected Descripcion value to be equals to descripcion'
    );

    await productoCategoriaUpdatePage.save();
    expect(await productoCategoriaUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await productoCategoriaComponentsPage.countDeleteButtons()).to.eq(
      nbButtonsBeforeCreate + 1,
      'Expected one more entry in the table'
    );
  });

  it('should delete last ProductoCategoria', async () => {
    const nbButtonsBeforeDelete = await productoCategoriaComponentsPage.countDeleteButtons();
    await productoCategoriaComponentsPage.clickOnLastDeleteButton();

    productoCategoriaDeleteDialog = new ProductoCategoriaDeleteDialog();
    expect(await productoCategoriaDeleteDialog.getDialogTitle()).to.eq('tiendavirtualApp.productoCategoria.delete.question');
    await productoCategoriaDeleteDialog.clickOnConfirmButton();

    expect(await productoCategoriaComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
