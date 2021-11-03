module.exports = {
    get myUser() {
        return cy.get ("span[class='vs-c-user-name']");
    },

    get profile() {
        return cy.get(":nth-child(4) > [effect='dark'] > :nth-child(2) > .vs-c-site-logo");
    },

    get logoutButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']");
    },
    get organizationSettings() {
        return cy.get("div[class='vs-l-project__menu'] > ul[class='vs-c-list'] > li:nth-child(8)");
    },
    get addNewTopSidebar() {
        return cy.get("div[class='vs-c-list__btn el-tooltip vs-c-list-btn--new-workspace']");
    },
    get addBoard() {
        return cy.get("div[class='el-tooltip__popper is-light el-tooltip-sidebar'] > div[class='vs-c-tooltip-active-sprints'] > ul[class='vs-c-list'] > li:nth-child(2)");
    },
    get boardConfiguration() {
        return cy.get(":nth-child(10) > span > div > .vs-c-site-logo");
    }
}
