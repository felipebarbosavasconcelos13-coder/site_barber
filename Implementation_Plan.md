# Plano de Implementação - Resolução de Conflito de Sincronização Supabase (Isolamento de Projetos)

Este plano descreve o procedimento para resolver o conflito de sincronização remota gerado por ter o mesmo banco de dados do Supabase configurado em dois projetos diferentes da Vercel (`site-barber` e `site-barber-m4gj`).

---

## 🚦 Status Atual do Desenvolvimento
- [x] **Segurança e Robustez:** Chaves Places ocultadas em variáveis de ambiente, LocalStorage blindado contra estouros de cota, Git push destravado e publicado com sucesso.
- [ ] **Resolução de Conflito do Supabase (BLOQUEIO OPERACIONAL):** Dois sites compartilhando a mesma linha (`id='barber_config'`) no banco de dados do Supabase, fazendo com que as edições de um salão sobrescrevam as do outro de forma caótica.

---

## 🛠️ Análise Técnica e Solução Proposta

Para criar novos projetos reais no Supabase de forma 100% automatizada pela nossa IDE, precisaríamos de um **Token de Acesso Pessoal da sua conta do Supabase**, que não está disponível localmente (só possuímos o token da Vercel).

No entanto, implementaremos uma **solução de engenharia de nível sênior e altamente robusta**: **Isolamento por ID de Configuração Dinâmica na Vercel**.
Como ambos os projetos da Vercel já estão conectados ao mesmo banco de dados do Supabase, faremos com que cada projeto grave e leia em **linhas separadas** da mesma tabela `configuracoes` usando chaves primárias distintas (`id='site_barber'` e `id='site_barber_m4gj'`).

Isso resolve 100% o conflito imediatamente e de forma invisível para você, sem exigir que você crie novos projetos ou chaves no Supabase!

---

## 📋 Etapas de Implementação

### 1. Injetar Variável de Ambiente Exclusiva nos Projetos da Vercel via API
Utilizaremos a API da Vercel (via token administrativo) para injetar a variável `SUPABASE_CONFIG_ID` com valores exclusivos para cada projeto:
- Para o projeto **`site-barber`** -> `SUPABASE_CONFIG_ID = "site_barber"`
- Para o projeto **`site-barber-m4gj`** -> `SUPABASE_CONFIG_ID = "site_barber_m4gj"`

### 2. Modificar o Injetor e Leitor do Backend (`api/get-config.js`)
#### [MODIFY] [get-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/get-config.js)
- Ler a variável dinamicamente de `process.env.SUPABASE_CONFIG_ID` (com fallback para `'barber_config'`):
  ```javascript
  const configId = process.env.SUPABASE_CONFIG_ID || 'barber_config';
  ```
- Ajustar a rota de busca REST para filtrar pelo ID dinâmico:
  ```javascript
  const response = await fetch(`${supabaseUrl}/rest/v1/configuracoes?id=eq.${configId}&select=dados`, {
  ```

### 3. Modificar o Salvamento no Backend (`api/save-config.js`)
#### [MODIFY] [save-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/save-config.js)
- Ler a variável `process.env.SUPABASE_CONFIG_ID` com fallback.
- Ajustar a carga útil do Upsert para gravar no ID exclusivo do respectivo site:
  ```javascript
  body: JSON.stringify({
      id: configId,
      dados: config
  })
  ```

### 4. Git Commit e Push
- Indexar as alterações nas Serverless Functions e realizar o push para a branch `main`, permitindo que os dois projetos façam o deploy imediato.

---

## 📋 Alternativa: Criação Manual de Projetos Separados no Supabase
Se você preferir ter dois projetos/bancos de dados do Supabase fisicamente separados na sua conta, basta seguir estes 3 passos simples no painel:
1. Acesse o painel da **Vercel** e vá nas configurações de um dos seus projetos.
2. Acesse a aba **Integrations**, encontre a integração do **Supabase**, clique em gerenciar e selecione **Disconnect**.
3. Clique em **Connect Integration** novamente e escolha **Create a New Project** no Supabase. A Vercel criará automaticamente o banco de dados separado e injetará as novas variáveis de ambiente corretas sem que você precise copiar códigos!

---

## 📋 Plano de Verificação

### Testes de Isolamento
1. **Gravação Isolada:** Salvar edições no painel do `site-barber-m4gj` e verificar que as configurações do `site-barber` original permanecem intocadas no banco de dados.
2. **Criação Automática de Linhas:** Garantir que o primeiro salvamento de cada site gera a linha de dados correspondente no Supabase automaticamente através do Upsert nativo.
