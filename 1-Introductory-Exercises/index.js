import { HttpServer, WebSocket } from "@aliceo2/web-ui";
import { httpConfig, jwtConfig, connectIdConfig } from "./config_1.js" // config was named this to bypass gitignore
import { getHandler, wsHelloHandler } from "./requestHandler.js";

const app = new HttpServer(httpConfig, jwtConfig, connectIdConfig);

app.addStaticPath("public");
app.get("/hello_world", getHandler);

const webSocket = new WebSocket(app);
webSocket.bind("hello", wsHelloHandler)