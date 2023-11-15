require('dotenv').config({path: 'variaveis.env'})
const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const swaggerUi = require('swagger-ui-express');
const swaggerDocs = require('./swagger.json')

const routes = require('./routes') // mostrando pro serv aonde estarao as rotas

const server = express()

server.use(bodyParser.json())
server.use(cors())


server.use(routes)

server.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


server.listen(process.env.PORT, () => {
    console.log(`server rodando em: http://localhost:${process.env.PORT}`)
})