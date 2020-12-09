"use strict";

var _uuid = require("uuid");

function kazooLoggerCreator(_ref) {
  var APIKEY = _ref.APIKEY,
    _ref$userId = _ref.userId,
    userId = _ref$userId === void 0 ? (0, _uuid.v4)() : _ref$userId,
    _ref$serverUrl = _ref.serverUrl,
    serverUrl =
      _ref$serverUrl === void 0
        ? "https://diy-log-server.herokuapp.com"
        : _ref$serverUrl;

  if (APIKEY) {
    return function () {
      for (
        var _len = arguments.length, things = new Array(_len), _key = 0;
        _key < _len;
        _key++
      ) {
        things[_key] = arguments[_key];
      }

      // using "disabledLog" as a hacky way to handle react strict mode https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
      if (console.log.name !== "disabledLog") {
        console.log(things);

        (async function () {
          fetch(serverUrl + "/log", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logMessage: things,
              APIKEY: APIKEY,
              userId: userId,
            }),
          });
        })();
      }
    };
  } else {
    console.log("Error from serverLogCreator, no APIKEY provided");
  }
}

module.exports = {
  kazooLoggerCreator,
};
