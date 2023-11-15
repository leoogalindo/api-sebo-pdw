const db = require('../db')
const bcrypt = require('bcrypt')

module.exports = {
    registrar: (nome, email, stt, tipo, senha) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO usuarios (nome, email, status, tipo, senha) VALUES (?, ?, ?, ?, ?)', [nome, email, stt, tipo, senha],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    registrarAdmin: (nome, email, stt, tipo, senha, data_inicio, area) => {
        return new Promise((aceito, rejeitado) => {
            db.query('INSERT INTO usuarios (nome, email, status, tipo, senha, data_inicio, area) VALUES (?, ?, ?, ?, ?, ?, ?)', [nome, email, stt, tipo, senha, data_inicio, area],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    alterar: (id, nome, email, stt, tipo, senha) => {
        return new Promise((aceito, rejeitado) => {
        
            db.query('UPDATE usuarios SET nome = ?, email = ?, status = ?, tipo = ?, senha = ?  WHERE id = ?', [nome, email, stt, tipo, senha, id],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    alterarAdmin: (id, nome, email, stt, tipo, senha, data_inicio, area) => {
        return new Promise((aceito, rejeitado) => {
        
            db.query('UPDATE usuarios SET nome = ?, email = ?, status = ?, tipo = ?, senha = ?, data_inicio = ?, area = ?  WHERE id = ?', [nome, email, stt, tipo, senha, data_inicio, area, id],
                (error, results) => {
                    if(error) { rejeitado(error); return; }
                    aceito(results.insertID)
                }
            )
        })
    },
    buscarTodos: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE isDeleted = false', (error, results) =>{
                if(error){ rejeitado(error); return; }
                aceito(results)
            })
        })
    },
    login: (email) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length < 1) {
                    rejeitado('Usuário não encontrado');
                    return;
                } 
                aceito(results[0])
            })
        })
    },
    loginAdmin: (email) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE email = ?', [email], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length < 1) {
                    rejeitado('Usuário não encontrado');
                    return;
                } 
                aceito(results[0])
            })
        })
    },
    contarUsuarios: () => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT COUNT(*) as total_usuarios FROM usuarios', (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(results[0].total_usuarios);
            });
        });
    },
    checkUser: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('SELECT * FROM usuarios WHERE id = ? AND isDeleted = false', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                if (results.length === 0) {
                    rejeitado('Usuário não encontrado ou já excluído');
                } else {
                    aceito(results[0]);
                }
            });
        });
    },
    softDelete: (id) => {
        return new Promise((aceito, rejeitado) => {
            db.query('UPDATE usuarios SET isDeleted = true WHERE id = ?', [id], (error, results) => {
                if (error) {
                    rejeitado(error);
                    return;
                }
                aceito(true);
            });
        });
    }
}