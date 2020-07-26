const chai = require('chai');
const server = require('../index');
const chaihttp = require('chai-http');
const should = chai.should();
const fs = require('fs');

chai.use(chaihttp);

describe('testes', function(){
    
    var jsonTeste = {"id":"123","name":"mesa"};
    var jsonTeste2 = {"id":"1234","name":"mesa2"};

    it('Primeiro envio do Json',function(done){
        chai.request(server)
        .post('/')
        .send(jsonTeste)
        .end(function(err,res){
            res.should.have.status(200) ;
            done();
        })
    });

    it('Segundo envio do Json',function(done){
        chai.request(server)
        .post('/')
        .send(jsonTeste2)
        .end(function(err,res){
            res.should.have.status(200);
            done();
        })
    });

    it('Repetindo primeiro envio do Json',function(done){
        chai.request(server)
        .post('/')
        .send(jsonTeste)
        .end(function(err,res){
            res.should.have.status(403);
            done();
        })
    });
});
