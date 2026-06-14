'use client'
import { useState } from 'react'
import { Task } from '@/types'

interface Props {
  onSubmit: (task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) => void
  onCancel: () => void
}

export default function TaskForm({ onSubmit, onCancel }: Props) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Task['priority']>('medium')
  const [assigned_to, setAssignedTo] = useState('')

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    onSubmit({ title, description, priority, status: 'todo', assigned_to })
  }

  return (
    <div className="card" style={{ marginBottom: '1.5rem', border: '1px solid var(--accent)' }}>
      <h3 style={{ margin: '0 0 1rem', fontSize: '1rem' }}>+ Nova Tarefa</h3>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Título *</label>
          <input value={title} onChange={e => setTitle(e.target.value)} placeholder="O que precisa ser feito?" required />
        </div>
        <div style={{ marginBottom: '0.75rem' }}>
          <label>Descrição</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} rows={2} placeholder="Detalhes opcionais..." />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem', marginBottom: '1rem' }}>
          <div>
            <label>Prioridade</label>
            <select value={priority} onChange={e => setPriority(e.target.value as Task['priority'])}>
              <option value="low">Baixa</option>
              <option value="medium">Média</option>
              <option value="high">Alta</option>
            </select>
          </div>
          <div>
            <label>Responsável</label>
            <input value={assigned_to} onChange={e => setAssignedTo(e.target.value)} placeholder="Nome do membro" />
          </div>
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button type="submit" className="btn btn-primary">Criar Tarefa</button>
          <button type="button" className="btn btn-ghost" onClick={onCancel}>Cancelar</button>
        </div>
      </form>
    </div>
  )
}
