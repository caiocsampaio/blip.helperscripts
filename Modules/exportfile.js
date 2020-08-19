exports.savefile = (function () {
    var fs = require('fs');

    return function (blipJson, fileName) {
        try {
            fs.writeFileSync(`./output/${fileName}`, JSON.stringify(blipJson), {
                encoding: 'utf8',
                flag: 'w+'
            })
        } catch (error) {
            console.log(error);
        }
    }
})()