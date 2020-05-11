import { element, by, ElementFinder } from 'protractor';

export class StockComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-stock div table .btn-danger'));
  title = element.all(by.css('jhi-stock div h2#page-heading span')).first();
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

export class StockUpdatePage {
  pageTitle = element(by.id('jhi-stock-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cantidadInput = element(by.id('field_cantidad'));

  productoSelect = element(by.id('field_producto'));
  sucursalSelect = element(by.id('field_sucursal'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async productoSelectLastOption(): Promise<void> {
    await this.productoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productoSelectOption(option: string): Promise<void> {
    await this.productoSelect.sendKeys(option);
  }

  getProductoSelect(): ElementFinder {
    return this.productoSelect;
  }

  async getProductoSelectedOption(): Promise<string> {
    return await this.productoSelect.element(by.css('option:checked')).getText();
  }

  async sucursalSelectLastOption(): Promise<void> {
    await this.sucursalSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async sucursalSelectOption(option: string): Promise<void> {
    await this.sucursalSelect.sendKeys(option);
  }

  getSucursalSelect(): ElementFinder {
    return this.sucursalSelect;
  }

  async getSucursalSelectedOption(): Promise<string> {
    return await this.sucursalSelect.element(by.css('option:checked')).getText();
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

export class StockDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-stock-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-stock'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
