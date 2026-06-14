import { Task } from '../types'

// Helpers puros para testar sem Supabase
function filterByStatus(tasks: Task[], status: Task['status']): Task[] {
  return tasks.filter(t => t.status === status)
}

function sortByPriority(tasks: Task[]): Task[] {
  const order = { high: 0, medium: 1, low: 2 }
  return [...tasks].sort((a, b) => order[a.priority] - order[b.priority])
}

function countByStatus(tasks: Task[]): Record<Task['status'], number> {
  return {
    todo: tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    done: tasks.filter(t => t.status === 'done').length,
  }
}

const mockTasks: Task[] = [
  {
    id: '1', title: 'Setup projeto', description: '',
    status: 'done', priority: 'high',
    assigned_to: 'Leonardo', created_at: '2024-01-01', updated_at: '2024-01-01'
  },
  {
    id: '2', title: 'Criar componentes', description: '',
    status: 'in_progress', priority: 'medium',
    assigned_to: 'Leonardo', created_at: '2024-01-02', updated_at: '2024-01-02'
  },
  {
    id: '3', title: 'Escrever testes', description: '',
    status: 'todo', priority: 'low',
    assigned_to: 'Leonardo', created_at: '2024-01-03', updated_at: '2024-01-03'
  },
  {
    id: '4', title: 'Deploy na Vercel', description: '',
    status: 'todo', priority: 'high',
    assigned_to: 'Leonardo', created_at: '2024-01-04', updated_at: '2024-01-04'
  },
]

describe('filterByStatus', () => {
  test('retorna apenas tarefas com status "todo"', () => {
    const result = filterByStatus(mockTasks, 'todo')
    expect(result).toHaveLength(2)
    result.forEach(t => expect(t.status).toBe('todo'))
  })

  test('retorna apenas tarefas "in_progress"', () => {
    const result = filterByStatus(mockTasks, 'in_progress')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('2')
  })

  test('retorna apenas tarefas "done"', () => {
    const result = filterByStatus(mockTasks, 'done')
    expect(result).toHaveLength(1)
    expect(result[0].id).toBe('1')
  })

  test('retorna lista vazia se nenhuma tarefa tem o status', () => {
    const result = filterByStatus([], 'todo')
    expect(result).toHaveLength(0)
  })
})

describe('sortByPriority', () => {
  test('ordena tarefas por prioridade: high > medium > low', () => {
    const result = sortByPriority(mockTasks)
    expect(result[0].priority).toBe('high')
    expect(result[result.length - 1].priority).toBe('low')
  })

  test('não muta o array original', () => {
    const original = [...mockTasks]
    sortByPriority(mockTasks)
    expect(mockTasks).toEqual(original)
  })
})

describe('countByStatus', () => {
  test('conta corretamente por status', () => {
    const counts = countByStatus(mockTasks)
    expect(counts.todo).toBe(2)
    expect(counts.in_progress).toBe(1)
    expect(counts.done).toBe(1)
  })

  test('retorna zeros para lista vazia', () => {
    const counts = countByStatus([])
    expect(counts.todo).toBe(0)
    expect(counts.in_progress).toBe(0)
    expect(counts.done).toBe(0)
  })
})
