const express = require('express');
const server = express();
const morgan = require('morgan');
const fs = require('fs');

server.use(morgan('dev'));
server.use(express.json());

server.post('/',(req, res, next) => {
   var arquivos =  fs.readdirSync('./json');
   var existe = false;
   
   arquivos.forEach(e => {
        //verifica se o arquivo foi criado a menos de 10 minutos
        if (fs.statSync('./json/' + e).birthtimeMs > (Date.now() - 600000)) { 
            if(JSON.stringify(req.body) == JSON.stringify(JSON.parse(fs.readFileSync('./json/' + e)))) {
                existe = true;
                console.log('ja existe o arquivo');
            } 
        }
    });

    if (!existe) {
        fs.writeFileSync('./json/'+ Date.now().toString(),JSON.stringify(req.body));
        atualizaProdutos(req.body);
        res.status(200). send({
            mensagem: 'OK' 
        })
    }
    else {
        res.status(403). send({
            mensagem: 'Forbidden' 
        })
    };

});

function atualizaProdutos(body) {

    if(body.id != undefined ){

        var produts =  fs.readdirSync('./products');

        if(produts.length == 0){
            fs.writeFileSync('./products/' + body.id,body.name)
            console.log('produto cadastrado');
        }
        else {
            var atualizado = false
            produts.forEach(e => {
                if (e == body.id) { 
                    fs.writeFileSync('./products/' + body.id,body.name);
                    atualizado = true;
                    console.log('produto atualizado');
                }
            });

            //aqui não haveria a necessidade desse if nem da variavel atualizado em cima, 
            //apenas para saber se ja existia ou não
            if (!atualizado) {
                fs.writeFileSync('./products/' + body.id,body.name)
                console.log('produto criado');
            }
        }
    }
};

module.exports = server;