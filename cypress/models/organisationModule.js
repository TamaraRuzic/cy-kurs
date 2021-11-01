import data from "../fixtures/data.json";

module.exports = {
    get addOrganizaton() {
        return cy.get("div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']");
    },
    get organizationName() {
        return cy.get("input[placeholder='Enter name...']");
    },
    get nextButton() {
        return cy.get("div[class='dialog-footer'] > button:nth-child(3)");
    },
    get okButton() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn");
    },
    get delOrganization() {
        return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']");
    },
    get confirmPasswordToDelete() {
        return cy.get("input[type='password']");
    },
    get submitDelete() {
        return cy.get("button[class='el-button el-button--success el-button']");
    },

    createOrganization({name = data.newOrganisation.organisationName}) {
        this.addOrganizaton.should('be.visible').click();
        this.organizationName.should('be.visible').type(name);
        this.nextButton.should('be.visible').click();
        this.nextButton.should('be.visible').click();
        this.okButton.should('be.visible').click();
    },

    deleteOrganization(password = data.user.password) {
        cy.intercept("POST", "**/api/v2/organizations/*").as('delete');
        this.delOrganization.click();
        this.confirmPasswordToDelete.should('be.visible', {timeout: 4000}).type(password);
        this.submitDelete.should('be.visible').click();
        cy.wait('@delete').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(201);
        });
    }
}