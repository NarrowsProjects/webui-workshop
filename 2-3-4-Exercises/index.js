const path = require('path');
const config = require('./config-default.js');

const {HttpServer, WebSocket, WebSocketMessage} = require('@aliceo2/web-ui');

const http = new HttpServer(config.http, config.jwt, config.oAuth);

const ws = new WebSocket(http);

http.addStaticPath(path.join(__dirname, 'public'));

http.get("/application", (_req, res) => {
    application_data = {
        appName: 'WebUI Workshop',
        year: 2025,
        version: '1.0.0'
    }
    
    res.status(200).send(application_data)
})

ws.bind("nr-sender", _ => {
    setInterval(_ => {
        ws.broadcast(new WebSocketMessage(200).setCommand("nr-send").setPayload({socketNr: Math.random()}));
    }, 5000)

    return new WebSocketMessage(200).setCommand("nr-send").setPayload({socketNr: Math.random()});
})

