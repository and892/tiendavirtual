import { element, by, ElementFinder } from 'protractor';

export class ProductoPedidoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-producto-pedido div table .btn-danger'));
  title = element.all(by.css('jhi-producto-pedido div h2#page-heading span')).first();
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

export class ProductoPedidoUpdatePage {
  pageTitle = element(by.id('jhi-producto-pedido-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  cantidadInput = element(by.id('field_cantidad'));
  precioTotalInput = element(by.id('field_precioTotal'));
  estadoSelect = element(by.id('field_estado'));

  productoSelect = element(by.id('field_producto'));
  pedidoSelect = element(by.id('field_pedido'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setCantidadInput(cantidad: string): Promise<void> {
    await this.cantidadInput.sendKeys(cantidad);
  }

  async getCantidadInput(): Promise<string> {
    return await this.cantidadInput.getAttribute('value');
  }

  async setPrecioTotalInput(precioTotal: string): Promise<void> {
    await this.precioTotalInput.sendKeys(precioTotal);
  }

  async getPrecioTotalInput(): Promise<string> {
    return await this.precioTotalInput.getAttribute('value');
  }

  async setEstadoSelect(estado: string): Promise<void> {
    await this.estadoSelect.sendKeys(estado);
  }

  async getEstadoSelect(): Promise<string> {
    return await this.estadoSelect.element(by.css('option:checked')).getText();
  }

  async estadoSelectLastOption(): Promise<void> {
    await this.estadoSelect
      .all(by.tagName('option'))
      .last()
      .click();
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

  async pedidoSelectLastOption(): Promise<void> {
    await this.pedidoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async pedidoSelectOption(option: string): Promise<void> {
    await this.pedidoSelect.sendKeys(option);
  }

  getPedidoSelect(): ElementFinder {
    return this.pedidoSelect;
  }

  async getPedidoSelectedOption(): Promise<string> {
    return await this.pedidoSelect.element(by.css('option:checked')).getText();
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

export class ProductoPedidoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-productoPedido-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-productoPedido'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
