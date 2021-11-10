import data from '../fixtures/data.json';
import authPage from './classes/auth';
import signin from './classes/login';
import sidebar from "../models/sidebarModule";
import organization from "./classes/organisation";
import board from "../models/boardModule";

// -- This is a parent command --
// auth commands

Cypress.Commands.add('register', ({ email = data.newUser.registerEmail, password = data.newUser.registerPass, usersNumber = data.newUser.numberOfUsers }) => {
    if (email == "") {
        authPage.passwordRegister.type(password);
        authPage.numOfUser.type(data.newUser.numberOfUsers);
        authPage.monthlyPayment.click();
        authPage.finishRegister.click();
    } else if (password == "") {
        authPage.emailRegister.type(email);
        authPage.numOfUser.type(data.newUser.numberOfUsers);
        authPage.monthlyPayment.click();
        authPage.finishRegister.click();
    } else if (usersNumber == "") {
        authPage.emailRegister.type(email);
        authPage.passwordRegister.type(password);
        authPage.monthlyPayment.click();
        authPage.finishRegister.click();
    } else {
        authPage.emailRegister.type(email);
        authPage.passwordRegister.type(password);
        authPage.numOfUser.type(usersNumber);
        authPage.monthlyPayment.click();
        authPage.finishRegister.click();
    }
});

Cypress.Commands.add('login', ({ mail = data.user.email, password = data.user.password }) => {
    if (mail == "") {
        signin.passwordLogin.should('be.visible').type(password);
        signin.submitBtn.click();
    } else if (password == "") {
        signin.emailLogin.should('be.visible').type(mail);
        signin.submitBtn.click();
    } else {
        cy.intercept("POST", "**api/v2/login").as('login');
        signin.emailLogin.should('be.visible').type(mail);
        signin.passwordLogin.should('be.visible').type(password);
        signin.submitBtn.click();
        if (mail == data.user.email && password == data.user.password) {
            cy.wait('@login').then((intercept) => {
                expect(intercept.response.statusCode).to.eq(200);
            })
        }
    }
});

Cypress.Commands.add('logout', () => {
    cy.intercept("POST", "**/api/v2/logout").as('logout');
    sidebar.myUser.click();
    sidebar.profile.click();
    sidebar.logoutButton.click();
    cy.wait('@logout').then((intercept) => {
        expect(intercept.response.statusCode).to.eq(201);
    })
});

//organisation commands

Cypress.Commands.add('createOrganizaton', ({ name = data.newOrganisation.organisationName }) => {
    organization.addOrganization.click();
    organization.organizationName.type(name);
    organization.nextButton.click();
    organization.nextButton.click();
    organization.okButton.click();
});

Cypress.Commands.add('deleteOrganization', ({ password = data.user.password }) => {
    if (password == '') {
        organization.delOrganization.click();
        organization.closeModalDelete.click();
    } else if (password == data.invalidUser.invalidPassword) {
        organization.delOrganization.click();
        organization.confirmPasswordToDelete.type(password);
        organization.submitDelete.click();
    } else {
        cy.intercept("POST", "**/api/v2/organizations/*").as('delete');
        organization.delOrganization.click();
        organization.confirmPasswordToDelete.type(password);
        organization.submitDelete.click();
    }
});

// board commands
Cypress.Commands.add('createBoard', ({ name = data.newBoard.boardName }) => {
    sidebarModule.addNewTopSidebar.click();
    sidebarModule.addBoard.click();
    board.organizationDropdown.click();
    board.organizationItem.click();
    board.boardName.type(name);
    board.nextBtn.click();
    board.scrumBoard.click();
    board.nextBtn.click();
    board.nextBtn.click();
    board.nextBtn.click();
    board.nextBtn.click();
});

Cypress.Commands.add('deleteBoard', () => {
    cy.intercept("DELETE", "**/api/v2/boards/*").as('deleteBoard')
    board.boardSetting
        .click();
    board.boardDelete
        .scrollIntoView()
        .click();
    board.confirmDelete
        .click();
    board.modalBoard
        .click();
    cy.wait('@deleteBoard').then((intercept) =>
        expect(intercept.response.statusCode).to.eq(200));
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
