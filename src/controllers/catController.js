const res = require('express/lib/response')
const req = require('express/lib/request')
const catService = require('../services/catService') 

module.exports = {
    adicionar: async (req, res) => {
        let json = { error: '', result: {} }

        let nome = req.body.nome
        let descricao = req.body.descricao

        if(nome && descricao) {
            let catID = await catService.adicionar(nome, descricao)
            json.result = {
                id: catID,
                nome,
                descricao
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

        let categorias = await catService.buscar()

        for(let i in categorias){
            json.result.push({
                id: categorias[i].id,
                nome: categorias[i].nome,
                descricao: categorias[i].descricao                
            })
        }
        res.status(200).json(json)
    },

    alterar: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        let nome = req.body.nome
        let descricao = req.body.descricao

        if(nome && descricao){
            await catService.alterar(nome, descricao, id)
            json.result = {
                message: "Categoria alterada com sucesso",
                nome,
                descricao
            }
            res.status(200).json(json);
        } else {
            res.status(400);
            json.error = 'Campos não enviados';
            res.json(json);
        }
    },

    softDelete: async (req, res) => {
        let json = { error: '', result: {} }

        let id = req.params.id
        try {
            const categoria = await catService.checkCat(id);
            cat = await catService.softDelete(id);
            json.result = {
                message: 'Categoria excluída com sucesso'
            };
            res.status(200).json(json);
        } catch (error) {
            res.status(404).json({ error: 'Categoria não encontrada ou já excluída' });
        }
    }

}