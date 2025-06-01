import prisma from '../../config/prisma.js'

const findAdmins = async (filter, options) => {
  if (options?.page && options?.limit) {
    options.skip = (options?.page - 1) * options?.limit
  }

  return await prisma.admin.findMany({
    where: filter,
    skip: options?.skip || 0,
    take: options?.limit || 20,
    omit: { password: true },
  })
}

const findAdmin = async (filter, options) => {
  return await prisma.admin.findUnique({
    where: filter,
    select: options?.select,
  })
}

const createAdmin = async (payload) => {
  return await prisma.admin.create({
    data: payload,
  })
}

const updateAdmin = async (filter, payload) => {
  return await prisma.admin.update({
    where: filter,
    data: payload,
  })
}

export { findAdmins, findAdmin, createAdmin, updateAdmin }
