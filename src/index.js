const Chat = require('./class/Chat');
const PWA = require('./class/PWA');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/pwadb.db');

/**
 * Criar alguma forma q seja igual a classe PWA q será criado
 */

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
    const pwa = new PWA(chat);
    
    let sair = false;

    while (!sair) {
        await menu(chat);
        let message = await chat.question("Digite uma opção");
        switch (message && message.toLowerCase()) {
            case 'adicionar':
                await pwa.setPWA();
                break;
            case 'visualizar':
                await pwa.viewPwa();
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
                await pwa.deletePWa();
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