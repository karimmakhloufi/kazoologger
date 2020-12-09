import { v4 as uuidv4 } from "uuid";

const kazooLoggerCreator = ({
  APIKEY,
  userId = uuidv4(),
  serverUrl = "https://diy-log-server.herokuapp.com",
}) => {
  if (APIKEY) {
    return (...things) => {
      // using "disabledLog" as a hacky way to handle react strict mode https://reactjs.org/docs/strict-mode.html#detecting-unexpected-side-effects
      if (console.log.name !== "disabledLog") {
        console.log(things);
        (async () => {
          fetch(serverUrl + "/log", {
            method: "POST",
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              logMessage: things,
              APIKEY,
              userId,
            }),
          });
        })();
      }
    };
  } else {
    console.log("Error from serverLogCreator, no APIKEY provided");
  }
};

export default kazooLoggerCreator;
