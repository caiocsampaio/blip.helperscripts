exports.savefile = (function () {
  var fs = require("fs");

  return function (blipJson, path, isTxt) {
    try {
      if (isTxt) {
        fs.writeFileSync(`${path}.txt`, blipJson, {
          encoding: "utf8",
          flag: "w+",
        });
      } else {
        fs.writeFileSync(`${path}`, JSON.stringify(blipJson), {
          encoding: "utf8",
          flag: "w+",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
})();
