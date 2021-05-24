const fs = require("fs");
const extras = require("../addextrastoscripts");
const lastState = require("../addlaststatescript");
const chalk = require("chalk");
const { exception } = require("console");

const runExtras = (path) => {
  extras.addExtrasToScripts(path);
};

const runLastState = (path) => {
  lastState.addLastStateToScripts(path);
};

module.exports = {
  run: (answers, type) => {
    const path = answers.path.replace(/"/g, "");
    const files = fs.readdirSync(path);
    files.forEach((file) => {
      try {
        if (!type) {
          throw new exception();
        }
        const fullPath = `${path}\\${file}`;
        if (type == "extras") {
          runExtras(fullPath);
        } else if (type == "lastState") {
          runLastState(fullPath);
        }
        console.log(`${chalk.green("DONE >> ")}${file}`);
      } catch (error) {
        console.log(`${chalk.red("ERROR >> ")}${file}`);
      }
    });
  },
};
