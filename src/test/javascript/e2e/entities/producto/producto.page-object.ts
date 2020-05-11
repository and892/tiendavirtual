import { element, by, ElementFinder } from 'protractor';

export class ProductoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-producto div table .btn-danger'));
  title = element.all(by.css('jhi-producto div h2#page-heading span')).first();
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

export class ProductoUpdatePage {
  pageTitle = element(by.id('jhi-producto-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  nombreInput = element(by.id('field_nombre'));
  descripcionInput = element(by.id('field_descripcion'));
  precioInput = element(by.id('field_precio'));
  tallaSelect = element(by.id('field_talla'));
  imageInput = element(by.id('file_image'));

  productoCatergoriaSelect = element(by.id('field_productoCatergoria'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setNombreInput(nombre: string): Promise<void> {
    await this.nombreInput.sendKeys(nombre);
  }

  async getNombreInput(): Promise<string> {
    return await this.nombreInput.getAttribute('value');
  }

  async setDescripcionInput(descripcion: string): Promise<void> {
    await this.descripcionInput.sendKeys(descripcion);
  }

  async getDescripcionInput(): Promise<string> {
    return await this.descripcionInput.getAttribute('value');
  }

  async setPrecioInput(precio: string): Promise<void> {
    await this.precioInput.sendKeys(precio);
  }

  async getPrecioInput(): Promise<string> {
    return await this.precioInput.getAttribute('value');
  }

  async setTallaSelect(talla: string): Promise<void> {
    await this.tallaSelect.sendKeys(talla);
  }

  async getTallaSelect(): Promise<string> {
    return await this.tallaSelect.element(by.css('option:checked')).getText();
  }

  async tallaSelectLastOption(): Promise<void> {
    await this.tallaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setImageInput(image: string): Promise<void> {
    await this.imageInput.sendKeys(image);
  }

  async getImageInput(): Promise<string> {
    return await this.imageInput.getAttribute('value');
  }

  async productoCatergoriaSelectLastOption(): Promise<void> {
    await this.productoCatergoriaSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productoCatergoriaSelectOption(option: string): Promise<void> {
    await this.productoCatergoriaSelect.sendKeys(option);
  }

  getProductoCatergoriaSelect(): ElementFinder {
    return this.productoCatergoriaSelect;
  }

  async getProductoCatergoriaSelectedOption(): Promise<string> {
    return await this.productoCatergoriaSelect.element(by.css('option:checked')).getText();
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

export class ProductoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-producto-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-producto'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
