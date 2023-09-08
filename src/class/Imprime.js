const fs = require('fs');

class ImprimePwa{

    escreverArquivo(caminho, conteudo) {
    return new Promise((resolve, reject) => {
        fs.writeFile(caminho, conteudo, { flag: 'wx' }, (erro) => {
        if (erro) {
            reject(erro);
        } else {
            resolve('Arquivo escrito com sucesso.');
        }
        });
    });
    }

    async imprimerPwa(caminho, conteudo){
        /**
         * TODO: verificar se tem / ou não no fim
         */
        await this.escreverArquivo(caminho+'manifest.json', conteudo);
    }
}

module.exports = ImprimePwa;