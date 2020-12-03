const yargs = require("yargs");
const argv = yargs
  .option("read", {
    alias: "r",
    description: "Input json path",
    type: "string"
  })
  .help()
  .alias("help", "h")
  .argv;



var addextrastoscripts = function () {
    var readPath = argv.r ? argv.r : argv._[0];
    
    var fs = require('fs')
    var exportfile = require('./Modules/exportfile')
    var jsonPath = readPath;
    
    var blipJson = {}

    try {
      blipJson = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
    } catch (error) {
      console.log(error)
    }
    var mint = require ('./Modules/finalizacoesMint')
    let mintBlocks = mint.findMintFinalizacoes(blipJson);

    let pathLength = readPath.split('\\').length
    exportfile.savefile(mintBlocks, 'mint_' + readPath.split('\\')[pathLength - 1])
   
}

addextrastoscripts()
