import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import mongoose from 'mongoose';
import session from 'express-session';
import path from 'path';
import flash from 'express-flash';
import MongoStore from 'connect-mongo';
import dotenv from 'dotenv';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';
import globalRouter from './router/globalRouter';
import apiRouter from './router/apiRouter';
import routes from './routes';
import { localsMiddleware } from './middlewares';
import './passport';

const app = express();
const CookieStore = MongoStore(session);

dotenv.config();

app.use(helmet());
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use('/static', express.static(path.join(__dirname, 'static')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({
      mongooseConnection: mongoose.connection
    })
  })
);
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
app.use(localsMiddleware);

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;
