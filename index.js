require('dotenv').config()
const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())

const uri = process.env.ATLAS_URI
mongoose.connect(
  uri,
  { useNewUrlParser: true } //useCreateIndex: true }
)
const connection = mongoose.connection
connection.once('open', () => {
  console.log('MongoDB database connection established successfully')
})

//Define Routes
app.use('/api/all_posts', require('./controllers/allposts'));
app.use('/api/authenticate', require('./controllers/auth'));
app.use('/api/posts', require('./controllers/post'));
app.use('/api/user' , require('./controllers/users'));
app.use('/api', require('./controllers/manageFollow'));
app.use('/api/like', require('./controllers/like'));
app.use('/api/unlike', require('./controllers/unlike'));
app.use('/api/comment', require('./controllers/comment'));


if(!module.parent){
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`)
})
}

module.exports =app;