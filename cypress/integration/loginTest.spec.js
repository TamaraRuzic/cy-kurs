/// <reference types="cypress" />
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";

describe('first cypress block', () => {

   it('visit vivify scrym', () => {
      cy.visit('/', { timeout: 30000 });
   });

   it('invalid email', () => {
      cy.get(loginPage.loginEmail).type(data.invalidUser.invalidEmail);
      cy.get(loginPage.loginPass).type(data.user.password);
      cy.get(loginPage.submitBtn).click();
   });

   it('no email', () => {
      cy.get(loginPage.loginEmail).clear();
      cy.get(loginPage.loginPass)
         .clear()
         .type(data.user.password);
      cy.get(loginPage.submitBtn).click();
   });

   it('wrong email', () => {
      cy.get(loginPage.loginEmail).type(data.invalidUser.noMonkeyEmail);
      cy.get(loginPage.loginPass)
         .clear()
         .type(data.user.password);
      cy.get(loginPage.submitBtn).click();
   });

   it('no password', () => {
      cy.get(loginPage.loginEmail)
         .clear()
         .type(data.user.email);
      cy.get(loginPage.loginPass).clear();
      cy.get(loginPage.submitBtn);
   });

   it('wrong password', () => {
      cy.get(loginPage.loginEmail)
         .clear()
         .type(data.user.email);
      cy.get(loginPage.loginPass)
         .clear()
         .type(data.invalidUser.invalidPassword);
      cy.get(loginPage.submitBtn);
   });

   it('short password', () => {
      cy.get(loginPage.loginEmail)
         .clear()
         .type(data.user.email);
      cy.get(loginPage.loginPass)
         .clear().
         type(data.invalidUser.shortPass);
      cy.get(loginPage.submitBtn);
   });

   it('valid login', () => {
      cy.get(loginPage.loginEmail)
         .clear()
         .type(data.user.email);
      cy.get(loginPage.loginPass)
         .clear()
         .type(data.user.password);
      cy.get(loginPage.submitBtn).click();
   });

   it('logout', () => {
      cy.wait(3000);
      cy.get(sidebar.myUser, { timeout: 5000 }).click();
      cy.get(sidebar.profile, { timeout: 3000 }).click();
      cy.get(sidebar.logout, { timeout: 3000 }).click();
   })
})
