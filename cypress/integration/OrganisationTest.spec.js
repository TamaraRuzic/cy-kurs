import organisation from "../fixtures/organisation.json";
import sidebar from "../fixtures/sidebar.json";
import navigation from "../fixtures/navigation.json";
import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json"

describe('Organization test block', () => {
    it('login', () => {
        cy.visit('/');
        cy.get(loginPage.loginEmail).clear().type(data.user.email);
        cy.get(loginPage.loginPass).clear().type(data.user.password);
        cy.get(loginPage.submitBtn).click();
    })

    it('create organization', () => {
        //cy.visit('/my-organizations');
        cy.get(organisation.addingOrganisation.addNewOrganisation, {timeout : 5000}).click();
        cy.get(organisation.addingOrganisation.organisationName).type(data.newOrganisation.organisationName);
        cy.get(organisation.addingOrganisation.nextButton, {timeout : 3000}).click();
        cy.get(organisation.addingOrganisation.nextButton, {timeout: 3000}).click();
        cy.get(organisation.addingOrganisation.okBtn).click();

    });

    it('Edit organization name failed', () => {
        cy.get(organisation.organisationSidebar.settings).click();
        cy.get(organisation.organisationInfo.organisationName).clear();
        cy.get(organisation.organisationInfo.updateNameBtn).click();
    });

    it('Edit organization name', () => {
        cy.get(organisation.organisationSidebar.settings).click();
        cy.get(organisation.organisationInfo.organisationName).type(data.newOrganisation.newOrganisationName);
        cy.get(organisation.organisationInfo.updateNameBtn).click();
    });

    it('select workdays and set calendar start day', () => {
        cy.get(organisation.organisationInfo.checkboxFri);
        cy.get(organisation.organisationInfo.checkboxMonday);
        cy.get(organisation.organisationInfo.startDaydropdown).click();
        cy.get(organisation.organisationInfo.dropdownItemMon);
    });

    it('vacation days per year failed', () => {
        cy.get(organisation.organisationInfo.vacationDays).clear();
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('vacation days per year', () => {
        cy.get(organisation.organisationInfo.vacationDays).type(data.newOrganisation.daysPerYear);
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('working months required for vacation failed', () => {
        cy.get(organisation.organisationInfo.workingMonths).clear();
        cy.get(organisation.organisationInfo.additionalVacation).clear();
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('working months, additional vacation days granted and unused vacation', () => {
        cy.get(organisation.organisationInfo.workingMonths).clear().type(data.newOrganisation.monthsRequiredForVacation);
        cy.get(organisation.organisationInfo.additionalVacation).clear().type(data.newOrganisation.additionalVacationDays);
        cy.get(organisation.organisationInfo.periodForUnusedVacation).click();
        cy.get(organisation.organisationInfo.middleOfNextYear).click();
        cy.get(organisation.organisationInfo.updateVacation).click();
    });

    it('change ownership', () => {
        cy.get(organisation.organisationInfo.ownershipDropdown).click();
        cy.get(organisation.organisationInfo.selectOwner).click();
    });

    it('cancel delete organisation', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation).click();
        cy.get(organisation.organisationInfo.enterPasswordToDelete).type(data.user.password);
        cy.get(organisation.organisationInfo.noDelete).click();
    })

    it('close delete modal', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation).click();
        cy.get(organisation.organisationInfo.closeDeleteModal).click();
    })

    it('delete organisation failed', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation).click();
        cy.get(organisation.organisationInfo.enterPasswordToDelete).type(data.invalidUser.invalidPassword);
        cy.get(organisation.organisationInfo.yesDelete).click();
        cy.get(organisation.organisationInfo.closeDeleteModal).click();
    })

    it('delete organisation', () => {
        cy.get(organisation.organisationInfo.deleteOrganisation, {timeout: 5000}).click();
        cy.get(organisation.organisationInfo.enterPasswordToDelete).clear().type(data.user.password);
        cy.get(organisation.organisationInfo.yesDelete).click();
    })
})