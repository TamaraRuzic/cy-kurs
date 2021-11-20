
const cypress = require('cypress');
const fse = require('fs-extra');
const {merge} = require('mochawesome-merge');
const generate = require('mochawesome-report-generator');

async function runTests() {
    await fse.remove('mochawesome-report');  
    const {totalFailed} = await cypress.run(); 
    const jsonReport = await merge(); 
    await generate.create(jsonReport); 
    process.exit(totalFailed); 
}

runTests();
