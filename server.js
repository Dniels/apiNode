const express = require('express');
const server = express();
const morgan = require('morgan')

server.use(morgan('dev'));

server.use((req, res , next) => {
    res.status(200).send({
        mensagem: 'funcionando'
    });
});

module.exports = server;