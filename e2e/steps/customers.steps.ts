import { defineSupportCode } from 'cucumber';

import { CustomersPage } from '../src/customers.po';

defineSupportCode(({Given, When, Then}) => {

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  var expect = chai.expect;

  const page: CustomersPage = new CustomersPage();

  Given('I am in the customers page', () => {
    page.navigateTo();
    return expect(page.getPageTitleText()).to.eventually.equal(page.title);
  });

  Then('I should see a list of customers', () => {
    // return expect(page.getCustomerList()).to.eventually.have.lengthOf(4);
    return expect(page.getCustomerList().count()).to.eventually.be.above(0);
  });

  When('I click on the add button', function () {
    page.clickAddButton();
  });

  Then('I am redirected back to the customers page', function() {
    return expect(page.getPageTitleText()).to.eventually.equal(page.title);
  });

  Then('the new customer is visualized in the list of customers', function () {
  });

});
