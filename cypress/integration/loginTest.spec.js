/// <reference types="cypress" />
import loginPage from "../fixtures/login.json";
// import data from "../fixtures/data.json";
// import sidebar from "../fixtures/sidebar.json";
import loginModule from "../models/loginModule";
// import sidebarModule, { logoutButton } from "../models/sidebarModule";
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

   it('invalid email', () => {
      loginModule.login({ mail : "kks"});
      cy.get(loginPage.loginEmail).should('be.visible');
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
      cy.url().should('include','/login');
   });

   it('no email', () => {
      loginModule.login({mail : ''});
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
         cy.url().should('include','/login');
   });

   it.only('wrong email', () => {
      loginModule.login({mail : user.email})
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('no password', () => {
      loginModule.login({password : ''});
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field is required');
      cy.url().should('include','/login');
   });

   it('wrong password', () => {
      loginModule.login({password : 'password'});
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('short password', () => {
      loginModule.login({password : 'pas'});
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field must be at least 5 characters')
      cy.url().should('include','/login');
   });

   it('valid login', () => {
      loginModule.login({});
      cy.url().should('include','/my-organizations')
   });

   it('logout', () => {
      loginModule.login({});
      loginModule.logout();
      cy.url().should('include','/login')
      cy.get(loginPage.submitBtn)
         .should('be.visible');
   });
})
