import { defineSupportCode } from 'cucumber';

import { CustomerDetailPage } from '../src/customer-detail.po';

defineSupportCode(({Given, When, Then}) => {

  var chai = require('chai');
  var chaiAsPromised = require('chai-as-promised');
  chai.use(chaiAsPromised);

  var expect = chai.expect;

  const detailPage: CustomerDetailPage = new CustomerDetailPage();

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
