import {Observable, Loader, RemoteData} from '/js/src/index.js';

export default class About extends Observable {
  requestedTimes;
  loader;
  constructor() {
    super();
    this.details = RemoteData.notAsked(); // Nothing's happening, so notAsked is appropriate for now.
    
    this.requestedTimes = 0;
    this.loader = new Loader();
  }

  async getDetails() {
    this.requestedTimes++;
    this.details = RemoteData.loading();
    this.notify();
    
    const {result, ok} = await this.loader.get("api/application");

    if (ok) {
      this.details = RemoteData.success(result);
    } else {
      this.details = RemoteData.failure("Failed to get application data");
    }
    
    this.notify();
  }
}