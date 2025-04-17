import {Observable} from '/js/src/index.js';

export default class About extends Observable {
  requestedTimes;
  constructor() {
    super();
    this.details = {};
    this.requestedTimes = 0;
  }

  getDetails() {
    this.requestedTimes++;
    const result = {
      appName: 'WebUI Workshop',
      year: 2025,
      version: '1.0.0'
    }

    this.details = result;
    this.notify();
  }
}