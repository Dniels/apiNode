# API com fins didáticos para avaliação <h1>

# Parte 01 <h3>

para clonar a api execute:    
`git clone https://github.com/Dniels/apiNode.git` 


entre no diretorio:    
`cd apiNode`


instale as dependências:    
`npm install`


rode executando:    
`node index.js`


Envie os arquivos Json para a porta 3000 com id e name {"id":"string","name":"string"}

exemplo:  
`curl -X POST -H "Content-Type: application/json" -d @.\exemplo.json http://localhost:3000/`

você obterá ` {"mensagem":"OK"} ` caso não tenha enviado os mesmos dados dentro de 10 minutos, caso tenha retornará ` {"mensagem":"Forbidden"} ` 

 Para os testes automatizados foi utilizado o Mocha

 # Parte 02 <h3>

 rode executando:    
`node parte2.js`

será criado um arquivo na pasta com os URLs `saidaArquivo.json`


* caso o arquivo retornado esteja vazio, verifique se o servidor está rodando (`ruby url-aggregator-api.rb` que está disponivel na mesma pasta e tem a dependência do sinatra `gem install sinatra`).