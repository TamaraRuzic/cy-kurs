import faker from "faker";
import color from "../support/consolecolor";

module.exports = {
    get({
        token = "",
        testMessage = "Get all",
        statusCode = 200,
        organizationId = ""
    }) {
        return cy.request({
            method: "GET",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/organizations/${organizationId}/boards-data`,
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((response) => {
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? color.log(`${testMessage}`, "success")
                : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(200)
            console.log(response)
            return response
        })
    },
    create({
        token = "",
        organizationId = "",
        boardName = faker.random.word(),
        statusCode = 201,
        testMessage = "Create Board"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: "POST",
            url: "https://cypress-api.vivifyscrum-stage.com/api/v2/boards",
            body: {
                configuration_board_id: null,
                name: boardName,
                organization_id: organizationId,
                team_members_board_id: null,
                type: "scrum_board"
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
        token = "",
        boardId = "",
        name = faker.random.word(),
        boardCode = "",
        statusCode = 200,
        testMessage = "Edit Board"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: "PUT",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            body: {
                code: boardCode,
                description: null,
                name: name,
                task_unit: "points"
            },
            headers: {
                Authorization: `Bearer ${token}`
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
    delete({
        token = "",
        boardId = "",
        statusCode = 200,
        testMessage = "Delete Board thru API"
    }) {
        return cy.request({
            failOnStatusCode: false,
            method: "DELETE",
            url: `https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}`,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }).then((response) => {
            typeof response.status !== "undefined" &&
                response.status === statusCode
                ? color.log(`${testMessage}`, "success")
                : color.log(`${testMessage} ${JSON.stringify(response)}`, "error");
            expect(response.status).to.eq(statusCode)
        })
    }
}
