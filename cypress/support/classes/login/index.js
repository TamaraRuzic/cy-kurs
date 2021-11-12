class Signin {
    get passwordRequired() {
        return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error");
    }

    get emailLogin () {
        return cy.get("form[class='el-form'] > div:nth-child(1) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='email']");
    }

    get passwordLogin() {
        return cy.get("form[class='el-form'] > div:nth-child(2) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='password']");
    }

    get submitBtn() {
        return cy.get("button[type='submit']");
    }
}

export default new Signin();