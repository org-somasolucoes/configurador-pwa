const viewPwa = require('../view/viewPwa');
const updateAll = require('./updateAll');

const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/pwadb.db');
async function updatePWAs(cb) {
    console.log('\nAtualizar PWAs:');
    
    console.log('Opções:');
    console.log('Um. Selecionar um para atualizar');
    console.log('Todos. Atualizar todos');
    
    const __option = await cb('Digite o número da opção desejada: ');
    const option = String(__option).toLowerCase();

/**
 * corrigir o formato q nem o add ou view ou o delete
 */



    if (option === 'todos') {
        updateAll(cb);
    } else if (option === 'um') {
        //TODO: adicionar view com a paginação
        try{
            await viewPwa();
            console.log("Digite o id a qual quer fazer a atualização");
            // executa função
            // updateOne();
        } catch (error) {
            console.error('Erro ao buscar PWAs:', error);
        }
    } else {
        console.log('Opção inválida.');
    }
}

module.exports = updatePWAs;