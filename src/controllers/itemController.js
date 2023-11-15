const res = require('express/lib/response')
const req = require('express/lib/request')
const itemService = require('../services/itemService')


module.exports = {
    adicionar: async (req, res) => {
        let json = { error: '', result: {} }

        let titulo = req.body.titulo
        let autor = req.body.autor
        let id_categoria = req.body.id_categoria
        let preco = req.body.preco
        let descricao = req.body.descricao
        let status = req.body.status
        let data_edit = req.body.data_edit
        let periodicidade = req.body.periodicidade
        let id_vendedor = req.body.id_vendedor

        const statusPermitidos = ['ativo', 'inativo', 'fora de estoque', 'estoque']

        if (titulo && autor && id_categoria && preco && descricao && status && data_edit && periodicidade && id_vendedor) {
            if (statusPermitidos.includes(status)) {
                let itemID = await itemService.adicionar(titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor)
                json.result = {
                    titulo,
                    autor,
                    id_categoria,
                    preco,
                    descricao,
                    status,
                    data_edit,
                    periodicidade,
                    id_vendedor
                }
                res.status(200).json(json);
            } else {
                res.status(401);
                json.error = 'Status invalido';
                res.json(json);
            }
        } else {
            res.status(400);
            json.error = 'Campos não enviados';
            res.json(json);
        }
    },
    buscar: async (req, res) => {
        let json = { error: '', result: [] }

        let itens = await itemService.buscar()

        for (let i in itens) {
            json.result.push({
                id: itens[i].id,
                titulo: itens[i].titulo,
                autor: itens[i].autor,
                id_categoria: itens[i].id_categoria,
                preco: itens[i].preco,
                descricao: itens[i].descricao,
                status: itens[i].status,
                data_edit: itens[i].data_edit,
                periodicidade: itens[i].periodicidade,
                id_vendedor: itens[i].id_vendedor,
            })
        }
        res.status(200).json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        let titulo = req.body.titulo
        let autor = req.body.autor
        let id_categoria = req.body.id_categoria
        let preco = req.body.preco
        let descricao = req.body.descricao
        let status = req.body.status
        let data_edit = req.body.data_edit
        let periodicidade = req.body.periodicidade
        let id_vendedor = req.body.id_vendedor

        const statusPermitidos = ['ativo', 'inativo', 'fora de estoque', 'estoque'];

        if (titulo && autor && id_categoria && preco && descricao && status && data_edit && periodicidade && id_vendedor) {
            if (statusPermitidos.includes(status)) {
                await itemService.alterar(titulo, autor, id_categoria, preco, descricao, status, data_edit, periodicidade, id_vendedor, id)
                json.result = {
                    message: "Item alterado com sucesso",
                    id,
                    titulo,
                    autor,
                    id_categoria,
                    preco,
                    descricao,
                    status,
                    data_edit,
                    periodicidade,
                    id_vendedor
                }
                res.status(200).json(json);
            } else {
                res.status(401);
                json.error = 'Status invalido';
                res.json(json);
            }

        } else {
            res.status(400);
            json.error = 'Campos não enviados';
            res.json(json);
        }
    },
    buscarID: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        let item = await itemService.buscarID(id)

        if (item) {
            json.result = item
            res.status(200).json(json)
        } else {
            res.status(400);
            json.error = 'Usuário não encontrado';
            res.json(json);
        }
    },
    softDelete: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        try {
            const it = await itemService.checkItem(id);
            item = await itemService.softDelete(id);
            json.result = {
                message: 'Item excluído com sucesso'
            };
            res.status(200).json(json);
        } catch (error) {
            res.status(404).json({ error: 'Item não encontrado ou já excluído' });
        }
    }

}