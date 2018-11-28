let express = require('express')
let bodyParser = require('body-parser')
require('./server-stuff/db/mlab-config')

let server = express()
const PORT = process.env.PORT || 9001

server.use(bodyParser.json())
server.use(bodyParser.urlencoded({ extended: true }))
server.use(express.static(__dirname + '/public'))


let auth = require('./server-stuff/auth/routes')
server.use(auth.session)
server.use('/account', auth.router)


server.use("*", (req, res, next) => {
  if (req.method == "GET") {
    return next()
  }
  if (!req.session.uid) {
    return next(new Error("Please login to continue"))
  }
  if (req.method == "POST") {
    req.body.creatorId = req.session.uid
  }
  next()
})
// putting stuff down here 
server.get('/', (req, res, next) => {
  res.send('happy')
})



let logRoutes = require('./server-stuff/routes/log-route')
server.use('/api/logs', logRoutes)

let shipRoutes = require('./server-stuff/routes/ship-route')
server.use('/api/ships', shipRoutes)

let commentRoutes = require('./server-stuff/routes/comment-route')
server.use('/api/comments', commentRoutes)

server.use('*', (error, req, res, next) => {
  res.status(error.status || 400).send({ message: error.message })
})
server.listen(PORT, () => {
  console.log('server is up and running')
})
