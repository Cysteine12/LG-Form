import express from 'express'
import {
  createSubmission,
  getSubmission,
  getSubmissions,
} from './submission.controller.js'
import uploadFiles from '../../middlewares/uploadFile.js'

const router = express.Router()

router.get('/', getSubmissions)

router.get('/:id', getSubmission)

router.post('/', uploadFiles, createSubmission)

export default router
