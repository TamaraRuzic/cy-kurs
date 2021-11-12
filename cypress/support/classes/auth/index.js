class AuthPage  
{
    get emailRegister() {
        return cy.get("form[class='el-form'] > div:nth-child(1) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='email']");
    }
    get passwordRegister() {
        return cy.get("form[class='el-form'] > div:nth-child(2) > div[class='el-form-item__content'] > div[class='el-input'] > input[type='password']");
    }
    get pricingPlan() {
        return cy.get("ul[class='vsp-c-pricing-plan-list vsp-c-pricing-plan-list--annual is-active'] > li:nth-child(1) > a[class='vsp-c-btn vsp-c-btn--secondary vsp-c-btn--nowrap vsp-c-pricing-btn--small']");
    }
    get numOfUser() {
        return cy.get("input[data-vv-as='number of users']");
    }
    get terms() {
        return cy.get("span[class='vs-c-checkbox-check]");
    }
    get monthlyPayment() {
        return cy.get(".vs-c-switch-pricing-plan-list > :nth-child(1) > p");
    }
    get startTrial() {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap vs-c-btn--lg vs-u-font-weight-regular vs-u-font-md']");
    }
    get firstName() {
        return cy.get("input[data-vv-as='first name']");
    }
    get lastName() {
        return cy.get("input[placeholder='Type last name']");
    }
    get companyName() {
        return cy.get("input[placeholder='Type company name']");
    }
    get organizationName() {
        return cy.get("input[placeholder='Type organization name']");
    }
    get finishRegister() {
        return cy.get(".vs-u-text--left > .vs-c-btn");
    }
}

export default new AuthPage();

