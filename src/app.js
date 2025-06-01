import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import flash from 'connect-flash'
import session from 'express-session'
import passport from './config/passport-local.js'
import hbs from 'express-handlebars'
import { errorHandler, notFoundHandler } from './middlewares/errorHandler.js'
import rateLimiter from './middlewares/rateLimiter.js'
import submissionRoute from './modules/submissions/submission.route.js'
import adminRoute from './modules/admin/admin.route.js'
import logger from './middlewares/logger.js'
import { config } from './config/config.js'
import hbsHelpers from './config/hbs.js'
import sessionMiddleware from './config/session.js'

const app = express()

//=======Middlewares======//
if (process.env.NODE_ENV !== 'production') {
  app.use(
    morgan('dev', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  )
}

app.use(
  cors({
    origin: process.env.ORIGIN_URL,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders:
      'Accept, Accept-Language, X-Requested-With, Content-Language, Content-Type, Origin, Authorization',
    optionsSuccessStatus: 200,
    credentials: true,
  })
)

app.use(helmet())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(rateLimiter)

app.use(sessionMiddleware)
app.use(flash())
app.use(passport.initialize())
app.use(passport.session())

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.engine(
  '.hbs',
  hbs.engine({
    extname: '.hbs',
    helpers: hbsHelpers,
  })
)
app.set('view engine', '.hbs')
app.set('views', path.join(__dirname, './../views'))
app.use(express.static(path.join(__dirname, './../public')))

app.use('/submissions', submissionRoute)
app.use('/admin', adminRoute)
app.use('/', (req, res) => res.render('form'))

app.use(notFoundHandler)
app.use(errorHandler)

app.listen(config.PORT, () => {
  console.log(`Server started on PORT ${config.PORT}`)
})
