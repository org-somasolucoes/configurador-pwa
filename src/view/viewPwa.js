const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/pwadb.db');
async function viewPwa() {
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
                            console.log(`id: ${row.id}. Nome: ${row.nome}, Nome Resumido: ${row.nome_resumido}, Descrição: ${row.descricao}`);
                        });
                        resolve();
                    }
                }
            })
        })
    } catch (error) {
        
    }
}

module.exports = viewPwa;