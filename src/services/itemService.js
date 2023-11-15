const res = require('express/lib/response');
const db = require('../db')

module.exports = {
    adicionar: (titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO itens (titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)', [titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    buscar: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM itens WHERE isDeleted = false', (error, results) =>{
                if(error){ rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    alterar: (titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor, id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE itens SET titulo = ?, autor = ?, id_categoria = ?, preco = ?, descricao = ?, status = ?, data_edit = ?, periodicidade = ?, id_vendedor = ? WHERE id = ?', [titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor, id],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    buscarID: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM itens WHERE id = ?', [id], (error, results) => {
                if(error) { rejeitado(error); return; }
                if(results.length > 0){
                    aceito(results[0])
                }else{
                    aceito(false)
                }
            } )
        })
    },
    checkItem: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM itens WHERE id = ? AND isDeleted = false', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length === 0) {
                    rejeitado('Item não encontrado ou já excluído');
                } else {
                    aceito(results[0]);
                }
            });
        });
    },
    softDelete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE itens SET isDeleted = true WHERE id = ?', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(true);
            });
        });
    }
}