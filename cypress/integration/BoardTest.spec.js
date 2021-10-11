import loginPage from "../fixtures/login.json";
import data from "../fixtures/data.json";
import sidebar from "../fixtures/sidebar.json";
import board from "../fixtures/board.json";
import organisation from "../fixtures/organisation.json";



describe ('Board test block', () => {
    it('login', () => {
        cy.visit('/');
        cy.get(loginPage.loginEmail).clear().type(data.user.email);
        cy.get(loginPage.loginPass).clear().type(data.user.password);
        cy.get(loginPage.submitBtn).click();
    });

    it('cancel create board', () => {
        cy.get(sidebar.addNewTop).click();
        cy.get(sidebar.addBoard).click();
        cy.get(board.addBoard.selectOrganisation).click();
        cy.get(board.addBoard.selectDropdownItem).click();
        cy.get(board.addBoard.enterBoardName).type(data.newBoard.boardName);
        cy.get(board.addBoard.closeModalBtn).click();
    })

    it('create board', () => {
        cy.get(sidebar.addNewTop).click();
        cy.get(sidebar.addBoard).click();
        cy.get(board.addBoard.selectOrganisation).click();
        cy.get(board.addBoard.selectDropdownItem).click();
        cy.get(board.addBoard.enterBoardName).type(data.newBoard.boardName);
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.kanbanType).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
        cy.get(board.addBoard.nextButton).click();
    })

    it('edit board basic info failed - title required', () => {
        cy.get(board.boardSidebar.settings, {timeout : 3000}).click();
        cy.get(board.boardSettings.boardTitle).clear();
        cy.get(board.boardSettings.boardDescription).type(data.newBoard.boardDesc);
        cy.get(board.boardSettings.updateBasicInfo).click();
    });

    it('edit board basic info failed - code required', () => {
        cy.get(board.boardSettings.boardTitle).type(data.newBoard.newTitle);
        cy.get(board.boardSettings.boardCode).clear();
        cy.get(board.boardSettings.boardDescription).clear().type(data.newBoard.boardDesc);
        cy.get(board.boardSettings.updateBasicInfo).click();
    });

    it('edit board basic info successfully', () => {
        cy.get(board.boardSettings.boardTitle).clear().type(data.newBoard.newTitle);
        cy.get(board.boardSettings.boardCode).type(data.newBoard.code);
        cy.get(board.boardSettings.boardDescription).clear().type(data.newBoard.boardDesc);
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
        cy.get(board.boardSidebar.settings).click()
        cy.get(organisation.organisationSidebar.boards, {timeout : 5000}).click();
        cy.get(board.boardSettings.deleteBoard).click();
        cy.get(board.boardSettings.confirmButton).click();
    });
})