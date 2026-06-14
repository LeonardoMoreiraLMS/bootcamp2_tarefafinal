import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "TaskFlow — Gerenciador de Tarefas",
  description: "Gerenciador de tarefas colaborativo com Supabase, Next.js e GitHub Actions",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
