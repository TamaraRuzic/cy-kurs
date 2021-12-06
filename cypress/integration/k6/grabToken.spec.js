import userApi from "../../api/user";
import data from "../../fixtures/datak6.json"

describe('Grab token', () => {
    let userToken = {}
    it("user login", () => {
        for (const [key, value] of Object.entries(data.accounts)) {
            console.log(data.accounts);
            userApi
                .login({email : value.email, password : value.password, testMessage: " Login via API" })
                .then((token) => {
                    userToken[key] = token;
                });
        }

    });
    console.log(userToken)

    it('log', () => {
        cy.writeFile('k6/token.json', [userToken]);
    })
});