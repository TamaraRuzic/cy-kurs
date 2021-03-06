import http from "k6/http";
import {check} from "k6";
const tokens = open('token.json');

export let options = {
    insecureSkipTLSVerify: true,
    noConnectionReuse: false,
    stages: [
        {duraton : "10s", target : 10},
        {duraton : "10s", target : 30},
        {duraton : "10s", target : 50},
        {duraton : "10s", target : 80},
        {duraton : "10s", target : 1200},
        {duraton : "10s", target : 80},
        {duraton : "10s", target : 50},
    ],
    thresholds : {
        http_req_duration : ["p(90) < 4000", "p(95) < 6000", "p(99.9) < 8000"],
        http_req_failed : ["rate<0.01"]
    }
};

export default function() {
    let token = JSON.parse(tokens)
    let res = http.get(
        "https://cypress-api.vivifyscrum-stage.com/api/v2/my-organizations",
        {
            headers : {
            Authorization : `${token.admin}`
        }
    });
    check(res, {
        "status is 200" : (r) => r.status === 200
    })
};