const express = require('express')
const mongoose = require('mongoose')
const routes = require('./routes')
const cors = require('cors')

mongoose.connect(
  'mongodb://andreluizmr:and123@ds035643.mlab.com:35643/andreluiz-node',
  {
    useNewUrlParser: true
  }
)

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api', routes)

app.listen(3000)
