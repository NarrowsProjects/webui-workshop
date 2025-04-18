const { describe, it } = require('mocha');
const { expect } = require('chai');
const { ApplicationService } = require('../lib/ApplicationService.js');

describe('ApplicationService', () => {
  describe('getApplicationData', () => {
    it('should return the application data object', () => {
      const service = new ApplicationService();
      const result = service.getApplicationData();
      
      expect(result).to.deep.equal({
        appName: 'WebUI Workshop',
        year: 2025,
        version: '1.0.0'
      });
    });
  });
});