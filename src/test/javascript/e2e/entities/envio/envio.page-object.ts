import { element, by, ElementFinder } from 'protractor';

export class EnvioComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-envio div table .btn-danger'));
  title = element.all(by.css('jhi-envio div h2#page-heading span')).first();
  noResult = element(by.id('no-result'));
  entities = element(by.id('entities'));

  async clickOnCreateButton(): Promise<void> {
    await this.createButton.click();
  }

  async clickOnLastDeleteButton(): Promise<void> {
    await this.deleteButtons.last().click();
  }

  async countDeleteButtons(): Promise<number> {
    return this.deleteButtons.count();
  }

  async getTitle(): Promise<string> {
    return this.title.getAttribute('jhiTranslate');
  }
}

export class EnvioUpdatePage {
  pageTitle = element(by.id('jhi-envio-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fechaInput = element(by.id('field_fecha'));
  detallesInput = element(by.id('field_detalles'));
  codigoLocalizacionInput = element(by.id('field_codigoLocalizacion'));

  facturaSelect = element(by.id('field_factura'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFechaInput(fecha: string): Promise<void> {
    await this.fechaInput.sendKeys(fecha);
  }

  async getFechaInput(): Promise<string> {
    return await this.fechaInput.getAttribute('value');
  }

  async setDetallesInput(detalles: string): Promise<void> {
    await this.detallesInput.sendKeys(detalles);
  }

  async getDetallesInput(): Promise<string> {
    return await this.detallesInput.getAttribute('value');
  }

  async setCodigoLocalizacionInput(codigoLocalizacion: string): Promise<void> {
    await this.codigoLocalizacionInput.sendKeys(codigoLocalizacion);
  }

  async getCodigoLocalizacionInput(): Promise<string> {
    return await this.codigoLocalizacionInput.getAttribute('value');
  }

  async facturaSelectLastOption(): Promise<void> {
    await this.facturaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async facturaSelectOption(option: string): Promise<void> {
    await this.facturaSelect.sendKeys(option);
  }

  getFacturaSelect(): ElementFinder {
    return this.facturaSelect;
  }

  async getFacturaSelectedOption(): Promise<string> {
    return await this.facturaSelect.element(by.css('option:checked')).getText();
  }

  async save(): Promise<void> {
    await this.saveButton.click();
  }

  async cancel(): Promise<void> {
    await this.cancelButton.click();
  }

  getSaveButton(): ElementFinder {
    return this.saveButton;
  }
}

export class EnvioDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-envio-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-envio'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
