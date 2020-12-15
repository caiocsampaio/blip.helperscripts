const yargs = require("yargs");
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string",
  })
  .option("timeout", {
    alias: "t",
    description: "Time to wait for input, in minutes. Default value = 1",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

var addlaststatescript = function () {
  let readPath = argv.r ? argv.r : argv._[0];

  try {
    var blipJson = {};
    var fs = require("fs");
    var exportfile = require("./Modules/exportfile");
    var timeout = argv.t ? argv.t : 1;

    try {
      blipJson = JSON.parse(fs.readFileSync(readPath));
    } catch (error) {
      console.log(error);
    }

    if (!blipJson) {
      console.log("Unable to parse BlipJSON");
      return null;
    }

    var addTimeout = require("./Modules/addTimeout");
    var flow = addTimeout.addTimeout(blipJson, timeout);

    let pathLength = readPath.split("\\").length;
    exportfile.savefile(flow, 'timeouts_' + readPath.split("\\")[pathLength - 1]);
  } catch (error) {
    console.log(error);
  }
};

addlaststatescript();
