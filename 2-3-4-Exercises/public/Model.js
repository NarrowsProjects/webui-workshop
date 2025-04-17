import {Observable, QueryRouter, Loader, sessionService, WebSocketClient} from '/js/src/index.js';
import Home from './home/Home.js';
import About from './about/About.js';

/**
 * Root of model tree
 * Handle global events: keyboard, websocket and router location change
 */
export default class Model extends Observable {
  /**
   * Load all sub-models and bind event handlers
   */
  home;
  socket=null;
  socketNr=null;
  constructor() {
    super();

    this.session = sessionService.get();
    this.session.personid = parseInt(this.session.personid, 10);

    this.loader = new Loader(this);
    this.loader.bubbleTo(this);

    // Setup router
    this.router = new QueryRouter();
    this.router.observe(this.handleLocationChange.bind(this));
    this.router.bubbleTo(this);

    this.home = new Home();
    this.home.bubbleTo(this); // makes notifications from hom 'visible' to Model.
    this.about = new About();
    this.about.bubbleTo(this);
    this.#webSocketSetup();
    this.handleLocationChange(); // Init first page
  }

  
  openNrStream(){
    if (!this.socket.authed) return "Please wait for authentication.";
    
    this.socket.sendMessage({command: 'nr-sender', payload: 'I would like to subscribe to the random number stream'});
  }
  
  /**
   * Delegates sub-model actions depending on new location of the page
  */
  handleLocationChange() {
    switch (this.router.params.page) {
      case 'home':
        break;
        case 'about':
          break;
          default:
            this.router.go('?page=home');
            break;
           }
  }
   
  // private functions 
  #webSocketSetup(){
    this.socket = new WebSocketClient();
    // When WebSocketClient._handleMessage emits "authed" socket.authed is set to true and the message is printed
    this.socket.addListener("authed", _=> console.log("Ready to send messages."));
    this.socket.addListener("command", message=> this.#messageHandler(message));
  }
      
  #messageHandler(message){
    if (message.command === "nr-send"){
      this.socketNr = message.payload.socketNr;
      
      super.notify();
    }
  }
}
