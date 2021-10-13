import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import board from "../fixtures/board.json";
import organisation from "../fixtures/organisation.json";
import task from "../fixtures/task.json";
import column from "../fixtures/column.json";

describe('Board test block', () => {
    it('login', () => {
        cy.visit('/');
        cy.get(loginPage.loginEmail)
            .clear()
            .type(data.user.email);
        cy.get(loginPage.loginPass)
            .clear()
            .type(data.user.password);
        cy.get(loginPage.submitBtn).click();
    });

    it('cancel create board', () => {
        cy.get(sidebar.addNewTop).click();
        cy.get(sidebar.addBoard).click();
        cy.get(board.addBoard.selectOrganisation).click();
        cy.get(board.addBoard.selectDropdownItem).click();
        cy.get(board.addBoard.enterBoardName).type(data.newBoard.boardName);
        cy.get(board.addBoard.closeModalBtn).click();
    });

    it('create board', () => {
        cy.get(sidebar.addNewTop).click();
        cy.get(sidebar.addBoard).click();
        cy.get(board.addBoard.selectOrganisation).click();
        cy.get(board.addBoard.selectDropdownItem).click();
        cy.get(board.addBoard.enterBoardName).type(data.newBoard.boardName);
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.scrumType).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
    });

    it('create a new column', () => {
        cy.get(column.add).click();
        cy.get(column.head)
        .type(data.newColumn.columnName)
        .type('{enter}');
    });

    it('create a new task', () => {
        cy.get(task.newTask.addTask)
        .invoke('show')
        .click();
        cy.get(task.newTask.title)
        .type(data.tasks.title)
        .type('{enter}');
    });

    it('edit task type', () => {
        cy.get(task.editTask.taskCard).click();
        cy.get(task.editTask.type).click();
        cy.get(task.editTask.taskType).click();
    })

    it('edit task title', () => {
        cy.get(task.editTask.title)
        .click('topRight');
        cy.get(task.editTask.enterTitle)
        .clear()
        .type(data.tasks.titleSecond);
        cy.get(task.editTask.save).click();
    });

    it('edit task description', () => {
        cy.get(task.editTask.editDescription).click();
        cy.get(task.editTask.description).type(data.tasks.description);
        cy.get(task.editTask.save);
    });

    it('move to another column and add a comment', () => {
        cy.get(task.editTask.columnDropdown).click();
        cy.get(task.editTask.sprint1).click();
        cy.get(task.editTask.commentArea)
        .click()
        .type(data.tasks.comment);
        cy.get(task.editTask.postComment).click();
        cy.get(task.editTask.closeTaskModal).click();
    });

    it('delete task', () => {
        cy.get(task.editTask.firstTask).trigger('mouseover');
        cy.get(task.taskCard.moreOptions)
        .click({force : true});
        cy.get(task.taskCard.delete).click();
        cy.get(task.taskCard.deleteModalButtons.yes).click();
    });

    it('start sprint', () => {
        cy.get(column.moreOptions).click();
        cy.get(column.startSprint).click();
        cy.get(column.spintModule.sprintDuration).click();
        cy.get(column.spintModule.from).click();
        cy.get(column.spintModule.to).click();
        cy.get(column.spintModule.sprintGoal)
        .click('')
        .type(data.sprint.sprintGoal);
        cy.get(column.spintModule.start).click()
    });

    it('edit board basic info failed - title required', () => {
        cy.get(board.boardSidebar.settings, { timeout: 3000 }).click();
        cy.get(board.boardSettings.boardTitle).clear();
        cy.get(board.boardSettings.boardDescription).type(data.newBoard.boardDesc);
        cy.get(board.boardSettings.updateBasicInfo).click();
    });

    it('edit board basic info failed - code required', () => {
        cy.get(board.boardSettings.boardTitle).type(data.newBoard.newTitle);
        cy.get(board.boardSettings.boardCode).clear();
        cy.get(board.boardSettings.boardDescription)
            .clear()
            .type(data.newBoard.boardDesc);
        cy.get(board.boardSettings.updateBasicInfo).click();
    });

    it('edit board basic info successfully', () => {
        cy.get(board.boardSettings.boardTitle)
            .clear()
            .type(data.newBoard.newTitle);
        cy.get(board.boardSettings.boardCode).type(data.newBoard.code);
        cy.get(board.boardSettings.boardDescription)
            .clear()
            .type(data.newBoard.boardDesc);
        cy.get(board.boardSettings.updateBasicInfo).click();
    });

    it('archive board', () => {
        cy.get(board.boardSettings.archiveBoard).click();
        cy.get(board.boardSettings.confirmButton).click();
        cy.get(board.boardSettings.boardModalClose).click();
    });

    it('activate board again', () => {
        cy.get(organisation.organisationCard.unarchiveBoard).click();
        cy.get(board.boardSettings.reopenBoard).click();
        cy.get(board.boardSettings.confirmButton).click();
    });

    it('delete board', () => {
        cy.get(board.boardSidebar.scrumBoardSettings).click();
        cy.get(board.boardSettings.deleteBoard).click();
        cy.get(board.boardSettings.confirmButton).click();
        cy.get(board.boardSettings.boardsModal).click();
    });
})
