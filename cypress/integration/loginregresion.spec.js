import userApi from "../api/user"

describe('Api testing', () => {
    let userToken
    it("positive test", () => {
        userApi
        .login({ testMessage: "01 - Login via API" })
            .then((token) => {
                userToken = token
            });
    })

    it('Wrong email without @', () => {
        userApi
            .login({
                email: "tamararvivify.com",
                testMessage: "02 - Login via API",
                statusCode: 401,
            });
    });
    it('Wrong email with space infront', () => {
        userApi
            .login({
                email: "@gmail.com",
                testMessage: "03 - Login via API",
                statusCode: 401,
            });
    });
    it('Wrong pass', () => {
        userApi
            .login({
                password: "@.com",
                testMessage: "04 - Login via API",
                statusCode: 401,
            });
    });
})