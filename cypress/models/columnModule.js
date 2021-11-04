import data from "../fixtures/data.json";


module.exports = {
    get addColumn() {
        return cy.get("div[class='vs-c-col vs-is-empty vs-add-column-btn-gap not-sortable'] [class='vs-add-new-task vs-c-btn vs-c-btn--themify-primary vs-c-btn--round vs-c-btn--sm']");
    },
    get columnHeader() {
        return cy.get(".el-input__inner");
    },
    get newColumn() {
        return cy.get(":nth-child(3) > .vs-c-task-list");
    },

    addNewColumn({ name = data.newColumn.columnName }) {
        this.addColumn
            .should('be.visible')
            .click();
        this.columnHeader
            .should('be.visible')
            .type(name, '{enter}');
        this.newColumn
            .should('exist');
    }
}
