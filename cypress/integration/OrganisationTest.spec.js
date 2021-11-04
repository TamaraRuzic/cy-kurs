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
    });

    afterEach('delete organisation', () => {
        organizationModule.deleteOrganization({});
        cy.url().should('include','my-organizations');
    });

    it('Edit organization name failed', () => {
        organizationModule.editOrganizationName({name : ''});
    });

    it('Edit organization name successfully', () => {
        organizationModule.editOrganizationName({});
    });

    it('vacation days, working months and additional days failed', () => {
        organizationModule.vacationSection({days : '', month : '', additional : ''});        
    });

    it('working months, additional vacation days granted and unused vacation', () => {
        organizationModule.vacationSection({});
    });

    it('close delete modal', () => {
        organizationModule.deleteOrganization({password : ''});
        cy.url().should('include','settings');
         organizationModule.delOrganization.should('be.visible');
    });

    it('delete organisation failed due to wrong password', () => {
        organizationModule.deleteOrganization({password : data.invalidUser.invalidPassword});
    });

     // it('change ownership', () => {
    //     cy.get(organisation.organisationInfo.ownershipDropdown).click();
    //     cy.get(organisation.organisationInfo.selectOwner).click();
    // });

     // it('select workdays and set calendar start day', () => {
    //     cy.get(organisation.organisationInfo.checkboxFri)
    //         .click()
    //         .should('not.be.checked');
    //     cy.get(organisation.organisationInfo.startDaydropdown).click();
    //     cy.get(organisation.organisationInfo.dropdownItemMon)
    //         .click()
    //         .should('be.visible')
    //         .and('have.text','Monday');
    // });

})
