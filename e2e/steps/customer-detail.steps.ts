import { Given, When, Then } from 'cucumber';

import { CustomerDetailPage } from '../src/customer-detail.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

const page: CustomerDetailPage = new CustomerDetailPage();

Then('I navigate to the details page', function() {
  return expect(page.getPageTitleText()).to.eventually.match(/Details$/);
});

Then('the field name is empty', function() {
  return expect(page.getName().getAttribute('value')).to.eventually.equal('');
});

Then('the field address is empty', function() {
  return expect(page.getAddress().getAttribute('value')).to.eventually.equal('');
});

Given('I enter {string} as the name', function(name) {
  page.setName(name);
});

Given('I enter {string} as the address', function(address) {
  page.setAddress(address);
});

When('I click the save button', function() {
  page.clickSaveButton();
});

Then('the new customer is created with a valid ID', function() {
  return expect(page.getCustomerId().getAttribute('value')).to.eventually.not.equal('');
});
