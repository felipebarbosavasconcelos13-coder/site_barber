# DOCUMENTAÇÃO DO PROJETO - SITE BARBEARIA PREMIUM

Esta documentação detalha a arquitetura técnica, fluxo de dados, integrações e estrutura de arquivos do projeto **Página de Barbearia Premium Elegance**. O projeto foi concebido sob conceitos de alta performance (Core Web Vitals), SEO avançado, UX/UI premium ("Obsidian & Gold") e arquitetura "Offline-First" com sincronização automática na nuvem.

---

## 1. Arquitetura Geral do Sistema

O projeto é estruturado como um aplicativo web estático hospedado na Vercel, suportado por **Serverless Functions** em Node.js (diretório `/api`) que realizam a ponte com serviços externos (Google Places e Supabase).

A persistência de dados é híbrida:
1. **Local-First (Cliente):** O navegador armazena e lê as configurações diretamente do `localStorage` para carregamento instantâneo sem FOUC (Flash of Unstyled Content).
2. **Nuvem (Supabase):** Um banco de dados relacional PostgreSQL remoto mantém as configurações centralizadas e sincronizadas de forma bidirecional.

```
                  ┌───────────────────────────────┐
                  │       Navegador Cliente       │
                  │ (index.html / admin.html)     │
                  └───────────────┬───────────────┘
                                  │
                  ┌───────────────┴───────────────┐
       Lê/Escreve │                               │ Chamadas de API
                  ▼                               ▼
       ┌────────────────────┐          ┌────────────────────┐
       │   LocalStorage     │          │ Vercel Serverless  │
       │ (Cache Instantâneo)│          │ (Diretório /api)   │
       └────────────────────┘          └──────────┬─────────┘
                                                  │
                                       ┌──────────┴─────────┐
                                       │  Serviços Externos │
                                       │ (Supabase/Google)  │
                                       └────────────────────┘
```

---

## 2. Estrutura de Arquivos

* [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html): A landing page pública principal. Consome dinamicamente o arquivo de configuração, renderiza os serviços, depoimentos, mapa e galeria de fotos.
* [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html): Painel de administração protegido por senha criptografada em SHA-256. Permite modificar textos, cores, botões, realizar upload de imagens (com compressão automática client-side) e gerenciar conexões.
* [api/get-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/get-config.js): Serverless Function que recupera a configuração ativa do banco de dados Supabase.
* [api/save-config.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/save-config.js): Serverless Function que valida a senha do administrador e salva a nova configuração no Supabase utilizando UPSERT.
* [api/places.js](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/api/places.js): Serverless Function que consulta depoimentos e notas reais da API do Google Places, protegendo a chave de faturamento no lado do servidor.
* **assets/**:
  * **css/app-compiled.min.css**: Folha de estilos compilada e otimizada (Tailwind CSS estático).
  * **js/tailwind.js**: Script do compilador Tailwind local para contingência e compatibilidade.
  * **images/**: Imagens locais de alta fidelidade em formato `.webp`.
  * **fonts/**: Arquivos locais das fontes Inter, Space Grotesk e ícones Material Symbols.

---

## 3. Fluxo de Dados e Persistência

### 3.1. Carregamento de Configurações
Tanto a página principal quanto o painel administrativo seguem um ciclo em duas etapas:
1. **Etapa Síncrona (LocalStorage):** O script `#theme-injector` lê as variáveis de cor e imagem do `localStorage` e as injeta na tag `<style>` e no `html` imediatamente. Isso garante que a página renderize com as cores certas sem efeito de piscar.
2. **Etapa Assíncrona (Supabase Fetch):** Em segundo plano, o script realiza um `fetch` para `/api/get-config`. Caso o servidor retorne um JSON válido e diferente do cache local, o `localStorage` é atualizado e as alterações são aplicadas reativamente no DOM sem necessidade de recarregar o navegador.

### 3.2. Salvamento e Segurança
No painel de controle (`admin.html`), ao salvar as alterações:
1. As mídias enviadas (imagens) são redimensionadas via HTML5 Canvas (Hero para 1200px e outras imagens para 800px) e compactadas em formato WebP/PNG para strings Base64 leves.
2. É gerado um payload JSON contendo a estrutura de dados completa do site.
3. O painel envia uma requisição `POST` para `/api/save-config` contendo a nova configuração e a senha de administração.
4. O servidor de API calcula o hash SHA-256 da senha enviada e valida contra o hash seguro armazenado nas variáveis de ambiente. Se validado, efetua o UPSERT no Supabase.

---

## 4. Funcionalidades e Código Detalhado

### 4.1. Galeria de Imagens Editável (Recurso Recente)
A galeria possui agora controle total e individual de imagens, headlines e sub-headlines para cada categoria, tanto no desktop quanto no carrossel mobile.

* **admin.html:**
  * Foram adicionados campos de entrada de texto (`<input type="text">`) com IDs no padrão `g-title-{index}`, `g-subtitle-{index}` (e correspondentes para ambiente `interno`, `externo` e `cliente`).
  * A variável `DEFAULT_CONFIG` inicializa esses títulos padrão para evitar que fiquem vazios.
  * O método `populateFormFields()` preenche os campos na tela com os valores do banco local/remoto.
  * O manipulador `submit` captura estes valores e os salva nos arrays `gallery_titles`, `gallery_subtitles`, `gallery_interno_titles`, `gallery_interno_subtitles`, `gallery_clientes_titles`, `gallery_clientes_subtitles` e strings simples `gallery_externo_title`, `gallery_externo_subtitle`.
* **index.html:**
  * No layout desktop, os elementos `<span>` e `<p>` sob cada imagem da galeria ganharam IDs únicos como `gallery-title-0` e `gallery-subtitle-0`.
  * A função `updateDesktopGallery()` atualiza o `innerText` desses elementos com o texto personalizado salvo no config.
  * O carrossel mobile dinâmico (`renderMobileCarousel()`) mapeia os arrays de títulos e descrições do config para gerar os slides reativos.

### 4.2. Integração Google Places API
Para coletar a nota de avaliação real e as 5 últimas avaliações do salão de forma nativa e sem CORS:
1. O cliente faz uma requisição para `/api/places` passando apenas o `placeId`.
2. A API Serverless completa a chamada com a chave de faturamento privada `GOOGLE_PLACES_API_KEY` (mantida em variável de ambiente da Vercel).
3. Os resultados são cacheados no `localStorage` do usuário para que os carregamentos subsequentes não consumam cota desnecessária da API do Google.

### 4.3. Rastreamento e Webhooks (Integração n8n)
O site possui rastreamento nativo de campanhas e integração para automação de CRM:
* **Parâmetros UTM:** O script lê tags como `utm_source`, `utm_medium`, `utm_campaign`, etc. da URL de entrada e as salva no `sessionStorage`.
* **Disparo de Webhook:** Ao clicar em qualquer botão de agendamento do WhatsApp com a classe `.wa-link`, o script intercepta o evento, monta um payload JSON contendo o serviço clicado, valor e todos os dados de rastreamento coletados, e envia via `POST` (em modo `no-cors` para total resiliência) para o Webhook configurado (ex: n8n) antes de redirecionar o usuário ao WhatsApp.

---

## 5. Como Executar e Implantar

### 5.1. Execução Local
Para testar o site localmente com suporte completo de banco de dados e APIs:
1. Instale a CLI da Vercel globalmente: `npm install -g vercel`.
2. Execute `vercel dev` na raiz do projeto. Isso subirá um servidor local simulando a infraestrutura da Vercel em `http://localhost:3000`.
3. Para acessar o painel de administração, navegue até `http://localhost:3000/admin`.

### 5.2. Configuração de Variáveis de Ambiente (Vercel)
Certifique-se de configurar as seguintes variáveis no painel da Vercel para funcionamento completo do backend:
* `SUPABASE_URL`: A URL do seu projeto Supabase.
* `SUPABASE_KEY`: A chave pública/service_role de acesso ao Supabase.
* `GOOGLE_PLACES_API_KEY`: Chave de faturamento do Google Cloud Console com Places API ativa.
* `ADMIN_PASSWORD_HASH`: Hash SHA-256 da senha mestra administrativa (`bb87999ce3ba58cef343d0a6c2d9d2d294b9f817eeee16dc3c05d6d6b331a5f5` para o padrão `6AEwhQnQCoTWHWF!id$52z`).
