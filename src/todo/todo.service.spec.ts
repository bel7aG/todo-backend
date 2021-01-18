import { TodoService } from './todo.service'
import { Test } from '@nestjs/testing'
import { Status } from './enum/status.enum'
import { TodoDoc, Todo } from './interfaces/todo.interface'
import { Model } from 'mongoose'
import { getModelToken } from '@nestjs/mongoose'
import { v4 as uuidv4 } from 'uuid'

const ID = uuidv4()

const mockTodo: (title?: string, description?: string) => Todo = (
  title = 'design header',
  description = 'Create a Figma desing for the header.'
) => {
  return {
    id: ID,
    title,
    description,
    status: Status.TODO
  }
}

const mockTodoDoc: (mock?: { title?: string; description?: string }) => Partial<TodoDoc> = (mock?: {
  title: string
  description: string
}) => {
  return {
    id: ID,
    title: (mock && mock.title) || 'design header',
    description: (mock && mock.description) || 'Create a Figma desing for the header.',
    status: Status.TODO
  }
}

const todoArray: Todo[] = [
  mockTodo(),
  mockTodo('Create a cronjob.', 'This cron must run 4 times a day in the todo app.'),
  mockTodo('Setup styled components in NextJS', 'This is an important to have a smart css.')
]

const todoDocArray = [
  mockTodoDoc(),
  mockTodoDoc({ title: 'Create a cronjob.', description: 'This cron must run 4 times a day in the todo app.' }),
  mockTodoDoc({ title: 'Setup styled components in NextJS', description: 'This is an important to have a smart css.' })
]

const useValue = {
  new: jest.fn().mockResolvedValue(mockTodo()),
  constructor: jest.fn().mockResolvedValue(mockTodo()),
  find: jest.fn(),
  findOne: jest.fn(),
  create: jest.fn(),
  exec: jest.fn(),
  findAll: jest.fn()
}

describe('TodoService', () => {
  let todoService
  let model: Model<TodoDoc>

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      providers: [TodoService, { provide: getModelToken('Todo'), useValue }]
    }).compile()

    todoService = module.get<TodoService>(TodoService)
    model = module.get<Model<TodoDoc>>(getModelToken('Todo'))
  })

  it('should be defined', () => {
    expect(todoService).toBeDefined()
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  describe('Todoservice.findAll', () => {
    it('fetch all todos from the TodoService', async () => {
      jest.spyOn(model, 'find').mockReturnValue({
        exec: jest.fn().mockResolvedValueOnce(todoDocArray)
      } as any)
      const todos = await todoService.findAll()

      expect(todos).toEqual(todoArray)
    })

    it('should insert a new cat', async () => {
      jest.spyOn(model, 'create').mockImplementationOnce(
        () =>
          Promise.resolve({
            id: ID,
            title: 'develop the smooth scroll.',
            description: 'can be an important for a modern UX',
            status: Status.TODO
          }) as any
      )
      const newTodo = await todoService.create({
        title: 'develop the smooth scroll.',
        description: 'can be an important for a modern UX'
      })
      expect(newTodo).toEqual(mockTodo('develop the smooth scroll.', 'can be an important for a modern UX'))
    })
  })
})
