'use strict'

const { request, response } = require('express')
const express = require('express')
const Db      = require('nedb')

const app  = express()
const port = process.env.PORT || 3000

// middleware
app.use(express.json())
app.use(express.urlencoded())

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})

// creating database @param is name of db file
const db = new Db('database.db')
db.loadDatabase()

//serving static files
app.use(express.static('public'))

app.get('/app', (req, res) => {
  //select everything from database
  db.find({}, (err, data) => {
    // if something go wrong
    if (err) {
      res.end()
      console.error(err)
      return
    }
    // if everything is OK, we send data back to client
    res.json(data)
  })
})

app.post('/app', (req, res) => {
  const data = req.body

  //adding current time
  data.timestamp = Date.now()

  //adding data to database
  db.insert(data)
})

app.post('/delete', (req, res) => {
  const id = req.body.id

  //adding data to database
  db.remove({id: id}, {}, () => {
    console.log(id + ' deleted')
  })
})




