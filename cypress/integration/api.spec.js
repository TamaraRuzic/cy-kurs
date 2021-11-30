import userApi from "../api/user";
import organizationApi from "../api/organisation";


describe('Api testing', () => {
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
    
    it("03 - Delete org", () => {
        organizationApi.delete({
            token: userToken,
            orgId : organizationId
        })
    });
    let allOrganizations
    it("04 - Get all org", () => {
        organizationApi.get({
            token: userToken
        }).then((allOrg) => {
            allOrganizations = allOrg.body;
        })
    });

    after (() => {
        console.log(allOrganizations);
        allOrganizations.forEach((org) => {
            organizationApi.delete({
                token: userToken,
                orgId : org.id
            })
        });
    });
})