# apiNode
API com fins didáticos para avaliação

-- para instalar a api execute:
    git clone https://github.com/Dniels/apiNode.git
    cd apiNode
    npm install

-- para rodar execute
    node index.js

Envie os arquivos Json para a porta 3000 com id e name {"id":"string","name":"string"}

exemplo:  curl -X POST -H "Content-Type: application/json" -d @.\exemplo.json http://localhost:3000/

você obterá {"mensagem":"OK"} caso não tenha enviado os mesmos dados dentro de 10 minutos, caso tenha retornará {"mensagem":"Forbidden"} 

 Para os testes automatizados foi utilizado o Mocha