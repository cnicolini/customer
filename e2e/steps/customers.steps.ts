import { defineSupportCode } from 'cucumber';

import { CustomersPage } from '../src/customers.po';
import { CustomerDetailPage } from '../src/customer-detail.po';

defineSupportCode(({Given, When, Then}) => {

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  var expect = chai.expect;

  const page: CustomersPage = new CustomersPage();
  const detailPage: CustomerDetailPage = new CustomerDetailPage();

  When('I navigate to the customers page', () => {
    page.navigateTo();
    return expect(page.getPageTitleText()).to.eventually.equal(page.title);
  });

  Then('I should see a list of customers', () => {
    // return expect(page.getCustomerList()).to.eventually.have.lengthOf(4);
    return expect(page.getCustomerList().count()).to.eventually.be.above(0);
  });

  Given('I am in the customers page', function () {
    return expect(page.getPageTitleText()).to.eventually.equal("Customers");
  });

  When('I click on the add button', function () {
    page.clickAddButton();
  });

  Then('I navigate to the details page', function () {
    return expect(detailPage.getPageTitleText()).to.eventually.equal(detailPage.title);
  });

  Then('the field name is empty', function () {
    return expect(detailPage.getName().getAttribute('value')).to.eventually.equal('');
  });

  Then('the field address is empty', function () {
    return expect(detailPage.getAddress().getAttribute('value')).to.eventually.equal('');
  });

});
