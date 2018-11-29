import { browser, by, element, until } from 'protractor';

export class CustomerDetailPage {

  public title = 'Details';

  private id: string;

  navigateTo(id: string) {
    this.id = id;
    return browser.get(`http://localhost:4200/customer/${this.id}`);
  }

  getPageTitleText() {
    return element(by.css('app-customer-detail h2')).getText();
  }

  getName() {
    return element(by.id('name'));
  }

  getAddress() {
    return element(by.id('address'));
  }

  clickAddButton() {
    element(by.id('add')).click();
  }
}
