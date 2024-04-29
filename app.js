const express = require('express')
const connectDB = require('./db/connection')
const app = express()
const cors = require('cors')
var session = require('express-session')
var MongoDBStore = require('connect-mongodb-session')(session);
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
require('dotenv').config()

const tasks = require('./route/task')
const auth = require('./route/auth')
const attendance = require('./route/attendance')


var store = new MongoDBStore({
    uri: 'mongodb+srv://task-manager:1234@cluster0.crerqxf.mongodb.net/expressDatabase',
    collection: 'mySessions'
  }); 
// Catch errors
store.on('error', function(error) {
    console.log(error);
  });
  
const port = 3000
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    },
    store: store,
}))
app.use(cors({
    origin: ["http://localhost:3001"],
    methods: ["POST", "GET", "DELETE", "PATCH"],
    credentials: true

}))
app.use(express.json())
app.use(cookieParser())
app.use(bodyParser.json())
app.set('trust proxy', 1); // Trust first proxy


app.use('/api/v1/tasks', tasks)
app.use('/api/v1/auth', auth)
app.use('/api/v1/attendance', attendance)


const start = async () => {
    try {
        app.get('/', (req, res) => {
            req.session.isAuth = true
            console.log('res session', req.session.id)
            res.send('Hello World!')
        })

        app.post('/signup', (req, res) => {


        })

        await connectDB(process.env.MONGO_URI)
        app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
        })
    } catch (error) {
        console.log(`Error: ${error}`)
    }
}



start()