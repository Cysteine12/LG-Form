import { rateLimit } from 'express-rate-limit'

const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  limit: 100,
  standardHeaders: 'draft-8',
  legacyHeaders: false,
  handler: (req, res, next, options) => {
    return res.status(options.statusCode).json({
      success: false,
      message: 'Too many requests. Please try again later',
    })
  },
})

export default rateLimiter
