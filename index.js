let inquirer = require("inquirer");
let fs = require("fs");
// let axios = require("axios");  Not required since we are no longer getting users' github info

let ask = async () => {
  const prompts = [
    {
      type: "input",
      name: "title",
      message: "Enter your project title: ",
    },
    {
      type: "input",
      name: "description",
      message: "Enter a short description for your project: ",
    },
    {
      type: "input",
      name: "usage",
      message: "Write some installation instructions: ",
    },
    {
      type: "list",
      name: "license",
      message: "Enter the license this project will pe published under: ",
      choices: ["MIT", "Apache 2.0", "GPLv3", "BSD 3", "Unspecified"],
    },
    {
      type: "input",
      name: "contributing",
      message: "How can others contribute to this project? ",
    },
    {
      type: "input",
      name: "tests",
      message: "How does one test the project? ",
    },
    {
      type: "input",
      name: "questions",
      message: "What are some FAQs? ",
    },
  ];
  const answers = await inquirer.prompt(prompts);

  console.log(answers);

  let readmeContent = `# ${answers.title}
  ![a badge](https://img.shields.io/badge/license-${answers.license}-green)
  ## ${answers.description}`;

  fs.writeFileSync(`${answers.title}-readme.md`, readmeContent, (err) => {
    if (err) return console.error("Unable to write to file");
    return console.log("Successfully created readme");
  });
};

ask();
