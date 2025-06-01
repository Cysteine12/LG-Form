import express from 'express'
import { dashboard, login, logout } from './admin.controller.js'
import passport from 'passport'
import authorize from '../../middlewares/authorize.js'

const router = express.Router()

router.get('/login', (req, res) => {
  res.status(200).render('admin/login', {
    layout: 'admin_layout',
    msg: req.flash('message'),
  })
})

router.post('/login', passport.authenticate('local'), login)

router.get('/dashboard', authorize, dashboard)

router.post('/logout', logout)

export default router
