import { randomUUID } from 'node:crypto'

export interface TaskProps {
  title: string
  description?: string | null
  userId: string
  isCompleted: boolean
  createdAt?: Date
  updatedAt?: Date | null
}

export class Task {
  private _id: string
  private props: TaskProps

  constructor(props: TaskProps, id?: string) {
    this._id = id ?? randomUUID()
    this.props = {
      ...props,
      isCompleted: props.isCompleted ?? false,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? null,
    }
  }

  get id() {
    return this._id
  }

  get title() {
    return this.props.title
  }

  set title(title: string) {
    this.props.title = title
    this.touch()
  }

  get description() {
    return this.props.description
  }

  set description(description: string | undefined | null) {
    this.props.description = description
    this.touch()
  }

  get userId() {
    return this.props.userId
  }

  get isCompleted() {
    return this.props.isCompleted
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  complete() {
    this.props.isCompleted = true
    this.touch()
  }

  uncomplete() {
    this.props.isCompleted = false
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }
}
