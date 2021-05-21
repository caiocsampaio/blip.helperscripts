exports.savefile = (function () {
    var fs = require('fs');

    return function (blipJson, fileName, isTxt) {
        try {
            if (isTxt) {
                fs.writeFileSync(`./output/${fileName}.txt`, blipJson, {
                    encoding: 'utf8',
                    flag: 'w+'
                })
            } else {
                fs.writeFileSync(`./output/${fileName}`, JSON.stringify(blipJson), {
                    encoding: 'utf8',
                    flag: 'w+'
                })
            }

        } catch (error) {
            console.log(error);
        }
    }
})()