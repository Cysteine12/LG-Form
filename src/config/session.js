import session from 'express-session'
import { config } from './config.js'
import pkg from 'express-mysql-session'
const MySQLStore = pkg(session)

const sessionStore = new MySQLStore(config.DATABASE_URL)

const sessionMiddleware = session({
  key: 'session_cookie_name',
  secret: config.SESSION_SECRET,
  store: sessionStore,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: config.jwt.ACCESS_TOKEN_EXPIRATION_HOURS * 60 * 60 * 1000,
  },
})

export default sessionMiddleware
