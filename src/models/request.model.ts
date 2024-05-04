import mongoose, { Schema, Model, Document } from 'mongoose'

type RequestHelpDocument = Document & {
  fullName: string
  phone: string
  address: string
  need: string
  document: string
}

type RequestHelpInput = {
  fullName: RequestHelpDocument['fullName']
  phone: RequestHelpDocument['phone']
  address: RequestHelpDocument['address']
  need: RequestHelpDocument['need']
  document: RequestHelpDocument['document']
}

const requestHelpSchema = new Schema(
  {
    fullName: {
      type: Schema.Types.String,
      required: true
    },
    phone: {
      type: Schema.Types.String,
      required: true,
    },
    address: {
      type: Schema.Types.String,
      required: true
    },
    need: {
      type: Schema.Types.String,
      default: true
    },
    document: {
      type: Schema.Types.String,
      required: true,
      index: true
    }
  },
  {
    collection: 'requests',
    timestamps: true
  },
)

const RequestHelp: Model<RequestHelpDocument> = mongoose.model<RequestHelpDocument>('RequestHelp', requestHelpSchema)

export { RequestHelp, RequestHelpInput, RequestHelpDocument }
