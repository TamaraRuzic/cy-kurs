/// <reference types="cypress" />
import registerPage from "../fixtures/register.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import loginPage from "../fixtures/login.json";

describe('register test block', () => {
    beforeEach('visit register page and select pricing plan', () => {
        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
        cy.get('.vsp-c-pricing-plan-list--annual > :nth-child(1)').scrollIntoView();
        cy.get(registerPage.starterPack)
            .scrollIntoView()
            .click({ force: true });
        cy.url().should('include','pricing');
        cy.get(registerPage.registerEmail)
            .clear()
            .should('be.empty');
        cy.get(registerPage.registerPass)
            .clear()
            .should('be.empty');
        cy.get(registerPage.numberOfUsers)
            .clear()
            .should('be.empty');
            cy.url().should('include', 'sign-up');
    });

    it('register existing user', () => {
        cy.get(registerPage.registerEmail)
            .type(data.user.email)
            .should('have.value',data.user.email);
        cy.get(registerPage.registerPass)
            .type(data.user.password)
            .should('have.value',data.user.password);
        cy.get(registerPage.numberOfUsers)
            .type(data.newUser.numberOfUsers)
            .should('have.value',data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=1&event=page-card')
        cy.get(registerPage.errorMessage)
        .should('be.visible')
        .and('contain','already exists')
    });

    it('register new user with no email', () => {
        cy.get(registerPage.registerPass)
            .type(data.newUser.registerPass)
            .should('have.value',data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .type(data.newUser.numberOfUsers)
            .should('have.value',data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=1&event=page-card'),
        cy.get(registerPage.emailRequired)
            .should('be.visible');
    });

    it('register new user with wrong email', () => {
        cy.get(registerPage.registerEmail)
            .type(data.invalidUser.invalidEmail)
            .should('have.value',data.invalidUser.invalidEmail);
        cy.get(registerPage.registerPass)
            .type(data.newUser.registerPass)
            .should('have.value',data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .type(data.newUser.numberOfUsers)
            .should('have.value',data.newUser.numberOfUsers);
        cy.get(registerPage.finishRegistration).click();
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=1&event=page-card')
        cy.get(registerPage.emailRequired)
            .should('be.visible');
    });

    it('register new user with no pass', () => {
        cy.get(registerPage.registerEmail)
            .type(data.newUser.registerEmail)
            .should('have.value',data.newUser.registerEmail);
        cy.get(registerPage.numberOfUsers)
            .type(data.newUser.numberOfUsers)
            .should('have.value',data.newUser.numberOfUsers);
        cy.get(registerPage.pricePlanMonth).click();
        cy.get(registerPage.finishRegistration)
        .click();
        cy.url().should('eq', 'https://cypress.vivifyscrum-stage.com/sign-up?type=yearly&plan=1&event=page-card')
        cy.get(registerPage.passwordRequierd)
        .should('be.visible')
        .and('have.text','The password field is required');
    });

    it.only('register new user successfuly', () => {
        cy.get(registerPage.registerEmail)
            .type(data.newUser.registerEmail)
            .should('have.value',data.newUser.registerEmail);
        cy.get(registerPage.registerPass)
            .type(data.newUser.registerPass)
            .should('have.value',data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers)
            .type(data.newUser.numberOfUsers)
            .should('have.value',data.newUser.numberOfUsers);
        cy.get(registerPage.pricePlanMonth).click();
        cy.get(registerPage.finishRegistration).click();
        cy.get(sidebar.user, { timeout: 5000 }).click();
        cy.get(sidebar.profile, { timeout: 3000 }).click();
        cy.get(sidebar.logout, { timeout: 3000 }).click();
        cy.get(loginPage.loginEmail)
            .type(data.newUser.registerEmail)
            .should('have.value',data.newUser.registerEmail);
        cy.get(loginPage.loginPass)
            .type(data.newUser.registerPass)
            .should('have.value', data.newUser.registerPass);
        cy.get(loginPage.submitBtn).click();
        cy.intercept('GET', 'https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations').as('homePage')
        cy.wait('@homePage');
        cy.get(registerPage.addFirstName)
            .type(data.newUser.name)
            .should('have.value',data.newUser.name);
        cy.get(registerPage.addLastName)
            .type(data.newUser.lastName)
            .should('have.value', data.newUser.lastName);
        cy.get(registerPage.addCompanyName)
            .type(data.newUser.companyName)
            .should('have.value',data.newUser.companyName);
        cy.get(registerPage.addOrganisationName)
            .type(data.newOrganisation.newOrganisationName)
            .should('have.value',data.newOrganisation.newOrganisationName);
        cy.get(registerPage.finishRegistration).click();
        cy.get(registerPage.errorMessage).should('be.visible');
        cy.url().should('include','my-organisations');
    });    
})
