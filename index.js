'use strict'

const { request, response } = require('express')
const express               = require('express')
const Db                    = require('nedb')

const app  = express()
const port = process.env.PORT || 3000

// creating database @param is name of db file
const db = new Db('database.db')
db.loadDatabase()

// creating port
app.listen(port, () => {})

// serving static files
app.use(express.static('public'))

app.get('/app', (request, response) => {
  //select everything from database
  db.find({}, (err, data) => {

    // if something go wrong
    if (err) {
      response.end()
      console.error(err)
      return
    }
    // if everything is OK, we send data back to client
    response.json(data)
  })

})


