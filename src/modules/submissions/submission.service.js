import prisma from '../../config/prisma.js'

const findSubmissions = async (filter, options) => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.$transaction([
    prisma.submission.findMany({
      where: filter,
      skip: options?.skip || 0,
      take: options?.limit || 20,
      include: { _count: true },
    }),
    prisma.submission.count(),
  ])
}

const findSubmission = async (filter) => {
  return await prisma.submission.findUnique({
    where: filter,
    include: { files: true },
  })
}

const createSubmission = async (payload) => {
  return await prisma.submission.create({
    data: payload,
  })
}

const updateSubmission = async (filter, payload) => {
  return await prisma.submission.update({
    where: filter,
    data: payload,
  })
}

const deleteSubmission = async (filter) => {
  return await prisma.submission.delete({
    where: filter,
  })
}

export {
  findSubmissions,
  findSubmission,
  createSubmission,
  updateSubmission,
  deleteSubmission,
}
