import { element, by, ElementFinder } from 'protractor';

export class ClienteComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-cliente div table .btn-danger'));
  title = element.all(by.css('jhi-cliente div h2#page-heading span')).first();
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

export class ClienteUpdatePage {
  pageTitle = element(by.id('jhi-cliente-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreCompletoInput = element(by.id('field_nombreCompleto'));
  apellidoCompletoInput = element(by.id('field_apellidoCompleto'));
  generoSelect = element(by.id('field_genero'));
  correoInput = element(by.id('field_correo'));
  telefonoInput = element(by.id('field_telefono'));
  direccionInput = element(by.id('field_direccion'));
  ciudadInput = element(by.id('field_ciudad'));

  userSelect = element(by.id('field_user'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreCompletoInput(nombreCompleto: string): Promise<void> {
    await this.nombreCompletoInput.sendKeys(nombreCompleto);
  }

  async getNombreCompletoInput(): Promise<string> {
    return await this.nombreCompletoInput.getAttribute('value');
  }

  async setApellidoCompletoInput(apellidoCompleto: string): Promise<void> {
    await this.apellidoCompletoInput.sendKeys(apellidoCompleto);
  }

  async getApellidoCompletoInput(): Promise<string> {
    return await this.apellidoCompletoInput.getAttribute('value');
  }

  async setGeneroSelect(genero: string): Promise<void> {
    await this.generoSelect.sendKeys(genero);
  }

  async getGeneroSelect(): Promise<string> {
    return await this.generoSelect.element(by.css('option:checked')).getText();
  }

  async generoSelectLastOption(): Promise<void> {
    await this.generoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setCorreoInput(correo: string): Promise<void> {
    await this.correoInput.sendKeys(correo);
  }

  async getCorreoInput(): Promise<string> {
    return await this.correoInput.getAttribute('value');
  }

  async setTelefonoInput(telefono: string): Promise<void> {
    await this.telefonoInput.sendKeys(telefono);
  }

  async getTelefonoInput(): Promise<string> {
    return await this.telefonoInput.getAttribute('value');
  }

  async setDireccionInput(direccion: string): Promise<void> {
    await this.direccionInput.sendKeys(direccion);
  }

  async getDireccionInput(): Promise<string> {
    return await this.direccionInput.getAttribute('value');
  }

  async setCiudadInput(ciudad: string): Promise<void> {
    await this.ciudadInput.sendKeys(ciudad);
  }

  async getCiudadInput(): Promise<string> {
    return await this.ciudadInput.getAttribute('value');
  }

  async userSelectLastOption(): Promise<void> {
    await this.userSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async userSelectOption(option: string): Promise<void> {
    await this.userSelect.sendKeys(option);
  }

  getUserSelect(): ElementFinder {
    return this.userSelect;
  }

  async getUserSelectedOption(): Promise<string> {
    return await this.userSelect.element(by.css('option:checked')).getText();
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

export class ClienteDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-cliente-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-cliente'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
