import { describe, it } from 'mocha';
import { expect } from 'chai';
import { ApplicationService } from '../lib/ApplicationService.js';

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