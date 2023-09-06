const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/pwadb.db');
async function addPWA({local, nome, nomeResumido, descricao, icone}) {

    const insertQuery = 
    `INSERT INTO pwas (local, nome, nome_resumido, descricao, icone)
    VALUES (?, ?, ?, ?, ?)`;

    try {
        await new Promise((resolve, reject) => {
            db.run(insertQuery, [local, nome, nomeResumido, descricao, icone], function (err) {
                if (err) {
                    console.error('Erro ao adicionar o PWA:', err);
                    reject(err);
                } else {
                    console.log('PWA adicionado com sucesso!');
                    resolve();
                }
            });
        });
    } catch (error) {
        // Tratar o erro, se necessário
    }
}
module.exports = addPWA;