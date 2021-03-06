import {USER} from '../../../imports/shared/enums/general.js';
import {ROUTE} from '../../../client/shared/enums/client.js';
import {doLogin} from '../utilities/doLogin.js';

describe('Admin Upgrade', function()
{
  beforeEach(() =>
  {
    doLogin();
    
    cy.visit(`cms/upgrade/${USER.TRIAL.STORE_OWNER.ID}`);
  });
  
  it('Expire the license of a store', function()
  {
    cy.get('.extend[data-time="0"]').click();
    
    cy.get('.swal2-confirm').click();
    
    cy.visit(ROUTE.HOME);
    
    cy.get('.btn-falcon-danger[href="/upgrade"]').should('be.visible');
  });
  
  it('Extend the license of a store', function()
  {
    cy.get('.extend[data-time="31"]').click();
    
    cy.get('.swal2-confirm').click();
    
    cy.visit(ROUTE.HOME);
    
    cy.get('.btn-falcon-warning[href="/upgrade"]').should('be.visible');
  });
  
  it('Add one day to the license of a store', function()
  {
    cy.get('.add[data-time="31"]').click();
    
    cy.get('.swal2-confirm').click();
  });
});