# Plano de Implementação - Sincronização em Nuvem via Supabase (Postgres)

Este documento descreve o plano detalhado para integrar o banco de dados **Supabase** (que você acabou de conectar com sucesso na Vercel!) como o novo provedor de persistência global do site. As alterações feitas no painel administrativo serão gravadas no Supabase e refletidas instantaneamente para todos os visitantes do site em qualquer navegador do mundo.

---

## ⚠️ Ação Requerida do Usuário (Configuração da Tabela no Supabase)

Como o Supabase é um banco de dados relacional (Postgres), precisamos criar uma tabela simples chamada `configuracoes` com suporte a JSON. É extremamente rápido:

1. Acesse o painel do seu projeto no **Supabase** (ou clique no link do seu banco gerado na Vercel).
2. No menu lateral esquerdo, clique em **SQL Editor** (ícone de terminal `>_`).
3. Clique em **New Query** (Nova Consulta).
4. Cole o seguinte código SQL simples no editor:

```sql
CREATE TABLE configuracoes (
  id TEXT PRIMARY KEY,
  dados JSONB NOT NULL
);
```

5. Clique no botão **Run** (Executar) no canto inferior direito.
6. Pronto! A tabela de configurações foi criada com sucesso e está pronta para receber as edições.

---

## 🛠️ Alterações Propostas

Adaptaremos a arquitetura já desenvolvida para se comunicar com as credenciais do **Supabase** injetadas pela Vercel (`STORAGE_URL` e `STORAGE_SERVICE_ROLE_KEY` / `STORAGE_ANON_KEY`).

---

### 1. Adaptação das APIs do Servidor (Serverless Functions)

#### [MODIFY] [get-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/get-config.js)
Refatorar a rota `/api/get-config` para buscar a linha correspondente ao ID `'barber_config'` na tabela `configuracoes` do Supabase via chamadas REST nativas do Postgres.

#### [MODIFY] [save-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/save-config.js)
Refatorar a rota `/api/save-config` para realizar um **UPSERT** (gravação e atualização inteligente de registro) seguro na tabela `configuracoes` usando o header de resolução de duplicatas do Supabase. A validação do hash SHA-256 da senha mestra continuará ativa no servidor para segurança total.

---

### 2. Sincronização e Resiliência (Landing Page & Painel)
Os arquivos `index.html` e `admin.html` continuarão se comunicando normalmente com os endpoints locais `/api/get-config` e `/api/save-config`, garantindo que toda a inteligência híbrida de cache rápido (`localStorage`) e resiliência a falhas de conexão continue funcionando de forma idêntica e sem quebras visuais.

---

## 📋 Plano de Verificação

### Testes em Ambiente Local (com Vercel CLI)
1. Rodar `vercel dev` para herdar as variáveis de ambiente do Supabase injetadas pelo link do projeto.
2. Efetuar edições e salvar no painel administrativo (`localhost:3000/admin`), testando a persistência remota no Postgres.

### Testes em Produção
1. Acessar o site de diferentes navegadores/celulares para validar que as alterações de cores, textos e mídias salvos na nuvem do Supabase aparecem instantaneamente para qualquer visitante.
