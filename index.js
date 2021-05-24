const figlet = require("figlet");
const clear = require("clear");
const chalk = require("chalk");
const menu = require("inquirer-menu");
const inquirer = require("./lib/inquirer");
const extras = require("./addextrastoscripts");
const fs = require("fs");
const exec = require('./lib/runner')

const EXTRAS_TYPE = "extras";
const LAST_STATE_TYPE = "lastState";

clear();

console.log(chalk.yellowBright(figlet.textSync("blip helper")));

const runExtras = async () => {
  const answers = await inquirer.askQuestions();
  exec.run(answers, EXTRAS_TYPE);
};

const runLastState = async () => {
  const answers = await inquirer.askQuestions();
  exec.run(answers, LAST_STATE_TYPE);
}

const createMenu = () => {
  return {
    message: "choose your script",
    choices: {
      "add extras": async () => {
        await runExtras();
      },
      "add last state": async () => {
        await runLastState();
      }
    },
  };
};

menu(createMenu)
  .then(function () {
    console.log("bye");
  })
  .catch(function (err) {
    console.log(err.stack);
  });
