/// <reference types="cypress" />
import registerPage from "../fixtures/register.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import loginPage from "../fixtures/login.json"

describe('register test block', () => {
    it.only('visit register page and select pricing plan', () => {
        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
        cy.get('.vsp-c-pricing-plan-list--annual > :nth-child(1)').scrollIntoView();
        cy.get(registerPage.starterPack)
            .scrollIntoView()
            .click({ force: true });
    });

    it('register existing user', () => {
        cy.get(registerPage.registerEmail)
            .clear()
            .type(data.user.email);
        cy.get(registerPage.registerPass)
            .clear()
            .type(data.user.password);
        cy.get(registerPage.numberOfUsers).type(data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();
    });

    it('register new user with no email', () => {
        cy.get(registerPage.registerEmail).clear();
        cy.get(registerPage.registerPass)
            .clear()
            .type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .clear()
            .type(data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();

    });

    it('register new user with wrong email', () => {
        cy.get(registerPage.registerEmail)
            .clear()
            .type(data.invalidUser.invalidEmail);
        cy.get(registerPage.registerPass)
            .clear()
            .type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .clear()
            .type(data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();

    });

    it('register new user with no pass', () => {
        cy.get(registerPage.registerEmail)
            .clear()
            .type(data.newUser.registerEmail);
        cy.get(registerPage.registerPass).clear();
        cy.get(registerPage.numberOfUsers)
            .clear()
            .type(data.newUser.numberOfUsers);
        cy.get(registerPage.pricePlanMonth).click();
        cy.get(registerPage.finishRegistration).click();

    });

    it.only('register new user successfuly', () => {
        cy.get(registerPage.registerEmail)
            .clear()
            .type(data.newUser.registerEmail);
        cy.get(registerPage.registerPass)
            .clear()
            .type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .clear()
            .type(data.newUser.numberOfUsers);
        cy.get(registerPage.pricePlanMonth).click();
        cy.get(registerPage.finishRegistration).click();
        cy.get(sidebar.user, { timeout: 5000 }).click();
        cy.get(sidebar.profile, { timeout: 3000 }).click();
        cy.get(sidebar.logout, { timeout: 3000 }).click();
        cy.get(loginPage.loginEmail).type(data.newUser.registerEmail);
        cy.get(loginPage.loginPass).type(data.newUser.registerPass);
        cy.get(loginPage.submitBtn).click();
        cy.wait(5000);
        cy.get(registerPage.addFirstName).type(data.newUser.name);
        cy.get(registerPage.addLastName).type(data.newUser.lastName);
        cy.get(registerPage.addCompanyName).type(data.newUser.companyName);
        cy.get(registerPage.addOrganisationName).type(data.newOrganisation.newOrganisationName);
        cy.get(registerPage.finishRegistration).click()
    });    
})
