/// <reference types="cypress" />
import loginPage from "../fixtures/login.json";
import faker from "faker";

describe('login block', () => {

   let user = {
      email : faker.internet.email(),
      password : faker.internet.password()
   };

   beforeEach('visit vivify scrym', () => {
      cy.visit('/', { timeout: 30000 });
      cy.get(loginPage.loginEmail)
         .clear()
         .should('be.empty');
      cy.get(loginPage.loginPass)
         .clear()
         .should('be.empty');
   });

   it.only('invalid email', () => {
      cy.login({ mail : "kks"});
      cy.get(loginPage.loginEmail).should('be.visible');
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
      cy.url().should('include','/login');
   });

   it('no email', () => {
      cy.login({mail : ''});
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
         cy.url().should('include','/login');
   });

   it.only('wrong email', () => {
      cy.login({mail : user.email})
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('no password', () => {
      cy.login({password : ''});
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field is required');
      cy.url().should('include','/login');
   });

   it('wrong password', () => {
      cy.login({password : 'password'});
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('short password', () => {
      cy.login({password : 'pas'});
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field must be at least 5 characters')
      cy.url().should('include','/login');
   });

   it('valid login', () => {
      cy.login({});
      cy.url().should('include','/my-organizations')
   });

   it.only('logout', () => {
      cy.login({});
      cy.logout();
      cy.url().should('include','/login')
      cy.get(loginPage.submitBtn)
         .should('be.visible');
   });
})
