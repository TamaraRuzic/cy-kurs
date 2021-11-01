module.exports = {
    get myUser() {
        return cy.get ("span[class='vs-c-user-name']");
    },

    get profile() {
        return cy.get(":nth-child(4) > [effect='dark'] > :nth-child(2) > .vs-c-site-logo");
    },

    get logoutButton() {
        return cy.get("button[class='vs-c-btn vs-c-btn--link vs-c-btn--danger']");
    }
}