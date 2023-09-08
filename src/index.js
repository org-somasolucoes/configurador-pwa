const Chat = require('./class/Chat');
const PWA = require('./class/PWA');
const ImprimePwa = require('./class/Imprime');
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('database/pwadb.db');
const colors = require('colors');
/**
 * Criar alguma forma q seja igual a classe PWA q será criado
 */

function menu(chat) {
    // return new Promise((resolve, reject) => {
        chat.say('----------------------------------------------------------------'.green);
        chat.say('\n--Menu--\n'.rainbow);
        chat.say('Adicionar:'.green+' Para adicionar um PWA');
        chat.say('Visualizar:'.yellow+' Para visualizar a lista de todos os pwa');
        chat.say('Deletar:'.red+' Para deletar um PWA');
        chat.say('Atualizar:'.blue+' Para atualizar PWAs');
        chat.say('Sair:'.red+' Para sair');
        chat.say('----------------------------------------------------------------\nEscolha uma das opções acima\n'.green);
    // })
}

const main = async () => {
    const chat = new Chat();
    chat.say("Bem-vindo ao configurador de pwa! Digite 'sair' para sair.".green);
    const pwa = new PWA(chat);
    const imprime = new ImprimePwa();
    let sair = false;

    /**
     * TODO: verificar permissão no local onde vai ser feita a impressao
     */

    while (!sair) {
        await menu(chat);
        let message = await chat.question("Digite uma opção".bgGreen);
        switch (message && message.toLowerCase()) {
            case 'adicionar':
                await pwa.setPWA();
                break;
            case 'visualizar':
                await pwa.viewPwa();
                break;
            case 'atualizar':
                await pwa.viewPwa();
                const id = await chat.question('Selecione um id para imprimir'.yellow);
                const obj = await pwa.getFormattedPwa(id);
                chat.say('Preview'.yellow);
                chat.say(obj.PWA);
                const confirmacao = await chat.question("Confirma a escrita do arquivo? ("+"Y".green+"/"+"n".red+")");
                if(confirmacao != 'n') imprime.imprimerPwa(obj.local , obj.PWA);
                else chat.say('Cancelado!');
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
    chat.say("Obrigado por usar o configurador de pwa. Até logo!".rainbow);
    process.exit(0);
}

main();