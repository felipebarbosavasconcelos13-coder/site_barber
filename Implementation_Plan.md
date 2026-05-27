# Plano de Implementação - Sincronização em Nuvem via Vercel KV (Banco de Dados Nativo)

Este documento descreve o plano detalhado para migrar o sistema de persistência das edições do site (que atualmente estão restritas ao `localStorage` do navegador local) para a nuvem da **Vercel** usando o recurso gratuito **Vercel KV (banco de dados Redis nativo)**. Com isso, qualquer alteração feita no painel administrativo será propagada instantaneamente para todos os visitantes do site, em qualquer navegador ou dispositivo do mundo.

---

## ⚠️ Ação Requerida do Usuário (Antes ou Depois de Aplicar o Código)

Para que essa sincronização funcione, você precisará ativar o banco de dados KV na sua conta da Vercel. É gratuito e leva menos de 1 minuto:

1. Acesse o painel da **Vercel** e clique no seu projeto da barbearia.
2. Vá até a aba **Storage** (Armazenamento).
3. Selecione a opção **KV (Redis)** e clique em **Create** (Criar).
4. Siga as instruções rápidas de confirmação para associar o KV ao seu projeto.
5. Pronto! A Vercel adicionará automaticamente as variáveis de ambiente `KV_REST_API_URL` e `KV_REST_API_TOKEN` de forma invisível nas suas Serverless Functions.

---

## 🛠️ Alterações Propostas

Para implementar essa arquitetura sem adicionar dependências complexas (npm), usaremos requisições REST internas direto nas Serverless Functions nativas da Vercel.

---

### 1. Novas Rotas de API (Serverless Functions)

#### [NEW] [get-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/get-config.js)
Criar o endpoint `/api/get-config` que lê a configuração salva no Vercel KV via chamada REST interna de forma ultra performática.

#### [NEW] [save-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/save-config.js)
Criar o endpoint `/api/save-config` que recebe a nova configuração e a valida contra a senha mestra criptográfica do painel administrativo (usando hash SHA-256 no servidor) antes de salvar no Vercel KV, garantindo total segurança contra invasões e alterações não autorizadas.

---

### 2. Sincronização na Landing Page (`index.html`)

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
* **Carregamento Híbrido Reativo (Nuvem + Fallback Local):**
  Ajustar o script de dinamização (`#dom-dinamizer`) para:
  1. Primeiro, renderizar imediatamente usando o `localStorage` como cache instantâneo ou a configuração estática padrão (evita efeito de piscada/layout shift na tela).
  2. Fazer um `fetch('/api/get-config')` assíncrono em segundo plano para buscar a versão em nuvem.
  3. Se houver novas atualizações na nuvem, atualizar o DOM suavemente e salvar a nova versão no `localStorage` local para os próximos acessos rápidos.

---

### 3. Sincronização no Painel Administrativo (`admin.html`)

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
* **Carregamento da Nuvem:**
  Ajustar a função `loadCurrentConfig()` para priorizar os dados vindos de `/api/get-config` em vez de carregar apenas do `localStorage` local.
* **Salvamento Duplo (Local + Nuvem):**
  Atualizar o evento de salvamento do formulário (`config-form` submit) para:
  1. Enviar os novos dados via POST para `/api/save-config` enviando junto a senha inserida no login para validação.
  2. Mostrar feedback visual de "Salvando na Nuvem..." e notificar sucesso total ao concluir.
  3. Manter o `localStorage` atualizado localmente também.

---

## 📋 Plano de Verificação

### Testes em Ambiente Local (com Vercel CLI)
1. Rodar `vercel dev` localmente.
2. Abrir o painel administrativo (`localhost:3000/admin`) em um navegador (ex: Chrome), fazer login com a senha mestre e alterar o título da Hero. Salvar.
3. Abrir a página principal em outro navegador totalmente zerado ou no modo anônimo (ex: Firefox) e verificar se o novo título foi renderizado dinamicamente direto da API.

### Testes em Produção
1. Realizar deploy na Vercel e garantir que o recurso Storage (KV) esteja ativado e associado ao projeto.
2. Acessar o site de qualquer smartphone e comprovar que as edições efetuadas no desktop aparecem instantaneamente.
