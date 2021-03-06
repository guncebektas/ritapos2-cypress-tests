import {insertOrder} from '../utilities/order.js';
import {TEST} from '../constants/constantsForTests.js';
import {doLogin} from '../utilities/doLogin.js';

describe('Pending Order Customer Tests', function()
{
  
  beforeEach(() =>
  {
    doLogin();
    
    insertOrder();
    
    cy.get('#modal-product-to-order .modal-footer a[data-test="order-details"]').click();
  });
  
  it('Set an existing customer', function()
  {
    cy.get('button[data-target="#modal-customer"]').click();
    
    cy.get('input[name="customer-search-string"]').first().clear().type(TEST.CUSTOMER.PHONE);
  
    cy.wait(1000);
    
    cy.get('#btn-customer-search').click();
  
    cy.wait(1000);
    
    cy.get('#customer-search-result .btn-customer-select').first().click();
  
    cy.wait(3000);
    
    cy.get('p').should('contain', TEST.CUSTOMER.NAME);
  });
  
  it('Set a new customer', function()
  {
    let customer = {
      name: 'yyy',
      phone: 'yyy'
    }
    
    cy.get('button[data-target="#modal-customer"]').click();
  
    cy.get('input[name="customer-search-string"]').type(customer.name, {delay: 0});
  
    cy.get('#btn-customer-search').click();
  
    cy.get('#customer-search-result a').first().click();
    
    cy.get('input[name="name"]').clear().type(customer.name, {delay: 0});
  
    cy.get('.btn-new-order-with-customer-id').click({force: true});
    
    cy.wait(1000);
    
    cy.get('#modal-product-to-order .modal-footer a[data-test="order-details"]').click();
  
    cy.get('p').should('contain', customer.name);
  });
});