'use client'
import { Task } from '@/types'

interface Props {
  task: Task
  onDelete: (id: string) => void
  onStatusChange: (id: string, status: Task['status']) => void
}

const statusLabels = { todo: 'A Fazer', in_progress: 'Em Progresso', done: 'Concluído' }
const priorityLabels = { low: 'Baixa', medium: 'Média', high: 'Alta' }
const nextStatus: Record<Task['status'], Task['status']> = {
  todo: 'in_progress',
  in_progress: 'done',
  done: 'todo',
}

export default function TaskCard({ task, onDelete, onStatusChange }: Props) {
  return (
    <div className="card" style={{ marginBottom: '0.75rem', position: 'relative' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
        <h3 style={{ margin: 0, fontSize: '1rem', fontWeight: 600 }}>{task.title}</h3>
        <button
          className="btn btn-danger"
          style={{ padding: '0.2rem 0.5rem', fontSize: '0.75rem' }}
          onClick={() => onDelete(task.id)}
        >
          ✕
        </button>
      </div>

      {task.description && (
        <p style={{ margin: '0 0 0.75rem', fontSize: '0.875rem', color: 'var(--muted)' }}>
          {task.description}
        </p>
      )}

      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
        <span className={`badge badge-${task.priority}`}>{priorityLabels[task.priority]}</span>
        <span className={`badge badge-${task.status}`}>{statusLabels[task.status]}</span>
        {task.assigned_to && (
          <span className="badge" style={{ background: 'var(--surface2)', color: 'var(--muted)' }}>
            👤 {task.assigned_to}
          </span>
        )}
      </div>

      <button
        className="btn btn-ghost"
        style={{ fontSize: '0.75rem', padding: '0.25rem 0.75rem' }}
        onClick={() => onStatusChange(task.id, nextStatus[task.status])}
      >
        {task.status === 'done' ? '↩ Reabrir' : task.status === 'todo' ? '▶ Iniciar' : '✓ Concluir'}
      </button>

      <div style={{ marginTop: '0.5rem', fontSize: '0.7rem', color: 'var(--muted)' }}>
        {new Date(task.created_at).toLocaleDateString('pt-BR')}
      </div>
    </div>
  )
}
