import { Document } from 'mongoose'
import { Status } from '../enum/status.enum'

export interface TodoDoc extends Document {
  id: string

  title: string

  description: string

  status: Status
}

export interface Todo {
  id: string

  title: string

  description: string

  status: Status
}
