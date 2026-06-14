export type Priority = 'low' | 'medium' | 'high'
export type Status = 'todo' | 'in_progress' | 'done'

export interface Task {
  id: string
  title: string
  description: string
  status: Status
  priority: Priority
  assigned_to: string
  created_at: string
  updated_at: string
}

export interface Member {
  name: string
  matricula: string
}
