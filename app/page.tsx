'use client'
import { useEffect, useState } from 'react'
import { getTasks, createTask, updateTask, deleteTask } from '@/lib/tasks'
import { Task } from '@/types'
import TaskCard from '@/components/TaskCard'
import TaskForm from '@/components/TaskForm'

const columns: { key: Task['status']; label: string; icon: string }[] = [
  { key: 'todo', label: 'A Fazer', icon: '📋' },
  { key: 'in_progress', label: 'Em Progresso', icon: '⚡' },
  { key: 'done', label: 'Concluído', icon: '✅' },
]

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [showForm, setShowForm] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    loadTasks()
  }, [])

  async function loadTasks() {
    try {
      setLoading(true)
      const data = await getTasks()
      setTasks(data)
    } catch (err) {
      setError('Erro ao carregar tarefas. Verifique as variáveis de ambiente do Supabase.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  async function handleCreate(task: Omit<Task, 'id' | 'created_at' | 'updated_at'>) {
    try {
      const newTask = await createTask(task)
      setTasks(prev => [newTask, ...prev])
      setShowForm(false)
    } catch (err) {
      console.error(err)
      alert('Erro ao criar tarefa.')
    }
  }

  async function handleDelete(id: string) {
    if (!confirm('Excluir esta tarefa?')) return
    try {
      await deleteTask(id)
      setTasks(prev => prev.filter(t => t.id !== id))
    } catch (err) {
      console.error(err)
    }
  }

  async function handleStatusChange(id: string, status: Task['status']) {
    try {
      const updated = await updateTask(id, { status })
      setTasks(prev => prev.map(t => t.id === id ? updated : t))
    } catch (err) {
      console.error(err)
    }
  }

  const byStatus = (status: Task['status']) => tasks.filter(t => t.status === status)

  if (!mounted) return null

  return (
    <main style={{ minHeight: '100vh', background: 'var(--bg)' }}>
      <header style={{
        background: 'var(--surface)', borderBottom: '1px solid var(--border)',
        padding: '1rem 2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <span style={{ fontSize: '1.5rem' }}>⚡</span>
          <div>
            <h1 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 700 }}>TaskFlow</h1>
            <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--muted)' }}>Gerenciador de Tarefas Colaborativo</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{tasks.length} tarefas</span>
          <button className="btn btn-primary" onClick={() => setShowForm(!showForm)}>
            {showForm ? '✕ Fechar' : '+ Nova Tarefa'}
          </button>
        </div>
      </header>

      <div style={{ padding: '1.5rem 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
          {columns.map(col => (
            <div key={col.key} className="card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '1.5rem', marginBottom: '0.25rem' }}>{col.icon}</div>
              <div style={{ fontSize: '2rem', fontWeight: 700, color: 'var(--accent)' }}>{byStatus(col.key).length}</div>
              <div style={{ fontSize: '0.8rem', color: 'var(--muted)' }}>{col.label}</div>
            </div>
          ))}
        </div>

        {error && (
          <div className="card" style={{ border: '1px solid var(--danger)', color: 'var(--danger)', marginBottom: '1rem' }}>
            ⚠ {error}
          </div>
        )}

        {showForm && <TaskForm onSubmit={handleCreate} onCancel={() => setShowForm(false)} />}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--muted)' }}>Carregando...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
            {columns.map(col => (
              <div key={col.key}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', paddingBottom: '0.5rem', borderBottom: '1px solid var(--border)' }}>
                  <span>{col.icon}</span>
                  <span style={{ fontWeight: 600 }}>{col.label}</span>
                  <span style={{ marginLeft: 'auto', background: 'var(--surface2)', padding: '0.1rem 0.5rem', borderRadius: '99px', fontSize: '0.75rem', color: 'var(--muted)' }}>
                    {byStatus(col.key).length}
                  </span>
                </div>
                {byStatus(col.key).length === 0 ? (
                  <div style={{ border: '2px dashed var(--border)', borderRadius: '12px', padding: '2rem', textAlign: 'center', color: 'var(--muted)', fontSize: '0.85rem' }}>
                    Nenhuma tarefa
                  </div>
                ) : (
                  byStatus(col.key).map(task => (
                    <TaskCard key={task.id} task={task} onDelete={handleDelete} onStatusChange={handleStatusChange} />
                  ))
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      <footer style={{ padding: '1rem 2rem', borderTop: '1px solid var(--border)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--muted)' }}>
        TaskFlow · Leonardo Moreira Soares (22503940) · Next.js + Supabase + GitHub Actions
      </footer>
    </main>
  )
}
