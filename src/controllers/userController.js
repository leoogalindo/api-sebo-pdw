const res = require('express/lib/response')
const req = require('express/lib/request')
const userService = require('../services/userService') // passa a enxergar o service. regras de banco de dados posso jogar no Service e vou enxergar aqui
const bcrypt = require('bcrypt')

module.exports = {
    registrar: async (req, res) => {
        let json = { error: '', result: {} }

        let nome = req.body.nome
        let email = req.body.email
        let status = req.body.status
        let tipo = req.body.tipo
        let senha = req.body.senha
        let area = req.body.area;
        let data_inicio = req.body.data_inicio


        const tiposValidos = ['vendedor', 'administrador', 'comprador'];

        if (nome && email && status && tipo && senha) {
            if (['ativo', 'inativo'].includes(status)) {
  
                if (tiposValidos.includes(tipo)) {

                    if (tipo === 'administrador' && !area && !data_inicio) {

                        res.status(400);
                        json.error = 'Área e data de início são obrigatórias para administradores';
                        return res.json(json);

                    }

                    bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                        if (errBcrypt) {
                            return res.status(500).json({ error: errBcrypt });
                        }

                        try {
                            if (tipo === 'administrador') {
                                if (!area || !data_inicio) {
                                    res.status(400);
                                    json.error = 'Área e data de início são obrigatórias para administradores';
                                    return res.json(json);
                                }
                            
                                let userID = await userService.registrarAdmin(nome, email, status, tipo, hash, data_inicio, area);
                                json.result = {
                                    message: 'Usuário admin criado com sucesso',
                                    id: userID
                                };
                                res.status(201).json(json);
                            } else {
                                
                                if (area || data_inicio) {
                                    res.status(401);
                                    json.error = 'Área e data de início não são válidas para tipos diferentes de administrador';
                                    return res.json(json);
                                }
                            
                                let userID = await userService.registrar(nome, email, status, tipo, hash);
                                json.result = {
                                    message: 'Usuário criado com sucesso',
                                    id: userID
                                };
                                res.status(200).json(json);
                            }
                        } catch (error) {
                            res.status(500).json({ error: error.message });
                        }
                    });
                } else {
                    res.status(406);
                    json.error = 'Tipo de usuário inválido';
                    res.json(json);
                }
            } else {
                res.status(406);
                json.error = 'Valor de status inválido';
                res.json(json);
            }
        } else {
            res.status(411);
            json.error = 'Campos não enviados';
            res.json(json);
        }
    },
    buscarTodos: async (req, res) => {
        let json = {
            error: '',
            result: []
        }

        let users = await userService.buscarTodos()

        for (let i in users) {
            json.result.push({
                nome: users[i].nome,
                email: users[i].email,
                status: users[i].status,
                tipo: users[i].tipo,
                data_inicio: users[i].data_inicio,
                area: users[i].area
            })
        }
        res.status(200).json(json)
    },
    alterar: async (req, res) => {
        let json = { error: '', result: {} }
    
        let id = req.params.id
        let nome = req.body.nome
        let email = req.body.email
        let status = req.body.status
        let tipo = req.body.tipo
        let senha = req.body.senha
        let data_inicio = req.body.data_inicio
        let area = req.body.area
    
        const tiposValidos = ['vendedor', 'administrador', 'comprador']
    
        if (id && nome && email && status && tipo && senha) {
            if (['ativo', 'inativo'].includes(status)) {
                if (tiposValidos.includes(tipo)) {
                    
                    if (tipo === 'administrador') {
                        
                        if (data_inicio && area) {

                            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                                if (errBcrypt) {
                                    return res.status(500).json({ error: errBcrypt });
                                }
    
                                try {
                                    
                                    await userService.alterarAdmin(id, nome, email, status, tipo, hash, data_inicio, area);
                                    json.result = {
                                        message: "Usuario administrador alterado com sucesso",
                                        nome,
                                        email,
                                        status,
                                        tipo,
                                        data_inicio,
                                        area
                                    }
                                    res.status(200).json(json);
                                } catch (error) {
                                    res.status(500).json({ error: error.message });
                                }
                            });
                        } else {
                            res.status(400);
                            json.error = 'Data de início e área são obrigatórias para administradores';
                            res.json(json);
                        }
                    } else {
                        
                        if (!data_inicio && !area) {

                            bcrypt.hash(senha, 10, async (errBcrypt, hash) => {
                                if (errBcrypt) {
                                    return res.status(500).json({ error: errBcrypt });
                                }
    
                                try {

                                    await userService.alterar(id, nome, email, status, tipo, hash);
                                    json.result = {
                                        message: "Usuario alterado com sucesso",
                                        nome,
                                        email,
                                        status,
                                        tipo,

                                    }
                                    res.status(200).json(json);
                                } catch (error) {
                                    res.status(500).json({ error: error.message });
                                }
                            });
                        } else {
                            res.status(401);
                            json.error = 'Data de início e área não são válidas para tipos diferentes de administrador';
                            res.json(json);
                        }
                    }
                } else {
                    res.status(406);
                    json.error = 'Tipo de usuário inválido';
                    res.json(json);
                }
            } else {
                res.status(406);
                json.error = 'Valor de status inválido';
                res.json(json);
            }
    
        } else {
            json.error = "Campos não enviados";
            res.status(411).json(json);
        }
    },
    login: async (req, res) => {
        let json = { error: '', result: {} };

        let email = req.body.email;
        let senha = req.body.senha;

        if (email && senha) {
            try {

                let user = await userService.login(email);

                if (user) {
                    bcrypt.compare(senha, user.senha, (errBcrypt, match) => {
                        if (errBcrypt) {
                            return res.status(500).json({ error: errBcrypt });
                        }

                        if (match) {

                            json.result = {
                                message: 'Login bem-sucedido',
                                userID: user.id
                            };
                            res.status(200).json(json);
                        } else {
                            res.status(401).json({ error: 'Credenciais inválidas' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                }
            } catch (error) {
                res.status(404).json({ error: "Usuário não encontrado" });
            }
        } else {
            res.status(411).json({ error: 'Campos não enviados' });
        }
    },
    loginAdmin: async (req, res) => {
        let json = { error: '', result: {} };

        let email = req.body.email;
        let senha = req.body.senha;

        if (email && senha) {
            try {
                
                let user = await userService.login(email);

                
                if (user) {
                  
                    bcrypt.compare(senha, user.senha, (errBcrypt, match) => {
                        if (errBcrypt) {
                            return res.status(500).json({ error: errBcrypt });
                        }

                        if (match) {
                            
                            json.result = {
                                message: 'Login de Administrador bem-sucedido',
                                userID: user.id
                            };
                            res.status(200).json(json);
                        } else {
                            
                            res.status(401).json({ error: 'Credenciais inválidas' });
                        }
                    });
                } else {
                    res.status(404).json({ error: 'Usuário não encontrado' });
                }
            } catch (error) {
                res.status(404).json({ error: 'Usuário não encontrado' });
            }
        } else {
            res.status(411).json({ error: 'Campos não enviados' });
        }
    },
    contarUsuarios: async (req, res) => {
        try {
            let totalUsuarios = await userService.contarUsuarios();
            res.status(200).json({ totalUsuarios });
        } catch (error) {
            res.status(500).json({ error: 'Erro ao contar usuários.' });
        }
    },
    softDelete: async (req, res) => {
        let json = {
            error: '',
            result: {}
        }

        let id = req.params.id
        try {
            const usuario = await userService.checkUser(id);
            user = await userService.softDelete(id);
            json.result = {
                message: 'Usuário excluído com sucesso',

            };
            res.status(200).json(json);
        } catch (error) {
            res.status(404).json({ error: 'Usuário não encontrado ou já excluído' });
        }
    }
}