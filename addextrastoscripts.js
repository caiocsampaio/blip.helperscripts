module.exports = {
  addExtrasToScripts: (path, deleteProperties, overwrite, overwriteAll) => {
    const readPath = path;

    var fs = require("fs");

    var exportfile = require("./Modules/exportfile");
    var jsonPath = readPath;

    var blipJson = {};

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, "utf8"));
    } catch (error) {
      console.log(error);
    }

    if (!blipJson) {
      console.log("Unable to parse BlipJSON");
      return null;
    }
    
    var addextras = require("./Modules/addextras");
    let flow = addextras.addextrastoscripts(blipJson, deleteProperties, overwrite, overwriteAll);

    exportfile.savefile(flow, path);
  },
};
