import organisation from "../fixtures/organisation.json";
import data from "../fixtures/data.json";
import loginModule from "../models/loginModule";
import organizationModule from "../models/organisationModule";
import sidebarModule from "../models/sidebarModule";

describe('Organization test block', () => {
    beforeEach('login', () => {
        cy.visit('/');
        loginModule.login({});
        organizationModule.createOrganization({});
        sidebarModule.organizationSettings.should('be.visible').click();
        // cy.get(organisation.organisationSidebar.settings).click();
    });

    afterEach('delete organisation', () => {
        organizationModule.deleteOrganization();
        cy.url().should('include','my-organizations');
    });

    it('Edit organization name failed', () => {
        cy.get(organisation.organisationInfo.organisationName)
            .clear()
            .should('have.value', '');
        cy.get(organisation.organisationInfo.updateNameBtn).click();
        
    });

    it('Edit organization name', () => {
        cy.get(organisation.organisationInfo.organisationName)
            .clear()
            .type(data.newOrganisation.newOrganisationName)
            .should('have.value',data.newOrganisation.newOrganisationName);
        cy.get(organisation.organisationInfo.updateNameBtn).click();
        cy.contains('Successfully updated the Organization name')
            .should('be.visible');
    });

    it('select workdays and set calendar start day', () => {
        cy.get(organisation.organisationInfo.checkboxFri)
            .click()
            .should('not.be.checked');
        cy.get(organisation.organisationInfo.startDaydropdown).click();
        cy.get(organisation.organisationInfo.dropdownItemMon)
            .click()
            .should('be.visible')
            .and('have.text','Monday');
    });

    it('vacation days per year failed', () => {
        cy.get(organisation.organisationInfo.vacationDays)
            .clear()
            .should('be.empty');
        cy.get(organisation.organisationInfo.vacationDaysRequired)
            .should('be.visible');
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('vacation days per year', () => {
        cy.get(organisation.organisationInfo.vacationDays)
            .clear()
            .type(data.newOrganisation.daysPerYear)
            .should('have.value', data.newOrganisation.daysPerYear);
        cy.get(organisation.organisationInfo.updateVacation).click();
        cy.contains('Successfully updated vacation days')
            .should('be.visible');
    });

    it('working months required for vacation failed', () => {
        cy.get(organisation.organisationInfo.workingMonths).clear();
        cy.get(organisation.organisationInfo.workingMonthsRequired)
            .should('be.visible');
        cy.get(organisation.organisationInfo.additionalVacation).clear();
        cy.get(organisation.organisationInfo.additionalDaysRequired)
            .should('be.visible')
        cy.get(organisation.organisationInfo.updateVacation).click();
        
    });

    it('working months, additional vacation days granted and unused vacation', () => {
        cy.get(organisation.organisationInfo.workingMonths)
            .clear()
            .type(data.newOrganisation.monthsRequiredForVacation)
            .should('have.value', data.newOrganisation.monthsRequiredForVacation);
        cy.get(organisation.organisationInfo.additionalVacation)
            .clear()
            .type(data.newOrganisation.additionalVacationDays)
            .should('have.value', organisation.organisationInfo.additionalVacation);
        cy.get(organisation.organisationInfo.periodForUnusedVacation).click();
        cy.get(organisation.organisationInfo.middleOfNextYear)
            .click()
            .should('be.visible');
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('change ownership', () => {
        cy.get(organisation.organisationInfo.ownershipDropdown).click();
        cy.get(organisation.organisationInfo.selectOwner).click();
    });

    it('cancel delete organisation', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation).click();
        cy.get(organisation.organisationInfo.enterPasswordToDelete)
            .type(data.user.password)
            .should('have.value',data.user.password);
        cy.get(organisation.organisationInfo.noDelete).click();
        cy.url().should('include','settings');
    });

    it('close delete modal', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation).click();
        cy.get(organisation.organisationInfo.closeDeleteModal).click();
        cy.url().should('include','settings');
        cy.get(organisation.organisationInfo.deleteOrganisation)
            .should('be.visible');
    });

    it.skip('delete organisation failed due to wrong password', () => {
        organizationModule.deleteOrganization(password = data.invalidUser.invalidPassword);
        cy.get(organisation.organisationInfo.closeDeleteModal).click();
        cy.contains('The password is incorrect.', {timeout : 4000})
            .should('exists')
            .and('be.visible');
    });

})
