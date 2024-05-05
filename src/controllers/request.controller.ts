import { Request, Response } from 'express'

import { RequestHelp, RequestHelpDocument, RequestHelpInput, RequestHelpStatuses } from '../models/request.model'

const createRequest = async (req: Request, res: Response) => {
  const { fullName, phone, address, need, document } = req.body

  if (!fullName || !phone || !address || !need || !document) {
    return res.status(422).json({ message: 'The fields fullName, address, need and document are required' })
  }

  if (!isValidCPF(document)) {
    return res.status(406).json({ message: 'Document invalid' })
  }

  const userInput: RequestHelpInput = {
    fullName,
    phone,
    address,
    need,
    document,
    status: RequestHelpStatuses.OPEN
  }

  const requestCreated = await RequestHelp.create(userInput)

  return res.status(201).json({ data: requestCreated })
}

const getAllRequests = async (req: Request, res: Response) => {
  const requests = await RequestHelp.find({status: RequestHelpStatuses.OPEN}).sort('-createdAt').exec()

  return res.status(200).json({ data: requests })
}

const getRequest = async (req: Request, res: Response) => {
  const { id } = req.params

  const user = await RequestHelp.findOne({ _id: id }).exec()

  if (!user) {
    return res.status(404).json({ message: `User with id "${id}" not found.` })
  }

  return res.status(200).json({ data: user })
}

const updateRequest = async (req: Request, res: Response) => {
  const { id } = req.params
  const { enabled, fullName, role } = req.body

  const requestHelp = await RequestHelp.findOne({ _id: id })

  if (!requestHelp) {
    return res.status(404).json({ message: `Request with id "${id}" not found.` })
  }

  if (!fullName || !role) {
    return res.status(422).json({ message: 'The fields fullName and role are required' })
  }

  await RequestHelp.updateOne({ _id: id }, { enabled, fullName, role })

  const userUpdated = await RequestHelp.findById(id)

  return res.status(200).json({ data: userUpdated })
}

const finishRequest = async (req: Request, res: Response) => {
  const { document } = req.body

  if (!document) {
    return res.status(422).json({ message: 'The fields document is required' })
  }

  const requestHelp = await RequestHelp.findOne({ document, status: RequestHelpStatuses.OPEN }).sort('-createdAt').exec()

  if (!requestHelp) {
    return res.status(404).json({ message: `Request for the given document not found.` })
  }

  await RequestHelp.updateOne({ _id: requestHelp._id }, {
    status: RequestHelpStatuses.CLOSED
  })

  const requestHelpUpdated = await RequestHelp.findById(requestHelp._id)

  return res.status(200).json({ data: requestHelpUpdated })
}

const deleteRequest = async (req: Request, res: Response) => {
  const { id } = req.params

  await RequestHelp.findByIdAndDelete(id)

  return res.status(200).json({ message: 'User deleted successfully.' })
}

const isValidCPF = (document: string) => {
  if (typeof document !== 'string') return false
  document = document.replace(/[^\d]+/g, '')
  if (document.length !== 11 || !!document.match(/(\d)\1{10}/)) return false
  const documentArray: string[] = document.split('')
  const validator = documentArray
      .filter((digit, index, array) => index >= array.length - 2 && digit)
      .map( el => +el )
  const toValidate = pop => documentArray
      .filter((digit, index, array) => index < array.length - pop && digit)
      .map(el => +el)
  const rest = (count, pop) => (toValidate(pop)
      .reduce((soma, el, i) => soma + el * (count - i), 0) * 10) % 11 % 10
  return !(rest(10,2) !== validator[0] || rest(11,1) !== validator[1])
}

export { 
  createRequest,
  getAllRequests,
  getRequest,
  finishRequest
}
