const res = require('express/lib/response');
const db = require('../db')

module.exports = {
    registrar: (id_comprador, id_vendedor, id_item, data_transacao, valor) => {
        return new Promise ((aceito, rejeitado) => {
            db.query('INSERT INTO transacoes (id_comprador, id_vendedor, id_item, data_transacao, valor) VALUES (?, ?, ?, ?, ?)', [id_comprador, id_vendedor, id_item, data_transacao, valor],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    buscar: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM transacoes', (error, results) =>{
                if(error){ rejeitado(error); return; }
                aceito(results)
            })
        })
    }
    
}