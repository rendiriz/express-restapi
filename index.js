require('dotenv').config()
const path = require('path')
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const http = require('http').Server(app)

require('module-alias/register')
const cors = require('cors')
const bodyParser = require('body-parser')

const dir = path.join(__dirname, 'public')
const routes = require('./src/AppRoutes')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(dir))

app.get('/', function (req, res) {
  res.status(200).json({
    error: false,
    message: 'Welcome to Express REST API',
    data: {}
  })
})

app.use(routes)

http.listen(port, () => {
  console.log('Server started on port ' + port)
})
