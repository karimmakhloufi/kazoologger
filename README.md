# kazoolog

Easy logging (5 min setup) for your js code (node, react, react-native, whatever)

Send your logs to our (or your server) and view them online https://kazoolog.netlify.app/logs/be682c8d-8f71-4695-b518-e81aaa6be846

![alt text](https://i.imgur.com/bizIIRa.png)

## How to use

Generate and copy in a textfile somewhere your api key and your secret url: https://kazoolog.netlify.app/newkeys

Install the npm module:

```
npm install kazoologger
```

Import the function in your application, for example in the index.js file of your react app:

```
import { kazooLoggerCreator } from "kazoologger";
```

After importing the function, export the new instance with your previously generated and saved API KEY:

```
export const kazooLog = kazooLoggerCreator({ APIKEY: "YOURAPIKEY" });
```

You can also specify an userId to distinguish your different clients, for example the expo installation id: https://docs.expo.io/versions/latest/sdk/constants/#constantsinstallationid

```
export const kazooLog = kazooLoggerCreator({
  APIKEY: "YOURAPIKEY",
  userId: "EXPO INSTALLATION ID",
});
```

If you don't specify anything, a uuid will be generated but I suggest you to generate it yourself and store it in localstorage, if you dont do it, a new uuid will be generated on each refresh.
Here is an example on how to generate and store an uuid in localstorage:

```
let userId = localStorage.getItem("kazoologId");
console.log(userId);
if (userId === null) {
  userId = uuidv4();
  localStorage.setItem("kazoologId", userId);
}

export const kazooLog = kazooLoggerCreator({
  APIKEY: "YOURAPIKEY",
  userId: userId,
});

```

This is how the index.js of your React app could look like:

```
import React from "react";
import ReactDOM from "react-dom";
import { v4 as uuidv4 } from "uuid";
import localStorage from "localStorage";
import { kazooLoggerCreator } from "kazoologger";
import App from "./App";

let userId = localStorage.getItem("kazoologId");
console.log(userId);
if (userId === null) {
  userId = uuidv4();
  localStorage.setItem("kazoologId", userId);
}

export const kazooLog = kazooLoggerCreator({
  APIKEY: "YOURAPIKEY",
  userId: userId,
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Now you have to import the function where you want to log things and use it instead of console.log.
For example this is a React component using the kazooLog function:

```
import { kazooLog } from "./index";

const SomeComponent = () => {
  kazooLog({ key: "value", key2: "value3" });
  kazooLog("text message");
  kazooLog("text and object message", { key: "value", key2: "value3" });
  return <p>I'm a component</p>;
};

export default SomeComponent;
```

The logs are still available in your console but they are also sent to a real time updated database you can check out here: https://kazoolog.netlify.app/YOURAPIKEYHERE

Replace YOURAPIKEYHERE with your api key, you should see all your past logs and without needing to refresh, the new logs coming in real time.

Click on a log to view it in full size
