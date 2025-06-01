import * as submissionService from './submission.service.js'
import { NotFoundError } from '../../middlewares/errorHandler.js'

const getSubmissions = async (req, res, next) => {
  try {
    const submissions = await submissionService.findSubmissions()

    res.status(200).json({
      success: true,
      data: submissions,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const getSubmission = async (req, res, next) => {
  try {
    const { id } = req.params

    const submission = await submissionService.findSubmission({ id })
    if (!submission) throw new NotFoundError('Data not found')

    res.status(200).json({
      success: true,
      data: submission,
    })
  } catch (err) {
    console.log(err)
    next(err)
  }
}

const createSubmission = async (req, res, next) => {
  try {
    const newSubmission = {
      name: req.body.name,
      email: req.body.email,
      dob: req.body.dob,
      sex: req.body.sex,
      marital_status: req.body.marital_status,
      school: req.body.school,
      matric: req.body.matric,
      phone: parseInt(req.body.phone),
      admission_year: parseInt(req.body.admission_year),
      school_level: parseInt(req.body.school_level),
      lg_origin: req.body.lg_origin,
      lg_resident: req.body.lg_resident,
      v_skill: req.body.v_skill,
    }

    const newFiles = []
    Object.entries(req.files).forEach(([field, files]) => {
      const file = files[0]

      newFiles.push({
        filepath: file.filename,
        mimetype: file.mimetype,
        filetype: field.toUpperCase(),
      })
    })

    await submissionService.createSubmission({
      ...newSubmission,
      files: {
        create: newFiles,
      },
    })

    res.status(201).json({
      success: true,
      message: 'Data saved successfully',
    })
  } catch (err) {
    next(err)
  }
}

export { getSubmissions, getSubmission, createSubmission }
