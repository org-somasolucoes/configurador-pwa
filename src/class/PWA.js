const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/pwadb.db');
const colors = require('colors');
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
        this.chat.say('Insira as informações necessárias'.green);
        const localInstalação = await this.chat.question("Local de instalação do pwa ".green+"(exemplo:/usuario/pasta/do/projeto/)".red);
        const nome = await this.chat.question("Nome para a aplicação".green);
        const nomeResumido = await this.chat.question("Nome abreviado".green);
        const descricao = await this.chat.question("Adicione uma descrição".green);
        const corTema = await this.chat.question("Adicione uma cor em hexadecimal (exemplo:#123123)".green);

        //TODO: implementar depois a possibilidade de adicionar N imagens 

        const iconeUrlPwa1 = await this.chat.question("Local da onde a imagem de PWA1 esta visivel:".green+" (exemplo: https://dominioExemplo.com/assets/imagems/nome_imagem.png)".red);
        this.chat.say('Lembre-se :>> '.yellow);
        this.chat.say("Adicione uma imagem para o icone que DEVE ser quadradas, no padrão aceitavel e suas informações validas".yellow);
        const iconeTamanhoPwa1 = await this.chat.question("Qual é o tamanho da imagem PWA1?".green+" (exemplo: 512x512)".red);
        const iconeTipoPwa1 = await this.chat.question("Qual é o tipo da imagem PWA1?".green+" (exemplo: image/png)".red);
        

        //* const addPWA = require('./addPwa.js');
        this.chat.say('\nAdicionar um novo PWA: '.yellow);
        this.chat.say('Local: '.yellow+ localInstalação)
        this.chat.say('Nome do PWA: '.yellow+nome);
        this.chat.say('Nome resumido do PWA: '.yellow+nomeResumido);
        this.chat.say('Descrição do PWA: '.yellow+descricao);
        this.chat.say('Cor tema do PWA: '.yellow+corTema);

        this.chat.say('Url local da imagem: '.yellow+iconeUrlPwa1);
        this.chat.say('Tamanho do arquivo da imagem do ícone1: '.yellow+iconeTamanhoPwa1);
        this.chat.say('Tipo do icone1: '.yellow+iconeTipoPwa1);

        const confirmaAdiciona = await this.chat.question("Confirma?("+"Y".green+"/"+"n".red+")");
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
                this.chat.say("PWA adicionado com sucesso!".green);
            } catch (error) {
                console.error(error);
            }
        }
        else this.chat.say("Cancelado.".red);
        
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
                            console.log('Lista de PWAs:'.yellow);
                            rows.forEach((row) => {
                                //foi feito assim para de forma provisória para ser generico
                                console.log(`registro ${String(row.id).yellow}: ${JSON.stringify(row)}`);
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
        this.chat.say('Lista de todos os registros'.yellow);
        await this.viewPwa();
        const id = await this.chat.question('Digite um Id para deletar'.red);
        const confirmacao = await this.chat.question("Confirma a exclusão? ("+"y".green+"/"+"N".red+")");
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
                this.chat.say('Registro excluído com sucesso.'.green);
            } catch (error) {
                console.error(error.message);
            }
        } else {
            this.chat.say('Exclusão cancelada.'.red);
        }
    }

    /**
     * TODO: adicionar verificar se existe pelo menos 1
     */

}
module.exports = PWA;

