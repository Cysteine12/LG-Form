import passport from 'passport'
import LocalStrategy from 'passport-local'
import * as adminService from '../modules/admin/admin.service.js'
import bcrypt from 'bcryptjs'

passport.use(
  new LocalStrategy.Strategy(
    {
      usernameField: 'email',
      passwordField: 'password',
      passReqToCallback: true,
    },
    async (req, email, password, done) => {
      try {
        const user = await adminService.findAdmin({ email })
        if (!user) {
          req.flash('message', 'Email is not found')
          return done(null, false)
        }

        const isMatch = bcrypt.compareSync(password, user.password)
        if (!isMatch) {
          req.flash('message', 'Incorrect password')
          return done(null, false)
        }

        return done(null, user)
      } catch (err) {
        return done(err, false)
      }
    }
  )
)

passport.serializeUser((user, done) => {
  done(null, user.id)
})
passport.deserializeUser(async (id, done) => {
  try {
    const user = await adminService.findAdmin({ id })
    return done(null, user)
  } catch (err) {
    return done(err, null)
  }
})

export default passport
