// import data from "../fixtures/data.json";
// import sidebar from "../models/sidebarModule";



// module.exports = {
//     get passwordRequired() {
//         return cy.get(":nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error");
//     },

//     get emailLogin () {
//         return cy.get("form[class='el-form'] > div:nth-child(1) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='email']");
//     },

//     get passwordLogin() {
//         return cy.get("form[class='el-form'] > div:nth-child(2) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='password']");
//     },

//     get submitBtn() {
//         return cy.get("button[type='submit']");
//     },


    // ** PREBACENO U Commands, ali moze i na ovaj nacin u modulima

    // login({mail = data.user.email, password = data.user.password}) {
    //     if(mail == "") {
    //         this.passwordLogin.should('be.visible').type(password);
    //         this.submitBtn.click();
    //     } else if(password == ""){
    //         this.emailLogin.should('be.visible').type(mail);
    //         this.submitBtn.click();
    //     } else{
    //         cy.intercept("POST", "**api/v2/login").as('login');
    //     this.emailLogin.should('be.visible').type(mail);
    //     this.passwordLogin.should('be.visible').type(password);
    //     this.submitBtn.click();
    //     if(mail == data.user.email && password == data.user.password) {
    //         cy.wait('@login').then((intercept) => {
    //             expect(intercept.response.statusCode).to.eq(200);
    //         })
    //     }
    //     }
    // },

    // logout(){
    //     cy.intercept("POST", "**/api/v2/logout").as('logout');
    //     sidebar.myUser.should('be.visible').click();
    //     sidebar.profile.should('be.visible').click();
    //     sidebar.logoutButton.should('be.visible').click();
    //     cy.wait('@logout').then((intercept) => {
    //         expect(intercept.response.statusCode).to.eq(201);
    //     })
    // }
//}
