const res = require('express/lib/response')
const req = require('express/lib/request')
const transService = require('../services/transService')

module.exports = {
    registrar: async (req, res) => {
        let json = { error: '', result: {} }

        let id_comprador = req.body.id_comprador
        let id_vendedor = req.body.id_vendedor
        let id_item = req.body.id_item
        let data_transacao = req.body.data_transacao
        let valor = req.body.valor

        if (id_comprador && id_vendedor && id_item && data_transacao && valor) {
            await transService.registrar(id_comprador, id_vendedor, id_item, data_transacao, valor)
            json.result = {
                msg: "Transação registrada com sucesso",
                id_comprador,
                id_vendedor,
                id_item,
                data_transacao,
                valor
            }
            res.status(200).json(json);
        } else {
            res.status(400);
            json.error = 'Campos não enviados';
            res.json(json);
        }
    },
    buscar: async (req, res) => {
        let json = { error: '', result: [] }

        let transacoes = await transService.buscar()

        for (let i in transacoes) {
            json.result.push({
                id: transacoes[i].id,
                id_comprador: transacoes[i].id_comprador,
                id_vendedor: transacoes[i].id_vendedor,
                id_item: transacoes[i].id_item,
                data_transacao: transacoes[i].data_transacao,
                valor: transacoes[i].valor
            })
        }
        res.status(200).json(json)
    }

}