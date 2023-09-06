async function updateAll(cb) {
    const confirmation = await cb('Tem certeza de que deseja atualizar todos? (S/N)');
        if (confirmation.toLowerCase() === 's') {
            try {
                const selectQuery = `SELECT * FROM pwas`;
                await new Promise((resolve, reject) => {
                    db.all(selectQuery, [], async function (err, rows) {
                        if (err) {
                            console.error('Erro ao buscar PWAs:', err);
                        } else {
                            if (rows.length === 0) {
                                console.log('Nenhum PWA encontrado para atualização.');
                            } else {
        
                                //lista todos os PWAs
                                console.log('\nLista de PWAs para atualização:');
                                //TODO: adicionar paginação
                                rows.forEach((row) => {
                                    console.log(`${row.id}. Nome: ${row.nome}, Nome Resumido: ${row.nome_resumido}, Descrição: ${row.descricao}`);
                                });
            
                                const confirmUpdate = await cb('\nDeseja confirmar a atualização dos PWAs? (S/N): ');
                                if (confirmUpdate.toLowerCase() === 's') {
                                    // Implementar a lógica para atualizar os registros
                                    // update(row); <- passar 1 por um para fazer o registro
                                    console.log('Registros atualizados com sucesso!');
                                    console.log("wdbaiwybdiawbdabwdaiuwbdiuabwduawidbiauwbdiauwdbaiuwdiuabui");
                                } else {
                                    console.log('Operação de atualização de PWAs cancelada.');
                                }
                            }
                        }
                    });
                })
            } catch (error) {
                
            }
        } else {
            console.log('Operação de atualização de todos os PWAs cancelada.');
        }
}
module.exports = updateAll;