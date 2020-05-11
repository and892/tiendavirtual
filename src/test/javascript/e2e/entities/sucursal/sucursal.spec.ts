import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { SucursalComponentsPage, SucursalDeleteDialog, SucursalUpdatePage } from './sucursal.page-object';

const expect = chai.expect;

describe('Sucursal e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let sucursalComponentsPage: SucursalComponentsPage;
  let sucursalUpdatePage: SucursalUpdatePage;
  let sucursalDeleteDialog: SucursalDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Sucursals', async () => {
    await navBarPage.goToEntity('sucursal');
    sucursalComponentsPage = new SucursalComponentsPage();
    await browser.wait(ec.visibilityOf(sucursalComponentsPage.title), 5000);
    expect(await sucursalComponentsPage.getTitle()).to.eq('tiendavirtualApp.sucursal.home.title');
    await browser.wait(ec.or(ec.visibilityOf(sucursalComponentsPage.entities), ec.visibilityOf(sucursalComponentsPage.noResult)), 1000);
  });

  it('should load create Sucursal page', async () => {
    await sucursalComponentsPage.clickOnCreateButton();
    sucursalUpdatePage = new SucursalUpdatePage();
    expect(await sucursalUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.sucursal.home.createOrEditLabel');
    await sucursalUpdatePage.cancel();
  });

  it('should create and save Sucursals', async () => {
    const nbButtonsBeforeCreate = await sucursalComponentsPage.countDeleteButtons();

    await sucursalComponentsPage.clickOnCreateButton();

    await promise.all([sucursalUpdatePage.setNombreInput('nombre'), sucursalUpdatePage.setDireccionInput('direccion')]);

    expect(await sucursalUpdatePage.getNombreInput()).to.eq('nombre', 'Expected Nombre value to be equals to nombre');
    expect(await sucursalUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');

    await sucursalUpdatePage.save();
    expect(await sucursalUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await sucursalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Sucursal', async () => {
    const nbButtonsBeforeDelete = await sucursalComponentsPage.countDeleteButtons();
    await sucursalComponentsPage.clickOnLastDeleteButton();

    sucursalDeleteDialog = new SucursalDeleteDialog();
    expect(await sucursalDeleteDialog.getDialogTitle()).to.eq('tiendavirtualApp.sucursal.delete.question');
    await sucursalDeleteDialog.clickOnConfirmButton();

    expect(await sucursalComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
