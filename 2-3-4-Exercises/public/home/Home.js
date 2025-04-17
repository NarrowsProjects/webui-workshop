import {Observable} from '/js/src/index.js';

export default class Home extends Observable{
  userName;

  constructor(){
    super();
    this.userName = "Guust"
  }

  getUserName(){
    return this.userName;
  }

  setUserName(userName){
    this.userName = userName;
    super.notify()
  }

}