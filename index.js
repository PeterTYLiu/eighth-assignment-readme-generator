let inquirer = require("inquirer");
let fs = require("fs");
let axios = require("axios");

(async () => {
  const prompts = [
    {
      type: "input",
      name: "githubUsername",
      message: "Enter your Github username: ",
    },
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
  const githubUser = await axios.get(
    `https://api.github.com/users/${answers.githubUsername}`
  );
  let avatarURL = githubUser.data.avatar_url;
  let safeBadgeContent = answers.license.split(" ").join("%20");

  let readmeContent = `![a badge](https://img.shields.io/badge/license-${safeBadgeContent}-green)
  # ${answers.title}
  ## Description
  ${answers.description}
  # Contents
  1. [License](#license)
  2. [Usage](#usage)
  3. [Contributing](#contributing)
  4. [Tests](#tests)
  5. [Questions](#questions)
  ***
  ## License
  This project is published under the ${answers.license} license.
  ## Usage
  ${answers.usage}
  ## Contributing
  ${answers.contributing}
  ## Tests
  ${answers.tests}
  ## Questions
  ${answers.questions}
  ***
  A project by ${answers.githubUsername}

  ![profile image](${avatarURL})`;

  fs.writeFileSync(`${answers.title}-readme.md`, readmeContent, (err) => {
    if (err) return console.error("Unable to write to file");
    console.log("Successfully created readme");
  });
})();
