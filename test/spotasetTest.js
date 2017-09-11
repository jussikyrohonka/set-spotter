'use strict';

var expect = require('chai').expect;

var spotaset = require('../app/spotaset.js');

describe('Spotaset', function() {
  describe('run', function() {
    it('should run', function() {
	spotaset.run();
    });
  });
});
