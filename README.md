# kazoolog

Easy logging for your js code (node, react, react-native, whatever)

![alt text](https://i.imgur.com/bizIIRa.png)

## How to use

Generate a new APIKEY here: https://www.uuidtools.com/

install the npm module:

```
npm install kazoologger
```

Import the function in your application, for example in the index.js file of your react app:

```
import { kazooLoggerCreator } from "kazoologger";
```

After importing the function, export the new instance with your API KEY:

```
export const kazooLog = kazooLoggerCreator({ APIKEY: "secret" });
```

You can also specify an userId to distinguish your differnt clients, for example the expo installation id: https://docs.expo.io/versions/latest/sdk/constants/#constantsinstallationid

```
export const kazooLog = kazooLoggerCreator({
  APIKEY: "secret",
  userId: "EXPO INSTALLATION ID",
});
```

If you don't specify anything, a uuid will be generated be I suggest you to generate it yourself and store it in localstorage:

This is how the index.js of your React app could look like:

```
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

import { kazooLoggerCreator } from "kazoologger";

export const kazooLog = kazooLoggerCreator({
  APIKEY: "secret",
  userId: "userId",
});

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);
```

Now you have to import the function where you want to log things and use it instead of console.log, for example this is a react component:

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
