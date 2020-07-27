    const fs = require('fs');
    const http = require('http');
    const zlib = require('zlib');
    const readline = require('readline');
    const listaValida = [];
    
    async function agregadorDeUrl() {
      const inputStream = descompactar('./input-dump.tar.gz', (produto) =>
        pegaProdutos(produto, listaValida).then(async (endCompleto) => {
          if (endCompleto) {
            return verificaUrl(endCompleto);
          }
        }).then(async (valido) => {
          if (valido) {
            let saida = listaValida.find(produtosSelecionados =>
              (produtosSelecionados.productId === valido.productId));
    
            if (!saida) {
                saida = {
                productId: valido.productId,
                images: [valido.image],
              };
              listaValida.push(saida);
              return;
            }
    
            if (saida.images.length < 3) {
                saida.images.push(valido.image);
            }
          }
        }));
    
        await new Promise((resolve, reject) => {
            inputStream.on('error', reject);
            inputStream.on('close', resolve);
          });

      fs.writeFileSync('./saidaArquivo.json', JSON.stringify(listaValida, null,2));
    }
    
    if (require.main === module) {
        agregadorDeUrl(process.argv[2]);
    }

    async function pegaProdutos(produto, listaValida) {
        const { productId, image } = produto;
      
        let saida = listaValida.find(produtosValidos =>
          (produtosValidos.productId === productId));
      
        if (saida &&
            ((saida.images.length >= 3) ||
             (saida.images.includes(image)))) {
          return;
        }
        return produto;
      }

    function descompactar(filename, mapear) {
        const zlibGun = zlib.createGunzip();
        const stream = fs.createReadStream(filename);
      
        const rl = readline.createInterface({
          input: stream.pipe(zlibGun),
          crlfDelay: Infinity,
        });
      
        rl.on('line', (line) => {
          const inicio = line.indexOf('{');
          const final = line.lastIndexOf('}') + 1;
      
          if ((inicio >= 0) && final) {
            const stringValido = line.substring(inicio, final);
            const produto = JSON.parse(stringValido);
            mapear(produto);
          }
        });
      
        return rl;
      }

      function verificaUrl(produto) {
        const { image } = produto;
      
        return new Promise((resolve, reject) => {
          const imagem = http.get(image, (res) => {
            const { statusCode } = res;
      
            if (statusCode === 200) {
              resolve(produto);
            }
          });
      
          imagem.on('error', (err) => resolve());
        });
      }