'use strict'

var chai        = require('chai')
  , expect      = chai.expect
  , minesweeper = require('../minesweeper');

describe('Minesweeper Tests', function(){
  this.timeout(5000);
  describe('#isUserFake', function(){

    describe('non-fake user', function(){
      it('should return false for user with old layout', function(done){
        minesweeper.isUserFake('the_mrap', function(err, res){
          if (err) return done(err);
          expect(res).to.be.false;
          done();
        });
      });

      it('should return false for user with new layout', function(done){
        minesweeper.isUserFake('johnenriquez', function(err, res){
          if (err) return done(err);
          expect(res).to.be.false;
          done();
        });
      });

      it('should return false if the user is verified', function(done){
        minesweeper.isUserFake('jack', function(err, res){
          if (err) return done(err);
          expect(res).to.be.false;
          done();
        });
      });
    });

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

    describe('user following 2001 users (following limit)', function(){
      // TODO: find a user with old layout
      it('should work for new layout', function(done){
        minesweeper.isUserFake('ednilsonsb', function(err, res){
          if (err) return done(err);
          expect(res).to.be.true;
          done();
        });
      });
    });

    describe('user without bio or url', function(){
      it('should work for old layout', function(done){
        minesweeper.isUserFake('ansarabbasi2', function(err, res){
          if (err) return done(err);
          expect(res).to.be.true;
          done();
        });
      });

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
