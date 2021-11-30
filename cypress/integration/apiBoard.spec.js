import userApi from "../api/user";
import organizationApi from "../api/organisation";
import boardApi from "../api/board";

describe("Board spec API", () => {
    let userToken
    before(() => {
        userApi.login({ testMessage: "01 - Login via API" }).then((token) => {
            userToken = token
        });
    })
    let organizationId
    it(' 02 - Create org', () => {
        organizationApi.post({
            token: userToken,
            testMessage: "02 - Create org"
        }).then((organizationObject) => {
            organizationId = organizationObject.id
        })
    });

    let boardId
    let boardCode
    it('03 - Create board', () => {
        for (let i = 0; i < 3; i++) {
            boardApi.create({
                token: userToken,
                organizationId: organizationId
            }).then((boardObject) => {
                console.log(boardObject)
                boardId = boardObject.id
                boardCode = boardObject.code
            })
        }
    });
    it('04 Edit board', () => {
        console.log(boardId)
        boardApi.edit({
            token: userToken,
            boardId: boardId,
            boardCode: boardCode
        })
    });
    it('05 Delete board', () => {
        boardApi.delete({
            token: userToken,
            boardId: boardId,
        })
    }); 
    let allBoards
    it("06 - Get all boards", () => {
        boardApi.get({
            token: userToken,
            organizationId: organizationId
        }).then((allB) => {
            console.log(allB)
            allBoards = allB.body
        })
    });
    after(() => {
        allBoards.forEach((board) => {
            boardApi.delete({
                token: userToken,
                boardId: board.id
            })
        })
    })


})
