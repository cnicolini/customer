import { browser, by, element, until } from 'protractor';

export class CustomerDetailPage {

  public title = 'Details';

  private id: string;

  navigateTo(id: string) {
    this.id = id;
    return browser.get(`/customer/${this.id}`);
  }

  getPageTitleText() {
    return element(by.css('app-customer-detail h2')).getText();
  }

  getName() {
    return element(by.id('name'));
  }

  setName(name: string) {
      this.getName().sendKeys(name);
  }

  getAddress() {
    return element(by.id('address'));
  }

  getCustomerId() {
    return element(by.id('customer-id'));
  }

  setAddress(address: string) {
    this.getAddress().sendKeys(address);
  }

  clickSaveButton() {
    element(by.id('save')).click();
  }

}
