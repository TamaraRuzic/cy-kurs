class Organisation {
    get addOrganizaton() {
        return cy.get("div[class='vs-c-my-organization vs-c-my-organization--add-new not-sortable']");
    }
    get organizationName() {
        return cy.get("input[placeholder='Enter name...']");
    }
    get nextButton() {
        return cy.get("div[class='dialog-footer'] > button:nth-child(3)");
    }
    get okButton() {
        return cy.get(".vs-c-modal--features-button > .vs-c-btn");
    }
    get delOrganization() {
        return cy.get("button[class='vs-c-btn vs-c-btn--warning vs-c-btn--spaced']");
    }
    get confirmPasswordToDelete() {
        return cy.get("input[type='password']");
    }
    get submitDelete() {
        return cy.get("button[class='el-button el-button--success el-button']");
    }
    get closeModalDelete() {
        return cy.get("button[class='el-button el-button el-button--text el-button--mini el-button--default el-button--mini']");
    }
    get nameOfOrganization() {
        return cy.get("input[placeholder='Enter name...']");
    }
    get modayCheckbox() {
        return cy.get("div[class='vs-u-pull-left-keep-right'] >div:nth-child(1) [type='checkbox']");
    }
    get fridayCheckbox() {
        return cy.get(":nth-child(5) > .vs-c-checkbox-list-item > .vs-c-checkbox-list-item__check-container > .vs-c-checkbox > .vs-c-checkbox-check");
    }
    get startWeekDay() {
        return cy.get("div[class='vs-c-settings-organization'] > div:nth-child(3) [class='vs-c-btn vs-c-btn--link']");
    }
    get startWithModay() {
        return cy.get("ul[class='el-dropdown-menu vs-c-users-stats-dropdown'] > li:nth-child(1)");
    }
    get daysVacation() {
        return cy.get("input[name='vacationDays']");
    }
    get numOfWorkingMonths() {
        return cy.get("input[name='numOfWorkingMonthsForAdditionalDays']");
    }
    get additionalVacationDays() {
        return cy.get("input[name='additionalVacationDays']");
    }
    get submitName() {
        return cy.get(".vs-c-settings-section-form > .el-form > .vs-u-position-relative > .vs-u-text--left > .vs-c-btn");
    }
    get errorNameRequired() {
        return cy.get(".vs-c-settings-section-form > .el-form > .el-form-item > .vs-c-form-item__error-wrapper > .el-form-item__error");
    }
    get errorVacationDaysRequired() {
        return cy.get(".vs-c-config-vacation-days > .el-form > :nth-child(1) > .vs-c-form-item__error-wrapper > .el-form-item__error");
    }
    get errorWorkingMonthsRequired() {
        return cy.get(".vs-c-config-vacation-days > .el-form > :nth-child(2) > .vs-c-form-item__error-wrapper > .el-form-item__error");
    }
    get errorAdditionalDaysRequired() {
        return cy.get(".vs-c-config-vacation-days > .el-form > :nth-child(3) > .vs-c-form-item__error-wrapper > .el-form-item__error");
    }
    get middleNextYear() {
        return cy.get("div[class='el-select-dropdown__wrap el-scrollbar__wrap el-scrollbar__wrap--hidden-default']> ul > li:nth-child(3)");
    }
    get expirationVacationPeriod() {
        return cy.get("input[placeholder='Select acation days expiration date...']");
    }
    get submitVacation() {
        return cy.get("button[class='vs-c-btn vs-c-btn--primary vs-c-btn--spaced vs-u-font-weight-bold vs-c-btn-auth--top-gap']");
    }

}
    
export default new Organisation();