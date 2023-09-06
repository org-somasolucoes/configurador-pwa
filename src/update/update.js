
function update(obj) {
    
}

module.exports = update;

//TODO: criar uma forma de receber o pwa ja no formato para q aqui tenha uma função que escreva o PWA
import {  } from "../class/PWA";

function preencherTemplate(info) {
    const template = `
      Nome: ${info.nome}
      Idade: ${info.idade}
      País: ${info.pais}
      // Adicione outros campos e informações conforme necessário
      {
        "name": "${info.nome}",
        "short_name": "${info.nome}",
        "start_url": "/",
        "display": "standalone",
        "description": "${info.nome}",
        "lang": "pt-BR",
        "dir": "auto",
        "theme_color": "#212529",
        "scope": "/",
        "id": "/",
        "categories": [],
        "icons": [
        {
        "src": "${info.nome}",
        "sizes": "512x512",
        "type": "image/png",
        "purpose": "maskable"
        },
        {
        "src": "http://atendimento.anabely.com.br/assets/images/icon_pwa_192.png",
        "sizes": "192x192",
        "type": "image/png",
        "purpose": "any"
        }
        ],
        "shortcuts": [],
        "prefer_related_applications": false
        }
    `;
    return template;
}


/*
const fs = require('fs');

function escreverArquivo(caminho, conteudo) {
  return new Promise((resolve, reject) => {
    fs.writeFile(caminho, conteudo, (erro) => {
      if (erro) {
        reject(erro);
      } else {
        resolve('Arquivo escrito com sucesso.');
      }
    });
  });
}

// Exemplo de uso:
const caminhoDoArquivo = 'caminho/do/arquivo.txt';
const conteudoDoArquivo = 'Conteúdo do arquivo a ser escrito.';

escreverArquivo(caminhoDoArquivo, conteudoDoArquivo)
  .then((mensagem) => {
    console.log(mensagem);
  })
  .catch((erro) => {
    console.error('Erro ao escrever o arquivo:', erro);
  });
*/