import data from "../fixtures/data.json";
import sidebarModule from "../models/sidebarModule";

module.exports = {
    get addBoardModal() {
        return cy.get("div[class='vs-c-modal vs-c-modal--starter vs-c-modal--create-board']");
    },
    get organizationDropdown() {
        return cy.get("div[class='el-select vs-c-new-board-select']");
    },
    get organizationItem() {
        return cy.get(".el-scrollbar__view > :nth-child(1)");
    },
    get boardName() {
        return cy.get("input[placeholder='Enter title...']");
    },
    get nextBtn() {
        return cy.get("button[name='next_btn']");
    },
    get scrumBoard() {
        return cy.get("span[name='type_scrum']");
    },
    get boardSetting() {
        return cy.get('[data-cy=board-configuration] > span > div > .vs-c-site-logo');
    },
    get boardDelete() {
        return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']");
    },
    get confirmModal() {
        return cy.get("div[class='vs-c-modal vs-c-confirmation-modal']");
    },
    get confirmDelete() {
        return cy.get("button[class='el-button el-button--success el-button']");
    },
    get modalBoard() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn");
    },
    get closeBoardModal() {
        return cy.get("button[class='el-button vs-c-close-modal el-button--text el-button--small']");
    },
    get titleOfBoard() {
        return cy.get("input[name='name']")
    },
    get codeForBoard() {
        return cy.get("input[name='code']")
    },
    get descOfBoard() {
        return cy.get("textarea[name='description']")
    },
    get saveBasicInfo() {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap']");
    },
    get titleRequired() {
        return cy.contains("The board title field is required");
    },
    get codeRequired() {
        return cy.contains("The board code field is required");
    },


    createBoard({ name = data.newBoard.boardName }) {
        sidebarModule.addNewTopSidebar
            .should('be.visible')
            .click();
        sidebarModule.addBoard
            .should('be.visible')
            .click();
        this.addBoardModal
            .should('be.visible');
        this.organizationDropdown
            .should('be.visible')
            .click();
        this.organizationItem
            .should('be.visible')
            .click();
        this.boardName
            .should('be.visible')
            .type(name);
        this.nextBtn
            .should('be.visible')
            .click();
        this.scrumBoard
            .should('be.visible')
            .click();
        this.nextBtn
            .should('be.visible')
            .click();
        this.nextBtn
            .should('be.visible')
            .click();
        this.nextBtn
            .should('be.visible')
            .click();
        this.nextBtn
            .should('be.visible')
            .click();
    },

    deleteBoard({ }) {
        cy.intercept("DELETE", "**/api/v2/boards/*").as('deleteBoard')
        this.boardSetting
            .should("be.visible")
            .click();
        this.boardDelete
            .scrollIntoView()
            .should("be.visible")
            .click();
        this.confirmModal
            .should("be.visible")
        this.confirmDelete
            .should("be.visible")
            .click();
        this.modalBoard
            .should("be.visible")
            .click();
        cy.wait('@deleteBoard').then((intercept) =>
            expect(intercept.response.statusCode).to.eq(200));
    },

    editBoard({ title = data.newBoard.newTitle, code = data.newBoard.code, description = data.newBoard.boardDesc }) {
        if (title == '' || code == '') {
            sidebarModule.boardConfiguration
                .should('be.visible', { timeout: 3000 })
                .click();
            this.titleOfBoard
                .should('be.visible')
                .clear();
            this.titleRequired
                .scrollIntoView()
                .should('be.visible');
            this.codeForBoard
                .should('be.visible')
                .clear();
            this.codeRequired
                .scrollIntoView()
                .should('be.visible');
            this.saveBasicInfo
                .should('be.visible')
                .click()
        } else {
            cy.intercept('PUT', '**/api/v2/boards/*').as('editBoard')
        sidebarModule.boardConfiguration
            .should('be.visible', { timeout: 3000 })
            .click();
        this.titleOfBoard
            .should('be.visible')
            .clear()
            .type(title);
        this.codeForBoard
            .should('be.visible')
            .clear()
            .type(code);
        this.descOfBoard
            .should('be.visible')
            .clear()
            .type(description);
        this.saveBasicInfo
            .should('be.visible')
            .click()
        cy.wait('@editBoard').then((intercept) =>
            expect(intercept.response.statusCode).to.eq(200))
        }
    }
}
