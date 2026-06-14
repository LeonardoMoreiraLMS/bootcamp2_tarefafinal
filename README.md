# ⚡ TaskFlow — Gerenciador de Tarefas Colaborativo

Aplicação web para gerenciamento de tarefas em equipe com board Kanban, banco de dados em nuvem e deploy contínuo.

## 👥 Integrantes

| Nome | Matrícula |
|------|-----------|
| Leonardo Moreira Soares | 22503940 |

## 🛠 Stack

- **Frontend:** Next.js 15 + TypeScript + Tailwind CSS
- **Banco de Dados:** Supabase (PostgreSQL na nuvem)
- **CI/CD:** GitHub Actions (testes + build automáticos)
- **Deploy:** Vercel

## 🔗 Links

- **Repositório:** *(adicionar link)*
- **Aplicação:** *(adicionar link)*

## 🚀 Como rodar localmente

### Pré-requisitos
- Node.js 20+
- Conta no [Supabase](https://supabase.com)

### 1. Clone o repositório
```bash
git clone https://github.com/SEU-USUARIO/taskflow.git
cd taskflow
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure o Supabase
1. Crie um projeto em [supabase.com](https://supabase.com)
2. Vá em **SQL Editor** e execute o conteúdo de `supabase-schema.sql`
3. Copie as credenciais em **Settings > API**

### 4. Variáveis de ambiente
```bash
cp .env.example .env.local
# Edite .env.local com suas credenciais do Supabase
```

### 5. Inicie o servidor
```bash
npm run dev
```

Acesse [http://localhost:3000](http://localhost:3000)

## 🧪 Testes

```bash
npm test
```

## 🔄 CI/CD

A pipeline do GitHub Actions roda automaticamente a cada push:
1. **Testes** (`npm test`)
2. **Lint** (`npm run lint`)
3. **Build** (`npm run build`)

Configure os **Secrets** no GitHub:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

## 📁 Estrutura

```
taskflow/
├── app/              # Páginas Next.js (App Router)
├── components/       # Componentes reutilizáveis
├── lib/              # Integração Supabase
├── types/            # Tipos TypeScript
├── __tests__/        # Testes automatizados
└── .github/workflows/ # Pipeline CI/CD
```
