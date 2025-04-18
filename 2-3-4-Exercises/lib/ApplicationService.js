class ApplicationService {
    #applicationData = {}
    constructor() {
      this.#applicationData = {
        appName: 'WebUI Workshop',
        year: 2025,
        version: '1.0.0'
      };
    }
  
    getApplicationData() {
      return this.#applicationData;
    }
}

module.exports = { ApplicationService };
  