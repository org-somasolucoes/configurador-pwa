const Chat = require('./chat');
const update = require('./update/menuUpdate.js');
const viewPwa = require('./view/viewPwa.js');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/pwadb.db');

/**
 * Criar alguma forma q seja igual a classe PWA q será criado
 */

db.serialize(function () {
    db.run(`
    CREATE TABLE IF NOT EXISTS pwas (
      id INTEGER PRIMARY KEY,
      local TEXT,
      nome TEXT,
      nome_resumido TEXT,
      descricao TEXT,
      icone TEXT
    )
  `);
});

function menu(chat) {
    // return new Promise((resolve, reject) => {
        chat.say('----------------------------------------------------------------');
        chat.say('\n--Menu--\n');
        chat.say('Adicionar: Para adicionar um PWA');
        chat.say('Visualizar: Para visualizar a lista de todos os pwa');
        chat.say('Deletar: Para deletar um PWA');
        chat.say('Atualizar: Para atualizar PWAs');
        chat.say('Sair: Para sair');
        chat.say('\nEscolha uma das opções acima\n----------------------------------------------------------------');
    // })
}

const main = async () => {
    const chat = new Chat();
    chat.say("Bem-vindo ao configurador de pwa! Digite 'sair' para sair.");
    let sair = false;

    while (!sair) {
        await menu(chat);
        let message = await chat.question("Digite uma opção");
        switch (message && message.toLowerCase()) {
            case 'adicionar':
                chat.say('Insira as informações necessárias');
                const local = await chat.question("Local da url");
                const nome = await chat.question("Nome");
                const nomeResumido = await chat.question("Nome abreviado");
                const descricao = await chat.question("Adicione uma descrição");
                chat.say('Lembre-se :>> ', );
                chat.say("Adicione o Nome de uma imagem para o icone (ela DEVE existir na pasta assets/images)");
                chat.say("lembrando que as imagens devem ser quadradas e no padrão aceitavel");
                const icone = await chat.question("Nome icone (com a extensão)");

            //TODO: adicionar espaço para ficar mais bonito

                const addPWA = require('./addPwa.js');
                chat.say('\nAdicionar um novo PWA: ');
                chat.say('URL do manifesto do projeto: '+local);
                chat.say('Nome do PWA: '+nome);
                chat.say('Nome resumido do PWA: '+nomeResumido);
                chat.say('Descrição do PWA: '+descricao);
                chat.say('Nome do arquivo da imagem do ícone: '+icone);
                const confirmaAdiciona = await chat.question("Confirma?(Y/n)");
                if(confirmaAdiciona != 'n')
                    await addPWA({local,nome,nomeResumido,descricao,icone});
                else chat.say("Cencelado.");
                break;
            case 'visualizar':
                await viewPwa();
                break;
            case 'atualizar':
                /**
                 * Adicionar aki a forma de escrever
                 * nisso vai chamar o MENU do escrever -> para um ou todos
                 */
                console.log('cheguei aki atualizar');
                break;
            case 'deletar':
                //! fix: verificar se existe 1
                const deletePwa = require('./deletePwa.js');
                chat.say('Lista de todos os registros');
                await viewPwa();
                const id = await chat.question('Digite um Id para deletar');
                const confirmacao = await chat.question('Confirma a exclusão? (Y/n)');
                
                if (confirmacao.toLowerCase() === 'y') {
                    await deletePwa(id);
                    chat.say('Registro excluído com sucesso.');
                } else {
                    chat.say('Exclusão cancelada.');
                }
                break;
            case 'sair':
                sair = true;
                break;
            default:
                break;
        }
    }
    chat.say("Obrigado por usar o configurador de pwa. Até logo!");
    process.exit(0);
}

main();