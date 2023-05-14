import express from 'express';
import http, { createServer } from 'http';
import bodyParser from 'body-parser';
import cookieparser from 'cookie-parser';
import compression from 'compression';
import cors from 'cors';
import mongoose from 'mongoose';
import router from './router/index';
import passport from 'passport';
interface CustomError extends Error {
  status?: number;
}

const productRoute = require('./router/products')

const app = express();

const port = 8701;

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}))

//Middlewares

app.use(compression());
app.use(bodyParser.json());
app.use(express.urlencoded({extended: true}))
app.use(cookieparser());
app.use(passport.initialize());

// App routers

app.use('/users', router());
app.use('/', router())
app.use('/products', router())

// Error customization

app.use((req, res, next)=>{
  const error = new Error('not found') as CustomError
  error.status = 404
  next(error)
});

//error handler

app.use((error: CustomError, req: express.Request, res: express.Response, next: express.NextFunction)=>{
  res.status(error.status || 500);
  res.send({
    error:{
      status: error.status || 500, message:error.message
    }
  })
})

// Server Configuration

const server = http.createServer(app);

app.get('/', (req:express.Request, res:express.Response) => res.send("OpenFabric"))
server.listen(port,()=>{ console.log('server runing on port '+ port)})

// Mongo Database COnfiguration

const Mongod_db = 'mongodb+srv://chijiokeihedioha:Domain001@cluster0.9a8xxrz.mongodb.net/my-angular-app'
mongoose.Promise = Promise;
mongoose.connect(Mongod_db)
mongoose.connection.on('connected', () => console.log('connected to database'));
mongoose.connection.on('error', (error) => console.log(error));