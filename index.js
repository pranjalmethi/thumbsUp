const express   = require('express')
const app       = express()
const bodyParser = require('body-parser')
const port      = process.env.PORT || 8080

var route = require('./routes/route')

app.use(bodyParser.json())
app.use( 
  bodyParser.urlencoded({
    extended: false
  })
)
app.use('/', route)

app.listen(port, function() {
  console.log('Server is running on port: ' + port)
})

module.exports = app