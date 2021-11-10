import boardModule from "../models/boardModule";
import columnModule from "../models/columnModule";
import taskModule from "../models/taskModule.js";



describe('Board test block', () => {
   
    beforeEach('login', () => {
        cy.visit('/');
        cy.login({});
        boardModule.createBoard({});
    });

    afterEach('delete board', () => {
        cy.deleteBoard({});
        cy.url().should('include', 'organizations')
    });

    it('create a new column', () => {
        columnModule.addNewColumn({});
    });

    it('create a new task', () => {
        taskModule.createTask({})
    });

    it('edit task', ()=> {
        taskModule.editTask({});
    });

    it('delete task', () => {
        taskModule.deleteTask({});
    });

    it.only('edit board basic info failed - title and code required', () => {
        boardModule.editBoard({title : ''});
    });

    it('edit board basic info successfully', () => {
        boardModule.editBoard({});
    });

    // it('start sprint', () => {
    //     cy.get(column.moreOptions).click();
    //     cy.get(column.startSprint).click();
    //     cy.get(column.spintModule.sprintDuration).click();
    //     cy.get(column.spintModule.from).click();
    //     cy.get(column.spintModule.to).click();
    //     cy.get(column.spintModule.sprintGoal)
    //         .click()
    //         .type(data.sprint.sprintGoal);
    //     cy.get(column.spintModule.start).click();
    // });

    // it('archive board', () => {
    //     cy.get(board.boardSidebar.settings, { timeout: 3000 }).click();
    //     cy.get(board.boardSettings.archiveBoard).click();
    //     cy.get(board.boardSettings.confirmButton).click();
    //     cy.get(board.boardSettings.boardModalClose).click();
    //     cy.get('p[class="vs-c-organization__section-message"]').should('not.exist');
    //     cy.get(organisation.organisationCard.unarchiveBoard).click();
    //     cy.get(board.boardSettings.reopenBoard).click();
    //     cy.get(board.boardSettings.confirmButton).click();
    //     cy.url().should('include', '/boards/');
    // });

})
