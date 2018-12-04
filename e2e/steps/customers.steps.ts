import { Given, When, Then } from 'cucumber';

import { CustomersPage } from '../src/customers.po';

const chai = require('chai');
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);

const expect = chai.expect;

const page: CustomersPage = new CustomersPage();

Given('I am in the customers page', () => {
  page.navigateTo();
  return expect(page.getPageTitleText()).to.eventually.equal(page.title);
});

Then('I should see a list of customers', () => {
  // return expect(page.getCustomerList()).to.eventually.have.lengthOf(4);
  return expect(page.getCustomerList().count()).to.eventually.be.above(0);
});

When('I click on the add button', function() {
  page.clickAddButton();
});
