'use strict'

const express               = require('express')
const Db                    = require('nedb')

const app  = express()
const port = process.env.PORT || 3000

// creating database @param is name of db file
const db = new Db('database.db')
db.loadDatabase()

//serving static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  console.log('a')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})



