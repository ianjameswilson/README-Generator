const inquirer = require("inquirer");
const fs = require("fs");
const util = require("util");

const writeFileAsync = util.promisify(fs.writeFile);

function promptUser() {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the title of this app?"
        },
        {
            type: "input",
            name: "description",
            message: "Describe the function of this app",
        },
    ])
}

function generateREADME(answers) {
    return `
    # ${answers.title}

    ## Description
    ${answers.description}

    ## Table of Contents

    * [Installation](#installation)
    * [Usage](#usage)
    * [Contributing](#contributing)
    * [Test](#test)
    * [Questions](#questions)

    ## Installation

    To install neccessary dependancies, run the following command:

    
    `
}

async function init() {
    try {
        const answers = await promptUser();

        const text = generateREADME(answers);

        await writeFileAsync("README.md", text);

        console.log("Succesfully written to README.md");
    }   catch(err) {
        console.log(err);
    }
}

init();







