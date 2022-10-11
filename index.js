const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.use(
  express.urlencoded({
    extended: true
  })
)

app.use(express.json())

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(express.static('public'))

app.get('/', (req, res) => {

  const query = (`SELECT Code, Name, Continent FROM COUNTRY`)

  pool.query(query, function(err, data) {
    if(err) {
      console.log(err)
    }

    const country = data
    
    res.render('home', {country})

  })
})

app.get('/:code', (req, res) => {

  const code = req.params.code

  const query = (`SELECT * FROM country WHERE Code = '${code}'`)

  pool.query(query, function(err, data){
    if(err) {
      console.log(err)
      return
    }

    const country = data[0]

    res.render('country', {country})
  })
})



app.listen(3000)