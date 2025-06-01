import * as submissionService from '../submissions/submission.service.js'

const login = async (req, res) => {
  try {
    res.status(200).redirect('/admin/dashboard')
  } catch (err) {
    res.status(401).render('admin/login', {
      layout: 'admin_layout',
      msg: req.flash('message'),
    })
  }
}

const dashboard = async (req, res) => {
  try {
    const [submissions, total] = await submissionService.findSubmissions()
    console.log(submissions)

    res.status(200).render('admin/dashboard', {
      layout: 'admin_layout',
      user: req.user,
      data: submissions,
      total: total,
    })
  } catch (err) {
    res.status(401).render('admin/dashboard', {
      layout: 'admin_layout',
      msg: req.flash(err.message),
    })
  }
}

const logout = async (req, res) => {
  req.logout()
  req.session.destroy((err) => {
    // if (err) res.status(404).render('admin/404')
    res.status(200).redirect('/admin/login')
  })
}

export { login, dashboard, logout }
