'use strict'

var chai        = require('chai')
  , expect      = chai.expect
  , minesweeper = require('../minesweeper');

describe('Minesweeper Tests', function(){
  describe('#isUserFake', function(){

    describe('user with egghead photo', function(){
      it('should work for old twitter layout', function(done){
        minesweeper.isUserFake('mofokengjunior2', function(err, res){
          if (err) return done(err);
          expect(res).to.be.true;
          done();
        });
      });

      it('should work for new twitter layout', function(done){
        minesweeper.isUserFake('BoilingSunshine', function(err, res){
          if (err) return done(err);
          expect(res).to.be.true;
          done();
        });
      });
    });

    describe('user following 2001 users (following limit)', function(){
      it('should work for new layout', function(done){
        minesweeper.isUserFake('ednilsonsb', function(err, res){
          if (err) return done(err);
          expect(res).to.be.true;
          done();
        });
      });
    });
  });
});
