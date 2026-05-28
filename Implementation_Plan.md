# Plano de Mitigação: Remoção de Chave Exposta e Higienização do Histórico Git

O GitHub Secret Scanning detectou com precisão a exposição da chave do Google Places no log de desenvolvimento e no plano de implementação que foram integrados ao repositório remoto. Executaremos uma limpeza cirúrgica nos arquivos locais e no histórico de commits do Git para eliminar qualquer risco.

---

## 🚦 Status e Diagnóstico do Risco

### 1. Segredo Exposto no Histórico Git
O GitHub identificou a credencial ativa `[CHAVE_GOOGLE_PLACES_OCULTADA]` no arquivo `LOG_DESENVOLVIMENTO.md` na linha 469. Ela também consta no arquivo `Implementation_Plan.md` que foi enviado no commit `a2339a9`.
* **Risco:** Qualquer pessoa com acesso ao repositório público (ou scans automáticos maliciosos) poderia ler a chave de API e utilizá-la em serviços de terceiros, consumindo sua cota de faturamento no Google Cloud Console.
* **Mitigação:** Não basta fazer uma alteração posterior de remoção, pois o segredo continuará acessível no histórico de commits passados. A solução de segurança padrão é realizar o **mascaramento do arquivo local**, amalgamar a alteração no commit problemático via `git commit --amend` e forçar o envio via `git push --force` para reescrever o histórico remoto de forma 100% limpa.

---

## 📋 Etapas de Implementação Propostas

### 1. Higienização dos Arquivos Locais
* **LOG_DESENVOLVIMENTO.md:** Substituir a chave de API literal por `[CHAVE_GOOGLE_PLACES_OCULTADA]`.
* **Implementation_Plan.md:** Substituir a chave de API literal por `[CHAVE_GOOGLE_PLACES_OCULTADA]`.

### 2. Reescrever o Último Commit Localmente
* Executar a adição dos arquivos e a reescrita do último commit:
  ```bash
  git add LOG_DESENVOLVIMENTO.md Implementation_Plan.md
  git commit --amend --no-edit
  ```

### 3. Forçar Envio Remoto e Atualização de Histórico no GitHub
* Executar o push forçado para apagar permanentemente o commit anterior com a credencial exposta do GitHub:
  ```bash
  git push origin main --force
  ```

---

## 📋 Plano de Verificação

### Testes de Higienização Local e Remota
1. **Verificação de Chave no Código:** Executar `git grep -i "AIzaSyBc"` no repositório local e garantir que nenhuma ocorrência da chave original em texto limpo permaneça.
2. **Validação Operacional:** Acessar o link de produção `https://www.athenasbarbearia.com.br` e garantir que os depoimentos dinâmicos continuam funcionando e sincronizando normalmente (o que provará que as chaves em produção na Vercel continuam perfeitamente intactas e operacionais).
