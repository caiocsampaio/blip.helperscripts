exports.addTimeout = (function () {
  return function (blipJson, timeout) {
    try {
      var fs = require("fs");
      Object.keys(blipJson).forEach(function (k) {
        var blipblock = blipJson[k];
        if (!blipblock.$enteringCustomActions.find((action) => action.type == "Redirect")) {
          var inputAction = blipblock.$contentActions.find((action) => action.input).input;
          if (inputAction) {
            var hours = 0;
            if (timeout > 60) {
              var hours = Math.floor(timeout / 60);
              var minutes = timeout - hours * 60;
            } else {
              var minutes = timeout;
            }
            inputAction.expiration = `${hours}:${minutes}`;
          }
        }
      });
      return blipJson;
    } catch (error) {
      console.log(error);
    }
  };
})();
