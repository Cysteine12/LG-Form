const authorize = (req, res, next) => {
  if (req.isAuthenticated()) {
    return next()
  } else {
    res.redirect('/admin/login')
  }
}

export default authorize
