import { LogManager, WebSocketMessage} from "@aliceo2/web-ui";
const log = LogManager.getLogger("Hello")

export function getHandler(_req, res){
    let response = "Hello World!"

    res.status(200).send(response);
}

export function wsHelloHandler(message){
    log.infoMessage(message._payload)
    
    const response = new WebSocketMessage(200);
    response.payload = "Hello to you too";
    response.setCommand("hello-back");

   return response;
}