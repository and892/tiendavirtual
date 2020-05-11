import { browser, ExpectedConditions as ec, protractor, promise } from 'protractor';
import { NavBarPage, SignInPage } from '../../page-objects/jhi-page-objects';

import { EnvioComponentsPage, EnvioDeleteDialog, EnvioUpdatePage } from './envio.page-object';

const expect = chai.expect;

describe('Envio e2e test', () => {
  let navBarPage: NavBarPage;
  let signInPage: SignInPage;
  let envioComponentsPage: EnvioComponentsPage;
  let envioUpdatePage: EnvioUpdatePage;
  let envioDeleteDialog: EnvioDeleteDialog;

  before(async () => {
    await browser.get('/');
    navBarPage = new NavBarPage();
    signInPage = await navBarPage.getSignInPage();
    await signInPage.autoSignInUsing('admin', 'admin');
    await browser.wait(ec.visibilityOf(navBarPage.entityMenu), 5000);
  });

  it('should load Envios', async () => {
    await navBarPage.goToEntity('envio');
    envioComponentsPage = new EnvioComponentsPage();
    await browser.wait(ec.visibilityOf(envioComponentsPage.title), 5000);
    expect(await envioComponentsPage.getTitle()).to.eq('tiendavirtualApp.envio.home.title');
    await browser.wait(ec.or(ec.visibilityOf(envioComponentsPage.entities), ec.visibilityOf(envioComponentsPage.noResult)), 1000);
  });

  it('should load create Envio page', async () => {
    await envioComponentsPage.clickOnCreateButton();
    envioUpdatePage = new EnvioUpdatePage();
    expect(await envioUpdatePage.getPageTitle()).to.eq('tiendavirtualApp.envio.home.createOrEditLabel');
    await envioUpdatePage.cancel();
  });

  it('should create and save Envios', async () => {
    const nbButtonsBeforeCreate = await envioComponentsPage.countDeleteButtons();

    await envioComponentsPage.clickOnCreateButton();

    await promise.all([
      envioUpdatePage.setFechaInput('fecha'),
      envioUpdatePage.setDetallesInput('01/01/2001' + protractor.Key.TAB + '02:30AM'),
      envioUpdatePage.setCodigoLocalizacionInput('codigoLocalizacion'),
      envioUpdatePage.facturaSelectLastOption()
    ]);

    expect(await envioUpdatePage.getFechaInput()).to.eq('fecha', 'Expected Fecha value to be equals to fecha');
    expect(await envioUpdatePage.getDetallesInput()).to.contain('2001-01-01T02:30', 'Expected detalles value to be equals to 2000-12-31');
    expect(await envioUpdatePage.getCodigoLocalizacionInput()).to.eq(
      'codigoLocalizacion',
      'Expected CodigoLocalizacion value to be equals to codigoLocalizacion'
    );

    await envioUpdatePage.save();
    expect(await envioUpdatePage.getSaveButton().isPresent(), 'Expected save button disappear').to.be.false;

    expect(await envioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeCreate + 1, 'Expected one more entry in the table');
  });

  it('should delete last Envio', async () => {
    const nbButtonsBeforeDelete = await envioComponentsPage.countDeleteButtons();
    await envioComponentsPage.clickOnLastDeleteButton();

    envioDeleteDialog = new EnvioDeleteDialog();
    expect(await envioDeleteDialog.getDialogTitle()).to.eq('tiendavirtualApp.envio.delete.question');
    await envioDeleteDialog.clickOnConfirmButton();

    expect(await envioComponentsPage.countDeleteButtons()).to.eq(nbButtonsBeforeDelete - 1);
  });

  after(async () => {
    await navBarPage.autoSignOut();
  });
});
