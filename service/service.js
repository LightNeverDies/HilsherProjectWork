const app = require('express')()
const http = require('http').createServer(app)
const cors = require('cors')
const bodyParser = require('body-parser')

const port = process.env.port || 8000
const Str = require('@supercharge/strings')

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(async (req, res, next) => {
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE')
  res.header('Access-Control-Allow-Headers', 'Content-Type')
  next()
})

function generateNumber(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min
}

function generateString() {
  return Str.random()
}

app.get('/', (req, res) => {
  console.log(req.query)
  res.send(JSON.stringify(generateNumber(req.query.min, req.query.max)))
})

http.listen(port, () => console.log(`Listening to port ${port}`))
