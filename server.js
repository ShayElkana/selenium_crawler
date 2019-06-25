const routes = require('./routes')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 8061
const ipAddress = '127.0.0.1'

const server = require('http').Server(app)

app.use(express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

routes(app)

server.listen(port, ipAddress, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log('listening on %s', port)
    }
})
