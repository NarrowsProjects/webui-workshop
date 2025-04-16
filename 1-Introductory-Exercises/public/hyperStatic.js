import {h} from '/js/src/index.js';


export default function hyperstaticComponent(HelloWorld){
    return h(".container.flex-column.align-items-center",[
        h("h1", "Hello World"),
        h("h2", HelloWorld.message),
        h("h3", HelloWorld.socketMessage),
        h("button.btn-primary", { onclick: _=> HelloWorld.helloWorldGet() }, "Get message"),
        h("button.btn-primary", { onclick: _=> HelloWorld.greetBackend() }, "Greet the backend")
    ])
}