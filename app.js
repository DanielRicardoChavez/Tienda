// Required Modules.
import createError from 'http-errors'
import express from 'express'
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import 'dotenv/config'
import { notFound, errorHandler } from './middlewares/errorHandler.js';
import session from 'express-session';



// Rutas
import indexRouter from './routes/index.js';
import usersRouter  from './routes/users.js';
import flashMiddleware from './middlewares/flashesMiddleware.js';
import methodOverride from './middlewares/methodOverride.js';


// Variables.
const app = express();
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename) 



// view engine setup
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.locals.basedir = path.join(__dirname, 'views')
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(methodOverride)
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {secure: process.env.NODE_ENV === 'production'}
}))
app.use(flashMiddleware)


// Estilos
app.use(express.static(path.join(__dirname, 'public')));
app.use('/icons', express.static(path.join(__dirname, 'node_modules/bootstrap-icons/font')));

// Rutas
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(notFound);
app.use(errorHandler)


export default app;
