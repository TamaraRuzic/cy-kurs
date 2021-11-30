import faker from "faker";
import color from "../support/consolecolor";


module.exports = {
    get({token = ""}) {
        return cy.request({
            method : "GET",
            url : "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations-data",
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            expect(response.status).to.eq(200)
            console.log(response)
        })
    },
    post({ orgName = faker.animal.bear(),
        token = "2222",
        statusCode = 200,
        testMessage = "" }) {
        console.log(token)
        return cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations",
            body: {
                name: orgName,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? color.log(`${testMessage}`, "success")
                : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            console.log(response);
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    },

    edit({
        token ="",
        orgId = "",
        statusCode = "",
        orgName = faker.random.word()
    }) {
        return cy.request({
            method : "PUT",
            url : `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body : {
                name : orgName
            },
            headers : {
                Authorization : `Bearer ${token}`
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? color.log(`${testMessage}`, "success")
                : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            console.log(response);
            expect(response.status).to.eq(statusCode)
            return response.body
        })
    },

    delete({
        token = "",
        orgId = '',
        statusCode = 201,
        testMessage = "",
        password = "Test1234!"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${orgId}`,
            body: {
                passwordOrEmail: password,
            },
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? color.log(`${testMessage}`, "success")
                : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            console.log(response);
            expect(response.status).to.eq(statusCode)
        })
    }
}
