const yargs = require("yargs");
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string"
  })
  .option("delete", {
    alias: "d",
    description: "Name of extras to delete from all trackings separeted by blank spaces (eg.: idUser idMessage)",
    type: "array"
  })
  .help()
  .alias("help", "h")
  .argv;

const readPath = argv.r;
const deleteProperties = argv.d;

var addextrastoscripts = function () {
    var fs = require('fs')
    var exportfile = require('./Modules/exportfile')
    var jsonPath = readPath;

    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }

    var addextras = require ('./Modules/addextras')
    let flow = addextras.addextrastoscripts(blipJson, deleteProperties)

    exportfile.savefile(flow)
   
}

addextrastoscripts()
