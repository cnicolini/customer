import { browser, by, element, until } from 'protractor';

export class CustomersPage {

  public title = 'Customers';

  navigateTo() {
    return browser.get('/customer');
  }

  getPageTitleText() {
    return element(by.css('app-customers h2')).getText();
  }

  getCustomerList() {
    return element.all(by.css('.customerName'));
  }

  clickAddButton() {
    element(by.id('add')).click();
  }
}
