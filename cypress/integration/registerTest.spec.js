/// <reference types="cypress" />
import registerPage from "../fixtures/register.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";

describe('register test block', () => {
    it('visit register page', () => {
        cy.visit('/sign-up?type=yearly&plan=1&event=page-card');
    });

    it('register existing user', () => {
        cy.get(registerPage.registerEmail).clear().type(data.user.email);
        cy.get(registerPage.registerPass).clear().type(data.user.password);
        cy.get(registerPage.numberOfUsers).type("1");
        cy.get(registerPage.finishRegistration).click();
     });

    it('register new user with no email', () => {
        cy.get(registerPage.registerPass).clear().type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.finishRegistration).click();

    })

    it('register new user with wrong email', () => {
        cy.get(registerPage.registerPass).clear().type(data.invalidUser.invalidEmail);
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.finishRegistration).click();

    })

    it('register new user with no pass', () => {
        cy.get(registerPage.registerEmail).clear().type(data.newUser.registerEmail);
        cy.get(registerPage.registerPass).clear();
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.finishRegistration).click();

    })

    //it('register new user successfuly', () => {
    //    cy.get(registerPage.registerEmail).clear().type(data.newUser.registerEmail);
    //    cy.get(registerPage.registerPass).clear().type(data.newUser.registerPass);
    //    cy.get(registerPage.numberOfUsers).clear().type("10");
    //    cy.get(registerPage.finishRegistration).click();

   // })
})