import { defineSupportCode } from 'cucumber';

import { CustomerDetailPage } from '../src/customer-detail.po';

defineSupportCode(({Given, When, Then}) => {

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  var expect = chai.expect;

  const page: CustomerDetailPage = new CustomerDetailPage();

  var customerId: string;

  Then('I navigate to the details page', function () {
    return expect(page.getPageTitleText()).to.eventually.equal(page.title);
  });

  Then('the field name is empty', function () {
    return expect(page.getName().getAttribute('value')).to.eventually.equal('');
  });

  Then('the field address is empty', function () {
    return expect(page.getAddress().getAttribute('value')).to.eventually.equal('');
  });

  Given('I enter {string} as the name', function (name) {
    page.setName(name);
  });

  Given('I enter {string} as the address', function (address) {
    page.setAddress(address);
  });

  When('I click the save button', function () {
    page.clickSaveButton();
    page.getCustomerId().getAttribute('value').then( text => {
      this.customerId = text;
    })
  });

});
