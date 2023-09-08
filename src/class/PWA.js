const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/pwadb.db');

class PWA {
    //TODO: a ideia aki é ter algo q se um dia pedir pra alterar de tranquilo de forma facil
    /**
     * TODO: - criar uma classe para o pwa nela deve ser feito: 
     * TODO:    a classe deve imprimir os valores que estão no registro, 
     * TODO:    retornar uma string que seja o pwa
     */
    
    /** 
     * TODO: criar a doc para a classe
     * @param {number} id INTEGER
     */
    #id
    
    /**
     *! a ideia é a estrutura da classe ser a seguinte:
     *! registro {
     *!  PWA
     *! }
     *! 
     *! o registro será identificado por um id a qual será o id do banco
     */

    /**
     * @param {any} registro
     * recebe um pwa 
     */
    #registro

    constructor(chat) {
        this.chat = chat;
        db.serialize(function () {
            db.run(`
                CREATE TABLE IF NOT EXISTS pwas (
                id INTEGER PRIMARY KEY,
                localInstalacao TEXT,
                nome TEXT,
                nomeResumido TEXT,
                descricao TEXT,
                cor TEXT,
                iconeUrl1 TEXT,
                iconeTamanho1 TEXT,
                iconeTipoImagem1 TEXT
                )
            `);
        });        
    }
    /**
     *  deve se ao inserir a função pedir as informações para criar o pwa
     */
    async setPWA() {
        this.chat.say('Insira as informações necessárias');
        const localInstalação = await this.chat.question("Local de instalação do pwa (exemplo:/usuario/pasta/do/projeto/)");
        const nome = await this.chat.question("Nome para a aplicação");
        const nomeResumido = await this.chat.question("Nome abreviado");
        const descricao = await this.chat.question("Adicione uma descrição");
        const corTema = await this.chat.question("Adicione uma cor em hexadecimal (exemplo:#123123)");

        //TODO: implementar depois a possibilidade de adicionar N imagens 

        const iconeUrlPwa1 = await this.chat.question("Local da onde a imagem de PWA1 esta visivel: (exemplo: https://dominioExemplo.com/assets/imagems/nome_imagem.png)");
        this.chat.say('Lembre-se :>> ', );
        this.chat.say("Adicione uma imagem para o icone que DEVE ser quadradas, no padrão aceitavel e suas informações validas");
        const iconeTamanhoPwa1 = await this.chat.question("Qual é o tamanho da imagem PWA1? (exemplo: 512x512)");
        const iconeTipoPwa1 = await this.chat.question("Qual é o tipo da imagem PWA1? (exemplo: image/png)");
        

        //* const addPWA = require('./addPwa.js');
        this.chat.say('\nAdicionar um novo PWA: ');
        this.chat.say('Local:'+ localInstalação)
        this.chat.say('Nome do PWA: '+nome);
        this.chat.say('Nome resumido do PWA: '+nomeResumido);
        this.chat.say('Descrição do PWA: '+descricao);
        this.chat.say('Cor tema do PWA: '+corTema);

        this.chat.say('Url local da imagem: '+iconeUrlPwa1);
        this.chat.say('Tamanho do arquivo da imagem do ícone1: '+iconeTamanhoPwa1);
        this.chat.say('Tipo do icone1: '+iconeTipoPwa1);

        const confirmaAdiciona = await this.chat.question("Confirma?(Y/n)");
        if(confirmaAdiciona.toLowerCase() != 'n'){
            const insertQuery = 
            `INSERT INTO pwas (localInstalacao, nome, nomeResumido, descricao, cor, iconeUrl1, iconeTamanho1, iconeTipoImagem1)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
            // TODO: adicionar prepare (para remover comando sql)
            try {
                db.run(insertQuery, [localInstalação,nome, nomeResumido, descricao, corTema, iconeUrlPwa1, iconeTamanhoPwa1, iconeTipoPwa1], function (err) {
                    if (err) {
                        throw new Error('Erro ao adicionar o PWA '+err);
                    }
                });
                this.chat.say("PWA adicionado com sucesso!");
            } catch (error) {
                console.error(error);
            }
        }
        else this.chat.say("Cancelado.");
        
    }

    async viewPwa() {

        /**
         * TODO: Adicionar paginação
         * algo como viewPWA(de, ate)
         */
    
        const selectQuery = `SELECT * FROM pwas`;
        try {
            await new Promise((resolve, reject) => {
                db.all(selectQuery, [], function (err,rows) {
                    if (err) {
                        console.error('Erro ao buscar PWAs:', err);
                    } else {
                        if (rows.length === 0) {
                            reject(err)
                        } else {
                            console.log('Lista de PWAs:');
                            rows.forEach((row) => {
                                //foi feito assim para de forma provisória para ser generico
                                console.log(`registro ${row.id}: ${JSON.stringify(row)}`);
                            });
                            resolve();
                        }
                    }
                })
            })
        } catch (error) {
            
        }
    }

    /**
     * retorna um obj que vai ser
     * algo como: 
     * {"local","pwa ja formatado"}
     */
    async getFormattedPwa(id){
        const __id = Number(id);
        try {
            //TODO: remover sqli
            const pwaRaw = await new Promise((resolve, reject) => {
                db.all("SELECT * FROM pwas WHERE id = (?)",[__id],function (err,data) {
                    if(err) return reject('err');
                    resolve(data[0]);
                })
            })
            //TODO:verificar erro melhor
            if(pwaRaw == 'err') throw new Error("Erro ao tentar acessar acessar o id: "+__id);
            // se existir a possibilidade de add mais de 1 imagem pensei nisso:
            /**
                ,
                {
                "src": "${outra.coisa}",
                "sizes": "512x512",
                "type": "image/png",
                "purpose": "maskable"
                }
             */
            const template = `
{
    "name": "${pwaRaw.nome}",
    "short_name": "${pwaRaw.nomeResumido}",
    "start_url": "/",
    "display": "standalone",
    "description": "${pwaRaw.descricao}",
    "lang": "pt-BR",
    "dir": "auto",
    "theme_color": "${pwaRaw.cor}",
    "scope": "/",
    "id": "/",
    "categories": [],
    "icons": [
    {
    "src": "${pwaRaw.iconeUrl1}",
    "sizes": "${pwaRaw.iconeTamanho1}",
    "type": "${pwaRaw.iconeTipoImagem1}",
    "purpose": "maskable"
    }
    ],
    "shortcuts": [],
    "prefer_related_applications": false
}
                `;
            return {
                "local": pwaRaw.localInstalacao,
                "PWA": template
            }
        } catch (error) {
            console.error(error.message);
        }
    }


    async deletePWa(){
        this.chat.say('Lista de todos os registros');
        await this.viewPwa();
        const id = await this.chat.question('Digite um Id para deletar');
        const confirmacao = await this.chat.question('Confirma a exclusão? (y/N)');
        if (confirmacao.toLowerCase() == 'y') {
            const __id = Number(id);
            const deleteSql = "DELETE FROM pwas WHERE id = "+__id;
            try {
                const pwaDeleted = await new Promise((resolve, reject) => {
                    db.exec(deleteSql,function (info,err) {
                        if(err) return reject('err');
                        resolve(info);
                    })
                })
                if(pwaDeleted == 'err') throw new Error("Erro ao tentar deletar acessar o id: "+__id);
                this.chat.say('Registro excluído com sucesso.');
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.chat.say('Exclusão cancelada.');
        }
    }

    /**
     * TODO: adicionar verificar se existe pelo menos 1
     */

}
module.exports = PWA;

