import * as mongoose from 'mongoose'
import { Status } from '../enum/status.enum'

export const TodoSchema = new mongoose.Schema({
  title: String,

  description: String,

  status: {
    type: String,
    enum: [Status.TODO, Status.DONE],
    default: Status.TODO
  }
})
