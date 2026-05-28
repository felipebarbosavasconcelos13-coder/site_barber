# Plano de Implementação - Resolução de Segurança e Destravamento do Git Push (Auditoria de Código)

Este plano detalha o procedimento técnico para remover de forma segura o arquivo sensível `token.md` do histórico de commits do Git e consertar o `.gitignore`, permitindo destravar o `git push` e concluir o deploy automático das melhorias de segurança na Vercel de forma limpa.

---

## 🚦 Status Atual do Desenvolvimento
- [x] **Configuração da Variável de Ambiente na Vercel:** Chave secreta cadastrada de forma criptografada sob o nome `GOOGLE_PLACES_API_KEY`.
- [x] **Segurança no Backend (`api/places.js`):** Endpoint serverless atualizado para consumir a chave segura do servidor.
- [x] **Segurança no Frontend (`index.html`):** Chamada reativa ao places sem tráfego de credenciais client-side.
- [x] **Robustez no LocalStorage (`admin.html`):** Tratamento `try/catch` com modais dourados explicativos de estouro de cota implementados.
- [x] **Documentação de Logs:** Registrado e detalhado em `LOG_DESENVOLVIMENTO.md`.
- [ ] **Destravamento do Git Push (FALHA DE SEGURANÇA LOCAL):** O arquivo contendo o token de acesso da Vercel (`token.md`) foi indexado acidentalmente no commit local `824e329` e rejeitado pelo GitHub Push Protection.

---

## 🛠️ Alterações e Comandos Propostos para Resolução do Git

### 1. Resetar o Commit Local
- Vamos desfazer temporariamente o último commit local mantendo todas as modificações no código local intactas:
  ```powershell
  git reset --soft HEAD~1
  ```

### 2. Remover `token.md` do Cache do Git e do Histórico
- Vamos retirar o arquivo sensível `token.md` da área de preparação (*stage*) do Git:
  ```powershell
  git reset HEAD token.md
  ```
- Remover o arquivo do rastreamento definitivo do Git (mantendo-o fisicamente intacto no computador do usuário, apenas ignorado pelo Git):
  ```powershell
  git rm --cached token.md
  ```

### 3. Corrigir o Arquivo `.gitignore`
- Ajustar a linha 14 do `.gitignore` que foi mesclada incorretamente (está como `token.mdtoken_vercel*`) para ignorar de forma estrita o arquivo de token:
  ```gitignore
  token.md
  token_vercel*
  ```

### 4. Criar um Commit Limpo e Seguro
- Adicionar as correções seguras de código ao stage (incluindo o `.gitignore` corrigido):
  ```powershell
  git add .gitignore
  ```
- Refazer o commit apenas com os arquivos seguros:
  ```powershell
  git commit -m "security: oculta places apiKey em env var, adiciona tratamento try/catch no LocalStorage e ignora arquivos sensiveis"
  ```

### 5. Executar o Push com Sucesso
- Enviar as atualizações de forma segura para o GitHub do usuário:
  ```powershell
  git push
  ```

---

## 📋 Plano de Verificação

### Testes Visuais e Funcionais
1. **Verificação do Histórico do Git:** Garantir através de `git show` que o arquivo `token.md` não faz mais parte do commit e foi ignorado de forma definitiva no `.gitignore`.
2. **Confirmação do Push:** Verificar que a árvore local foi publicada com sucesso no GitHub e que o deploy automático na Vercel foi acionado sem bloqueios de segurança.
3. **Links Clicáveis:** Fornecer os links locais para validação das páginas e painel administrativos em apenas um clique.
