import data from "../fixtures/data.json";

module.exports = {
    get addTask() {
        return cy.get("button[class='vs-add-new-task vs-c-btn vs-c-btn--themify-secondary vs-c-btn--round vs-c-btn--sm']");
    },
    get newTaskCard() {
        return cy.get("div[class='vs-c-task-card vs-c-task-card-new vs-u-task--story']");
    },
    get taskTitle() {
        return cy.get("textarea[type='textarea']");
    },
    get task() {
        return cy.get(".vs-u-padding--sm");
    },
    get types() {
        return cy.get("div[class='vs-c-task-type__icon']");
    },
    get typeTask() {
        return cy.get("ul[class='el-dropdown-menu vs-c-dropdown-plus-icon vs-c-task-modal-type-dropdown'] > li:nth-child(4)");
    },
    get closeModalOfTask() {
        return cy.get("button[class='el-button vs-c-item-modal-close el-button--text']")
    },
    get editTitle() {
        return cy.get(".vs-c-task__title > .vue-simple-markdown");
    },
    get enterNewTitle() {
        return cy.get("textarea[placeholder='Write a title. Use hashtag (#) to add Item details.']");
    },
    get saveBtn() {
        return cy.get("button[class='el-button el-button--success el-button--small']");
    },
    get editTaskDescription() {
        return cy.get("div[title='Edit Description']");
    },
    get enterDescription() {
        return cy.get("textarea[placeholder='Write a description...']");
    },
    get columnOptions() {
        return cy.get("div[class='el-dropdown-link vs-c-modal-status__text']");
    },
    get columnSprint() {
        return cy.get("div[class='vs-c-dropdown active vs-c-dropdown-plus-icon vs-c-dropdown--above'] > li:nth-child(2)");
    },
    get commentField() {
        return cy.get("textarea[placeholder='Write a comment...']");
    },
    get publishComment() {
        return cy.get("button[class='el-button el-button--success el-button--mini']");
    },
    get taskOptions() {
        return cy.get("div[title='More']");
    },
    get removeTask() {
        return cy.get("div[class='vs-c-task-dropdown vs-c-task-dropdown-wrapper'] > div[class='vs-c-task-dropdown__body'] > a:nth-child(2)");
    },
    get yesButton() {
        return cy.get("button[class='el-button el-button--success']");
    },



    createTask({title = data.tasks.title}) {
        this.addTask
            .invoke('show')
            .click();
        this.newTaskCard
            .should('be.visible');
        this.taskTitle
            .should('be.visible')
            .type(title, '{enter}');
    },

    editTask({newTitle = data.tasks.titleSecond, description = data.tasks.description, comment = data.tasks.comment}) {
        this.task
            // .should('be.visible')
            .click();
        this.types
        .should('be.visible')
            .click();
        this.typeTask
        .should('be.visible')
            .click();
        this.editTitle
        .should('be.visible')
            .click('topRight');
        this.enterNewTitle
        .should('be.visible')
        .clear()
        .type(newTitle, '{enter}');
        this.editTaskDescription
        .should('be.visible')
            .click();
        this.enterDescription
        .should('be.visible')
            .type(description, '{enter}');
        this.columnOptions
        .should('be.visible')
            .click();
        this.columnSprint
        .should('be.visible')
            .click();
        this.commentField
        .scrollIntoView()
        .should('be.visible')
            .click()
            .type(comment);
        this.publishComment
        .scrollIntoView()
        .should('be.visible')
            .click();
        this.closeModalOfTask
        .should('be.visible')
            .click();
    },

    deleteTask({}) {
        cy.intercept('DELETE','**/api/v2/tasks/**').as('deleteTask');
        this.task.trigger('mouseover');
        this.taskOptions
            .click({force : true});
        this.removeTask
            .should('be.visible')
            .click();
        this.yesButton
            .should('be.visible')
            .click();
        cy.wait('@deleteTask').then((intercept) => {
            expect(intercept.response.statusCode).to.eq(200);
        })

    }
}
