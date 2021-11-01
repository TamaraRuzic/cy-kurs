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
    }
}