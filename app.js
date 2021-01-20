const express = require('express')
const hbs = require('hbs')

const path = require('path') // ???
const PunkAPIWrapper = require('punkapi-javascript-wrapper')

const app = express()
const punkAPI = new PunkAPIWrapper()

app.set('view engine', 'hbs')
app.set('views', path.join(__dirname, 'views'))

app.use(express.static(path.join(__dirname, 'public')))
hbs.registerPartials(__dirname + '/views/partials')


app.get('/', (req, res, next) => {
  res.render('home')
})

app.get('/beers', (req, res, next) => {
  const beers = punkAPI.getBeers()
  .then(beers => {
    res.render('beers', {beers})
  })
  .catch(error => console.log(error))
})

app.get('/random-beers', (req, res, next) => {
  res.render('random-beers')
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
