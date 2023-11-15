const express = require('express')
const router = express.Router()

const userController = require('./controllers/userController')
const itemController = require('./controllers/itemController')
const catController = require('./controllers/catController')
const transController = require('./controllers/transController')

router.post('/users/signup', userController.registrar)
router.get('/admin/users', userController.buscarTodos)
router.put('/users/:id', userController.alterar)
router.post('/users/login', userController.login)
router.post('/admin/login', userController.loginAdmin)
router.get('/admin/reports', userController.contarUsuarios)
router.delete('/users/:id', userController.softDelete)

router.post('/categories', catController.adicionar)
router.get('/categories', catController.buscar)
router.put('/categories/:id', catController.alterar)
router.delete('/categories/:id', catController.softDelete)

router.post('/items', itemController.adicionar)
router.get('/items', itemController.buscar)
router.put('/items/:id', itemController.alterar)
router.get('/items/:id', itemController.buscarID)
router.delete('/items/:id', itemController.softDelete)

router.post('/transactions', transController.registrar)
router.get('/transactions', transController.buscar)

module.exports = router