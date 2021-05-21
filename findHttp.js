const yargs = require("yargs");
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string"
  })
  .option("title", {
    alias: "t",
    description: "Saves only the titles of each block as list",
    type: "bool"
  })
  .option("url", {
    alias: "u",
    description: "Saves only the URLs of each block as list",
    type: "bool"
  })
  .help()
  .alias("help", "h")
  .argv;



var addextrastoscripts = function () {
    const readPath = argv.r ? argv.r : argv._[0];
    const isTitleOnly = argv.t;
    const isUrlOnly = argv.u;
    
    var fs = require('fs')
    var exportfile = require('./Modules/exportfile')
    var jsonPath = readPath;
    
    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }
    var http = require ('./Modules/http')
    let httpBlocks = http.findHttp(blipJson, isTitleOnly, isUrlOnly);

    let pathLength = readPath.split('\\').length
    exportfile.savefile(httpBlocks, 'http_' + readPath.split('\\')[pathLength - 1].split('.')[0], isUrlOnly)
   
}

addextrastoscripts()
