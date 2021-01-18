import { Status } from '../src/todo/enum/status.enum'

export const checkStatus = (status: Status): boolean => Object.values(Status).includes(status)
