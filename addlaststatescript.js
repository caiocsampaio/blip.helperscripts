module.exports = {
  addLastStateToScripts: (path) => {
    try {
      const readPath = path;

      var fs = require("fs");

      var exportfile = require("./Modules/exportfile");
      var jsonPath = readPath;

      var blipJson = {};

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
      var flow = addlaststate.addlaststatescript(blipJson);

      exportfile.savefile(flow, path);
    } catch (error) {
      console.log(error);
    }
  },
};
