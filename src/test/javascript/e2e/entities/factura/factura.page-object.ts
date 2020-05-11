import { element, by, ElementFinder } from 'protractor';

export class FacturaComponentsPage {
  createButton = element(by.id('jh-create-entity'));
  deleteButtons = element.all(by.css('jhi-factura div table .btn-danger'));
  title = element.all(by.css('jhi-factura div h2#page-heading span')).first();
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

export class FacturaUpdatePage {
  pageTitle = element(by.id('jhi-factura-heading'));
  saveButton = element(by.id('save-entity'));
  cancelButton = element(by.id('cancel-save'));

  fechaInput = element(by.id('field_fecha'));
  detallesInput = element(by.id('field_detalles'));
  estadoSelect = element(by.id('field_estado'));
  metodoDePagoSelect = element(by.id('field_metodoDePago'));
  fechaDePagoInput = element(by.id('field_fechaDePago'));
  montoPagadoInput = element(by.id('field_montoPagado'));

  clienteSelect = element(by.id('field_cliente'));
  pedidoSelect = element(by.id('field_pedido'));

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

  async setMetodoDePagoSelect(metodoDePago: string): Promise<void> {
    await this.metodoDePagoSelect.sendKeys(metodoDePago);
  }

  async getMetodoDePagoSelect(): Promise<string> {
    return await this.metodoDePagoSelect.element(by.css('option:checked')).getText();
  }

  async metodoDePagoSelectLastOption(): Promise<void> {
    await this.metodoDePagoSelect
      .all(by.tagName('option'))
      .last()
      .click();
  }

  async setFechaDePagoInput(fechaDePago: string): Promise<void> {
    await this.fechaDePagoInput.sendKeys(fechaDePago);
  }

  async getFechaDePagoInput(): Promise<string> {
    return await this.fechaDePagoInput.getAttribute('value');
  }

  async setMontoPagadoInput(montoPagado: string): Promise<void> {
    await this.montoPagadoInput.sendKeys(montoPagado);
  }

  async getMontoPagadoInput(): Promise<string> {
    return await this.montoPagadoInput.getAttribute('value');
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

export class FacturaDeleteDialog {
  private dialogTitle = element(by.id('jhi-delete-factura-heading'));
  private confirmButton = element(by.id('jhi-confirm-delete-factura'));

  async getDialogTitle(): Promise<string> {
    return this.dialogTitle.getAttribute('jhiTranslate');
  }

  async clickOnConfirmButton(): Promise<void> {
    await this.confirmButton.click();
  }
}
