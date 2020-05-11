import { browser, ExpectedConditions as ec, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { ClienteComponentsPage, ClienteDeleteDialog, ClienteUpdatePage } from './cliente.page-object';

const expect = chai.expect;

describe('Cliente e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let clienteComponentsPage: ClienteComponentsPage;
  let clienteUpdatePage: ClienteUpdatePage;
  let clienteDeleteDialog: ClienteDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Clientes', async () => {
    await navBarPage.goToEntity('cliente');
    clienteComponentsPage = new ClienteComponentsPage();
    await browser.wait(ec.visibilityOf(clienteComponentsPage.title), 5000);
    expect(await clienteComponentsPage.getTitle()).to.eq('tiendavirtualApp.cliente.home.title');
    await browser.wait(ec.or(ec.visibilityOf(clienteComponentsPage.entities), ec.visibilityOf(clienteComponentsPage.noResult)), 1000);
  });

  it('should load create Cliente page', async () => {
    await clienteComponentsPage.clickOnCreateButton();
    clienteUpdatePage = new ClienteUpdatePage();
    expect(await clienteUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.cliente.home.createOrEditLabel');
    await clienteUpdatePage.cancel();
  });

  it('should create and save Clientes', async () => {
    const nbButtonsBeforeCreate = await clienteComponentsPage.countDeleteButtons();

    await clienteComponentsPage.clickOnCreateButton();

    await promise.all([
      clienteUpdatePage.setNombreCompletoInput('nombreCompleto'),
      clienteUpdatePage.setApellidoCompletoInput('apellidoCompleto'),
      clienteUpdatePage.generoSelectLastOption(),
      clienteUpdatePage.setCorreoInput('Z@@@@@ .oWYChi'),
      clienteUpdatePage.setTelefonoInput('telefono'),
      clienteUpdatePage.setDireccionInput('direccion'),
      clienteUpdatePage.setCiudadInput('ciudad'),
      clienteUpdatePage.userSelectLastOption()
    ]);

    expect(await clienteUpdatePage.getNombreCompletoInput()).to.eq(
      'nombreCompleto',
      'Expected NombreCompleto value to be equals to nombreCompleto'
    );
    expect(await clienteUpdatePage.getApellidoCompletoInput()).to.eq(
      'apellidoCompleto',
      'Expected ApellidoCompleto value to be equals to apellidoCompleto'
    );
    expect(await clienteUpdatePage.getCorreoInput()).to.eq('Z@@@@@ .oWYChi', 'Expected Correo value to be equals to Z@@@@@ .oWYChi');
    expect(await clienteUpdatePage.getTelefonoInput()).to.eq('telefono', 'Expected Telefono value to be equals to telefono');
    expect(await clienteUpdatePage.getDireccionInput()).to.eq('direccion', 'Expected Direccion value to be equals to direccion');
    expect(await clienteUpdatePage.getCiudadInput()).to.eq('ciudad', 'Expected Ciudad value to be equals to ciudad');

    await clienteUpdatePage.save();
    expect(await clienteUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Cliente', async () => {
    const nbButtonsBeforeDelete = await clienteComponentsPage.countDeleteButtons();
    await clienteComponentsPage.clickOnLastDeleteButton();

    clienteDeleteDialog = new ClienteDeleteDialog();
    expect(await clienteDeleteDialog.getDialogTitle()).to.eq('tiendavirtualApp.cliente.delete.question');
    await clienteDeleteDialog.clickOnConfirmButton();

    expect(await clienteComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
