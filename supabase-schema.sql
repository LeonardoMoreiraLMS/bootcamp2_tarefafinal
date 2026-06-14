-- Execute este SQL no Supabase: Dashboard > SQL Editor > New Query

-- Tabela de tarefas
CREATE TABLE IF NOT EXISTS tasks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'todo' CHECK (status IN ('todo', 'in_progress', 'done')),
  priority TEXT NOT NULL DEFAULT 'medium' CHECK (priority IN ('low', 'medium', 'high')),
  assigned_to TEXT DEFAULT '',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar RLS (Row Level Security)
ALTER TABLE tasks ENABLE ROW LEVEL SECURITY;

-- Policy: permitir leitura pública
CREATE POLICY "Leitura pública" ON tasks
  FOR SELECT USING (true);

-- Policy: permitir inserção pública
CREATE POLICY "Inserção pública" ON tasks
  FOR INSERT WITH CHECK (true);

-- Policy: permitir atualização pública
CREATE POLICY "Atualização pública" ON tasks
  FOR UPDATE USING (true);

-- Policy: permitir exclusão pública
CREATE POLICY "Exclusão pública" ON tasks
  FOR DELETE USING (true);

-- Dados de exemplo
INSERT INTO tasks (title, description, status, priority, assigned_to) VALUES
  ('Setup do repositório GitHub', 'Criar repo, adicionar colaboradores e configurar branches', 'done', 'high', 'Leonardo'),
  ('Integração com Supabase', 'Conectar banco de dados e configurar variáveis de ambiente', 'in_progress', 'high', 'Leonardo'),
  ('Pipeline CI/CD', 'Configurar GitHub Actions para testes e build automáticos', 'todo', 'medium', 'Leonardo'),
  ('Deploy na Vercel', 'Publicar aplicação e configurar variáveis de produção', 'todo', 'high', 'Leonardo'),
  ('Escrever README', 'Documentar stack, instruções de instalação e integrantes', 'todo', 'low', 'Leonardo');
