require('dotenv').config()

const express = require('express')
const path = require('path')
const session = require('express-session');
const cookieParser = require('cookie-parser')

const Sentry = require("@sentry/node");

const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express()

const myRoutes = require("./routes/myRoute.js");
const sessionStore = require("./helpers/sessionDB.js");
const rateLimiterMiddleware = require('./middlewares/limit.js');

const port = process.env.PORT || 3000;
const oneDay = 1000 * 60 * 60 * 24;


Sentry.init({
  dsn: process.env.SENTRY,
  tracesSampleRate: 1.0,
  debug: true,
  ignoreErrors: {},
  ignoreTransactions: {}
});

app.use(rateLimiterMiddleware);
app.use(bodyParser.json({ limit: '1mb' }));
app.use(session({
  store: sessionStore,
  name: "sess",
  saveUninitialized: true,
  cookie: { maxAge: oneDay },
  resave: false,
  secret: process.env.SECRET_KEY,
}));
app.use(helmet());
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs");
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use("/", myRoutes);


app.listen(port, (error) => {
  if (!error)
    console.log(
      "Server is Successfully Running, and App is listening on port ", port,
    );
  else console.log("Error occurred, server can't start", error);
});