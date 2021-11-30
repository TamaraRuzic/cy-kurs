import color from "../support/consolecolor"

module.exports = {
    login({
        email = "tamara.ruzic@vivify.com",
        password = "Test1234!",
        statusCode = 200,
        testMessage = ""
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: "POST",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/login",
            body: {
                email: email,
                password: password
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
            response.status === statusCode
            ? color.log(`${testMessage}`, "success")
            : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode);
            return response.body.token
        });
    }
}