/// <reference types="cypress" />
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";

describe('login block', () => {

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
      cy.get(loginPage.loginEmail)
         .type(data.invalidUser.invalidEmail)
         .should('have.value', data.invalidUser.invalidEmail);
      cy.get(loginPage.loginPass)
         .type(data.user.password)
         .should('have.value', data.user.password);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
      cy.url().should('include','/login');
   });

   it('no email', () => {
      cy.get(loginPage.loginPass)
         .type(data.user.password)
         .should('have.value',data.user.password);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.emailRequired)
         .should('be.visible')
         .and('have.text', 'The email field must be a valid email');
         cy.url().should('include','/login');
   });

   it('wrong email', () => {
      cy.get(loginPage.loginEmail)
         .type(data.invalidUser.noMonkeyEmail)
         .should('have.value', data.invalidUser.noMonkeyEmail);
      cy.get(loginPage.loginPass)
         .type(data.user.password)
         .should('have.value',data.user.password);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('no password', () => {
      cy.get(loginPage.loginEmail)
         .type(data.user.email)
         .should('have.value', data.user.email);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field is required');
      cy.url().should('include','/login');
   });

   it('wrong password', () => {
      cy.get(loginPage.loginEmail)
         .type(data.user.email)
         .should('have.value', data.user.email);
      cy.get(loginPage.loginPass)
         .type(data.invalidUser.invalidPassword)
         .should('have.value', data.invalidUser.invalidPassword);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.errorMsg)
         .should('be.visible')
         .and('have.text', 'Oops! Your email/password combination is incorrect');
      cy.url().should('include','/login');
   });

   it('short password', () => {
      cy.get(loginPage.loginEmail)
         .type(data.user.email)
         .should('have.value', data.user.email);
      cy.get(loginPage.loginPass)
         .type(data.invalidUser.shortPass)
         .should('have.value', data.invalidUser.shortPass);
      cy.get(loginPage.submitBtn).click();
      cy.get(loginPage.passwordRequierd)
         .should('be.visible')
         .and('have.text', 'The password field must be at least 5 characters')
      cy.url().should('include','/login');
   });

   it('valid login', () => {
      cy.get(loginPage.loginEmail)
         .type(data.user.email)
         .should('have.value', data.user.email);
      cy.get(loginPage.loginPass)
         .type(data.user.password)
         .should('have.value', data.user.password);
      cy.get(loginPage.submitBtn).click();
      cy.url().should('include','/my-organizations')
   });

   it('logout', () => {
      cy.get(loginPage.loginEmail)
         .type(data.user.email)
         .should('have.value', data.user.email);
      cy.get(loginPage.loginPass)
         .type(data.user.password)
         .should('have.value', data.user.password);
      cy.get(loginPage.submitBtn).click();
      cy.url().should('include','/my-organizations');
      cy.get(sidebar.myUser, { timeout: 5000 })
      .click()
      .should('be.visible');
      cy.get(sidebar.profile, { timeout: 3000 })
      .click();
      cy.get(sidebar.logout, { timeout: 3000 })
      .click()
      .should('be.visible');
      cy.url().should('include','/login')
      cy.get(loginPage.submitBtn)
         .should('be.visible');
   });
})
