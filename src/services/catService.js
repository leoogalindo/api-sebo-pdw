const db = require('../db')

module.exports = {
    adicionar: (nome, descricao) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO categoria (nome, descricao) VALUES (?, ?)', [nome, descricao],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    buscar: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM categoria WHERE isDeleted = false', (error, results) =>{
                if(error){ rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    alterar: (nome, descricao, id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE categoria SET nome = ?, descricao = ?  WHERE id = ?', [nome, descricao, id],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    checkCat: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM categoria WHERE id = ? AND isDeleted = false', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length === 0) {
                    rejeitado('Categoria não encontrada ou já excluída');
                } else {
                    aceito(results[0]);
                }
            });
        });
    },
    softDelete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE categoria SET isDeleted = true WHERE id = ?', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(true);
            });
        });
    }
}