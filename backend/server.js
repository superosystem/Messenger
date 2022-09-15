import app from './express'
import config from './../config/config'
import mongoose from 'mongoose'

/**
 * Connection URL
 */
mongoose.Promise = global.Promise
// mongoose.connect(config.mongoUri, 
//   { 
//     useNewUrlParser: true, 
//     useCreateIndex: true, 
//     useUnifiedTopology: true, 
//     useFindAndModify: false 
//   })
mongoose.connect('mongodb://localhost:27017/socialnetwork')
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${config.mongoUri}`)
})

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
  console.info('Backend Server started on port %s.', config.port)
})
