const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database/pwadb.db');

async function deletePwa(id) {
    const __id = Number(id);
    const deleteSql = "DELETE FROM pwas WHERE id = (?)";
    try {
        await new Promise((resolve, reject) => {
            db.run(deleteSql,__id, function (err) {
                if (err) {
                    // console.error('Erro ao remover o PWA:', err);
                    reject(err);
                } else {
                    // console.log('PWA removido com sucesso!');
                    resolve();
                }
            });})
    } catch (error) {
        
    }
}

module.exports = deletePwa