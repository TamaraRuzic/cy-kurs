/// <reference types="cypress" />
import registerPage from "../fixtures/register.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";

describe('register test block', () => {
    it('visit register page and select pricing plan', () => {
        cy.visit('https://cypress-api.vivifyscrum-stage.com/pricing');
        cy.get('.vsp-c-pricing-plan-list--annual > :nth-child(1)').scrollIntoView();
        cy.get(registerPage.starterPack).scrollIntoView().click({force:true});
    });

    it('register existing user', () => {
        cy.get(registerPage.registerEmail).clear().type(data.user.email);
        cy.get(registerPage.registerPass).clear().type(data.user.password);
        cy.get(registerPage.numberOfUsers).type("1");
        cy.get(registerPage.finishRegistration).click();
     });

    it('register new user with no email', () => {
        cy.get(registerPage.registerEmail).clear();
        cy.get(registerPage.registerPass).clear().type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.finishRegistration).click();

    })

    it('register new user with wrong email', () => {
        cy.get(registerPage.registerEmail).clear().type(data.invalidUser.invalidEmail);
        cy.get(registerPage.registerPass).clear().type(data.newUser.registerPass);
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.finishRegistration).click();

    })

    it('register new user with no pass', () => {
        cy.get(registerPage.registerEmail).clear().type(data.newUser.registerEmail);
        cy.get(registerPage.registerPass).clear();
        cy.get(registerPage.numberOfUsers).clear().type("10");
        cy.get(registerPage.pricePlanMonth).click();
        cy.get(registerPage.finishRegistration).click();

    })

//     it('register new user successfuly', () => {
//        cy.get(registerPage.registerEmail).clear().type(data.newUser.registerEmail);
//        cy.get(registerPage.registerPass).clear().type(data.newUser.registerPass);
//        cy.get(registerPage.numberOfUsers).clear().type("10");
//        cy.get(registerPage.pricePlanMonth).click();
//        cy.get(registerPage.finishRegistration).click();

//    })
})