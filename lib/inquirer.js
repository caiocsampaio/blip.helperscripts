const inquirer = require("inquirer");
const fs = require("fs");
const ph = require("path");
const chalk = require("chalk");

module.exports = {
  askQuestions: () => {
    const questions = [
      {
        name: "path",
        type: "input",
        message: "Path to json file:",
        validate: function (path) {
          try {
            let test = [];
            let result = true;
            const files = fs.readdirSync(path.replace(/"/g, "").replace(/\w*.json/, ""));

            if (files.length == 0) {
              result = "Empty folder";
            } else {
              let invalidFiles = [];

              files.forEach((file) => {
                if (ph.extname(file) != ".json") {
                  invalidFiles.push(file);
                }
              });

              if (invalidFiles.length > 0) {
                let str = "Invalid file(s):";
                invalidFiles.forEach((file) => {
                  str += chalk.red(`\n>> `);
                  str += `${file}`;
                });

                str += chalk.yellow(`\n>> `);
                str += "Please remove them or choose another path and try again";
                
                result = str;
              }
            }

            return result;
          } catch (error) {
            return "Invalid path";
          }
        },
      },
    ];
    return inquirer.prompt(questions);
  },
};
