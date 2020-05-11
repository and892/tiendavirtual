import { element, by, ElementFinder } from 'protractor';

export class PedidoComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-pedido div table .btn-danger'));
  title = element.all(by.css('jhi-pedido div h2#page-heading span')).first();
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

export class PedidoUpdatePage {
  pageTitle = element(by.id('jhi-pedido-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fechaPedidoInput = element(by.id('field_fechaPedido'));
  estadoSelect = element(by.id('field_estado'));
  codigoPedidoInput = element(by.id('field_codigoPedido'));

  clienteSelect = element(by.id('field_cliente'));
  productoPedidoSelect = element(by.id('field_productoPedido'));

  async getPageTitle(): Promise<string> {
    return this.pageTitle.getAttribute('jhiTranslate');
  }

  async setFechaPedidoInput(fechaPedido: string): Promise<void> {
    await this.fechaPedidoInput.sendKeys(fechaPedido);
  }

  async getFechaPedidoInput(): Promise<string> {
    return await this.fechaPedidoInput.getAttribute('value');
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

  async setCodigoPedidoInput(codigoPedido: string): Promise<void> {
    await this.codigoPedidoInput.sendKeys(codigoPedido);
  }

  async getCodigoPedidoInput(): Promise<string> {
    return await this.codigoPedidoInput.getAttribute('value');
  }

  async clienteSelectLastOption(): Promise<void> {
    await this.clienteSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async clienteSelectOption(option: string): Promise<void> {
    await this.clienteSelect.sendKeys(option);
  }

  getClienteSelect(): ElementFinder {
    return this.clienteSelect;
  }

  async getClienteSelectedOption(): Promise<string> {
    return await this.clienteSelect.element(by.css('option:checked')).getText();
  }

  async productoPedidoSelectLastOption(): Promise<void> {
    await this.productoPedidoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async productoPedidoSelectOption(option: string): Promise<void> {
    await this.productoPedidoSelect.sendKeys(option);
  }

  getProductoPedidoSelect(): ElementFinder {
    return this.productoPedidoSelect;
  }

  async getProductoPedidoSelectedOption(): Promise<string> {
    return await this.productoPedidoSelect.element(by.css('option:checked')).getText();
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

export class PedidoDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-pedido-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-pedido'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
