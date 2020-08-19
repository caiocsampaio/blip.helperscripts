const yargs = require("yargs");
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string",
  })
  .help()
  .alias("help", "h").argv;

var addlaststatescript = function () {
  const readPath = argv.r ? argv.r : argv._[0];

  try {
    var blipJson = {};
    var fs = require("fs");
    var exportfile = require("./Modules/exportfile");
    var jsonPath = process.argv[2];
    var addToAll = process.argv[3];
    var addJustUserInteraction = process.argv[4];

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath));
    } catch (error) {
      console.log(error);
    }

    if (!blipJson) {
      console.log("Unable to parse BlipJSON");
      return null;
    }
    var addlaststate = require("./Modules/addlaststate");
    var flow = addlaststate.addlaststatescript(
      blipJson,
      addToAll,
      addJustUserInteraction
    );

    let pathLength = readPath.split("\\").length;
    exportfile.savefile(flow, readPath.split("\\")[pathLength - 1]);
  } catch (error) {
    console.log(error);
  }
};

addlaststatescript();
