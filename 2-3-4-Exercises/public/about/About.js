import {Observable, Loader} from '/js/src/index.js';

export default class About extends Observable {
  requestedTimes;
  loader;
  constructor() {
    super();
    this.details = {};
    this.requestedTimes = 0;
    this.loader = new Loader();
  }

  async getDetails() {
    this.requestedTimes++;
    const {result, ok} = await this.loader.get("/api/application")

    if (ok) this.details = result;
    else this.details = { error: "Failed to get application data." }
    
    this.notify();
  }
}