import {fetchClient, Observable, WebSocketClient} from '/js/src/index.js';


export default class HelloWorld extends Observable{
    message = "";
    socket = null;
    socketMessage = "";
    constructor(){
        super();
    }

    async helloWorldGet(){
        // For reference, this functions exacly like fetch(), it just adds the JWT to the request.
        let response = await fetchClient("api/hello_world");

        if (response.ok) this.message = await response.text();
        else this.message = "Request failed";
        super.notify();     
    }

    setUpWebSocket() {
        this.socket = new WebSocketClient();
        this.socket.addListener('authed', _ => console.log("Ready for greetings"));
        this.socket.addListener('command', message => this.#commandListener(message));
      }
      
    greetBackend() {
        if (!this.socket.authed) return 'You arn\'t authorised to greet the backend';
        this.socket.sendMessage({command: 'hello', payload: 'The client says hello'});
    }
        
    // private functions        
    #commandListener(message){
        if (message.command === 'hello-back') {
            
            this.socketMessage = message.payload;
            this.notify();
        }
    }
}