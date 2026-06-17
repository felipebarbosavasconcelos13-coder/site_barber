# Plano de Implementacao

Este arquivo deve ser atualizado depois de cada alteracao junto com `LOG_DESENVOLVIMENTO.md`.

## Regra Operacional Permanente

1. Toda alteracao de codigo, layout, configuracao ou infraestrutura deve registrar:
   - Objetivo da mudanca.
   - Arquivos afetados.
   - Status de implementacao.
   - Verificacao realizada.
   - Proximos passos, se houver.
2. O `LOG_DESENVOLVIMENTO.md` registra o historico detalhado do que foi feito.
3. Este plano registra o estado atual, tarefas em andamento e criterios de validacao.

---

## [2026-05-28] Cores Dinamicas e Edicao de Secoes

### Objetivo

Corrigir diferencas visuais nas cores aplicadas aos elementos da landing page, principalmente botoes, filtros, badges e bordas, e permitir que o painel altere titulo/subtitulo das secoes Sobre & Dores e Servicos.

### Arquivos Afetados

* `index.html`
* `admin.html`
* `LOG_DESENVOLVIMENTO.md`
* `Implementation_Plan.md`

### Implementacao

1. **Cores dinamicas na landing page:** Concluido.
   - Overrides CSS adicionados para classes com opacidade baseadas em `primary-container`.
   - `applyConfig(config)` agora aplica variaveis CSS no `document.documentElement` quando recebe dados locais ou remotos.

2. **Cores dinamicas no painel:** Concluido.
   - `.gold-gradient`, `.gold-glow`, `.gold-glow-hover`, `.text-glow` e foco de inputs passaram a usar variaveis dinamicas.
   - Alteracoes de seletores/campos HEX atualizam a pre-visualizacao do painel imediatamente.

3. **Campos da secao Sobre & Dores:** Concluido.
   - Criados os inputs `s-section-title` e `s-section-subtitle` no painel.
   - Adicionados `section_title` e `section_subtitle` ao objeto `about`.
   - Landing page atualiza `about-section-title` e `about-section-subtitle`.

4. **Campos da secao Servicos:** Concluido.
   - Criados os inputs `services-section-title-input` e `services-section-subtitle-input` no painel.
   - Criado o objeto `services_section` com `title` e `subtitle`.
   - Landing page atualiza `services-section-title` e `services-section-subtitle`.

### Verificacao

* `git diff --check`: executado sem erros de whitespace.
* Aviso observado: conversao futura de `LF` para `CRLF` pelo Git no Windows.

### Validacao Manual Recomendada

1. Abrir `admin.html`.
2. Alterar a cor primaria e secundaria na aba Cores.
3. Confirmar que gradientes, botoes, bordas, filtros e foco dos inputs acompanham a nova paleta.
4. Alterar titulo/subtitulo em Sobre & Dores.
5. Alterar titulo/subtitulo em Servicos.
6. Salvar e abrir `index.html`.
7. Confirmar persistencia visual no LocalStorage e, se disponivel em ambiente Vercel, na nuvem.

### Proximos Passos

* Fazer validacao manual no navegador.
* Se aprovado, realizar commit e push para deploy continuo.

---

## [2026-05-28] Refinamento dos Botoes Secundarios

### Objetivo

Corrigir botoes que apareciam com texto escuro sobre fundo escuro, principalmente em Hero, cards de Servicos e Localizacao.

### Arquivos Afetados

* `index.html`
* `LOG_DESENVOLVIMENTO.md`
* `Implementation_Plan.md`

### Implementacao

1. **Classe `dynamic-outline-button`:** Concluido.
   - Texto, borda e fundo translÃºcido usam `--dynamic-primary` e `--dynamic-primary-rgb`.
   - Hover usa gradiente dinamico com `--dynamic-primary` e `--dynamic-secondary`.

2. **Botoes atualizados:** Concluido.
   - Hero secundario: `Conhecer Servicos`.
   - Servico 1: `Reservar Experiencia`.
   - Servico 2: `Reservar Experiencia`.
   - Localizacao secundario: `Falar com Recepcao`.

### Verificacao

* Aguardando validacao visual no navegador.

### Proximos Passos

* Confirmar contraste e consistencia visual dos botoes nas cores configuradas atualmente.

---

## [2026-06-14] Galeria de Imagens EditÃ¡vel (Headline e Sub-headline)

### Objetivo

Tornar os tÃ­tulos (headlines) e subtÃ­tulos (sub-headlines) de todas as fotos da galeria editÃ¡veis no painel de administraÃ§Ã£o (`admin.html`) e injetados de forma dinÃ¢mica na landing page (`index.html`).

### Arquivos Afetados

* `index.html`
* `admin.html`
* `LOG_DESENVOLVIMENTO.md`
* `Implementation_Plan.md`
* `DOCUMENTACAO.md`

### ImplementaÃ§Ã£o

1. **Estrutura HTML do Painel (`admin.html`):** ConcluÃ­do.
   - Criados inputs de texto no formulÃ¡rio da aba Galeria para headlines e sub-headlines de cortes, ambiente interno, ambiente externo e clientes.

2. **LÃ³gica de Salvamento e Carregamento (`admin.html`):** ConcluÃ­do.
   - Mapeados os novos campos na `DEFAULT_CONFIG` (com textos padrÃµes para evitar inputs vazios), em `populateFormFields()` para carregar os dados e no manipulador de salvamento (`submit`) para enviÃ¡-los ao LocalStorage/Supabase.

3. **InjeÃ§Ã£o DinÃ¢mica na Landing Page (`index.html`):** ConcluÃ­do.
   - Adicionados IDs descritivos para cada texto de imagem na seÃ§Ã£o da galeria desktop.
   - Atualizada a funÃ§Ã£o `updateDesktopGallery()` para ler do objeto de configuraÃ§Ã£o e injetar o texto correto no DOM.
   - Atualizado o carrossel mobile `renderMobileCarousel()` para ler os mesmos arrays de texto do objeto de configuraÃ§Ã£o.

4. **CriaÃ§Ã£o da DocumentaÃ§Ã£o:** ConcluÃ­do.
   - Criado o arquivo `DOCUMENTACAO.md` contendo a arquitetura e detalhes tÃ©cnicos atualizados.

### Criterios de ValidaÃ§Ã£o

1. Acessar o Painel de AdministraÃ§Ã£o (`/admin`).
2. Abrir a aba **Galeria**.
3. Alterar os tÃ­tulos e subtÃ­tulos de qualquer categoria de imagem (ex: mudar "Corte Signature" para "Corte Estilizado").
4. Salvar as alteraÃ§Ãµes.
5. Acessar a pÃ¡gina principal (`/`) e confirmar que o texto foi atualizado no desktop e no carrossel mobile.

### PrÃ³ximos Passos

1. Obter a aprovaÃ§Ã£o do usuÃ¡rio para o plano e alteraÃ§Ãµes executadas.
2. Commit e pus## [2026-06-14] Galeria DinÃ¢mica de Imagens (Adicionar & Excluir Fotos)

### Objetivo
Aprimorar a galeria de fotos para permitir que o administrador adicione novas fotos ou remova fotos existentes em qualquer uma das seÃ§Ãµes (Cortes & ServiÃ§os, Estrutura FÃ­sica e Clientes). A interface deixarÃ¡ de ter uma grade fixa com inputs enumerados estÃ¡ticos e passarÃ¡ a carregar painÃ©is de gerenciamento dinÃ¢micos em tempo de execuÃ§Ã£o.

### Status da ImplementaÃ§Ã£o: [CONCLUÃ�DO]

### User Review Required
> [!IMPORTANT]
> **AlteraÃ§Ã£o do Esquema de Dados (Retrocompatibilidade):** A estrutura de armazenamento do config foi unificada. Em vez de termos mÃºltiplos arrays de strings (`gallery`, `gallery_interno`, `gallery_clientes`) e arrays correspondentes de tÃ­tulos/subtÃ­tulos, salvamos tudo em um Ãºnico array de objetos `gallery: [{ id, category, img, img_mobile, title, desc }]`. 
> O carregamento inicial inclui uma lÃ³gica automÃ¡tica de normalizaÃ§Ã£o (`migrateGalleryFormat`). Ao carregar dados no formato antigo, o sistema converte instantaneamente as configuraÃ§Ãµes para o formato novo, garantindo que nenhuma foto ou texto atual seja perdido.

### Proposed Changes

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html) - *ConcluÃ­do*
- **Painel de AdministraÃ§Ã£o (HTML):** Reestruturar a aba "Galeria" para conter trÃªs contÃªineres dinÃ¢micos (`#admin-gallery-cortes`, `#admin-gallery-ambiente`, `#admin-gallery-clientes`) e botÃµes dourados "Adicionar Nova Imagem" ao final de cada um.
- **DEFAULT_CONFIG (JS):** Atualizar a galeria para o novo formato unificado de array de objetos.
- **FunÃ§Ã£o `renderAdminGallery()` (Novo JS):** FunÃ§Ã£o que lÃª `config.gallery`, filtra pelas categorias e monta no DOM os blocos com o preview da imagem, inputs de upload (desktop/mobile), inputs de headline/sub-headline e o botÃ£o vermelho "Excluir Imagem".
- **FunÃ§Ãµes `addGalleryItem(category)` e `deleteGalleryItem(id)` (Novo JS):** Controlam a inserÃ§Ã£o de novos objetos vazios e exclusÃ£o de itens especÃ­ficos com re-renderizaÃ§Ã£o em tempo real na tela de administraÃ§Ã£o.
- **Manipulador de Salvamento (`submit`):** Atualizado para percorrer todos os blocos gerados dinamicamente na tela e montar o array unificado `gallery` para salvar no banco.

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html) - *ConcluÃ­do*
- **Estrutura de Galeria (HTML):** Limpar o HTML estÃ¡tico do grid desktop (`#gallery-grid`) para ser preenchido dinamicamente via JavaScript.
- **RenderizaÃ§Ã£o DinÃ¢mica do Grid (`updateDesktopGallery`):** Atualizar o JavaScript para ler `config.gallery`, criar os elementos de imagem e legendas em formato Tailwind e injetÃ¡-los no DOM.
- **DelegaÃ§Ã£o de Eventos do Lightbox:** Ajustar o script do Lightbox para ouvir cliques delegados nos contÃªineres `#gallery-grid` e `#gallery-carousel`, garantindo que funcione para imagens adicionadas dinamicamente.
- **Carrossel Mobile (`renderMobileCarousel`):** Adaptar para ler a nova estrutura do array unificado `gallery` filtrando as imagens de acordo com a categoria de aba selecionada.

### Verification Plan

#### Manual Verification - *Realizado com Sucesso*
1. Abrir o painel administrativo e navegar atÃ© a aba **Galeria**.
2. Excluir uma imagem de cortes e salvar. Validar no `index.html` que ela sumiu.
3. Adicionar uma nova imagem na seÃ§Ã£o "Estrutura FÃ­sica (Ambiente)", preencher tÃ­tulo ("Ã�rea VIP"), descriÃ§Ã£o ("Luxo e conforto") e fazer upload de foto.
4. Salvar as alteraÃ§Ãµes.
5. Validar na landing page que o novo card aparece dinamicamente no grid de fotos e responde corretamente aos botÃµes de filtro e ao efeito de ampliaÃ§Ã£o do Lightbox.
6. Testar o layout responsivo em modo mobile e validar o carrossel.
µes de filtro e ao efeito de ampliaÃ§Ã£o do Lightbox.
6. Testar o layout responsivo em modo mobile e validar o carrossel.

---

## [2026-06-14] Separação do Bloco de Ambiente Externo na Galeria

### Objetivo
Tornar o "Ambiente Externo" uma categoria independente na galeria, permitindo ao administrador gerenciar (adicionar/excluir) fotos especificamente para o ambiente externo através de um bloco próprio no painel administrativo e corrigir a exibição do filtro "Ambiente Externo" no site principal.

### Proposed Changes

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- **Painel de Administração (HTML):** Desmembrar a seção "Estrutura Física (Ambiente)" em dois contêineres dinâmicos separados: "Ambiente Interno" (`#admin-gallery-interno`) e "Ambiente Externo" (`#admin-gallery-externo`).
- **Lógica JavaScript:** 
  - Atualizar `renderAdminGallery()` para mapear as categorias para os respectivos contêineres e atualizar o `categoryCounters`.
  - Atualizar `migrateGalleryFormat()` para definir o campo `category` de qualquer imagem antiga convertida de `gallery_externo` para `'externo'`.

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- **Lógica JavaScript:**
  - Atualizar `migrateGalleryFormat()` para converter dados antigos de `gallery_externo` com a categoria `'externo'` (em vez de `'interno'`).

### Verification Plan

#### Manual Verification
1. Abrir o painel administrativo na aba Galeria e verificar os blocos separados de Ambiente Interno e Ambiente Externo.
2. Adicionar uma imagem no bloco de Ambiente Externo, salvar, e conferir no site público que o botão de filtro "Ambiente Externo" exibe a imagem correspondente.
3. Testar o funcionamento do Lightbox sobre a nova foto do ambiente externo.

---

## [2026-06-17] Adição do Bloco de Equipe (Barbeiros)

### Objetivo
Adicionar a categoria de fotos "Nossa Equipe" à galeria e criar uma seção dedicada "Nossa Equipe" (Mestres da Navalha) na landing page pública (`index.html`), permitindo ao administrador gerenciar a equipe de barbeiros (adicionar/excluir fotos, nomes e especialidades) através da aba Galeria no painel administrativo (`admin.html`).

### Arquivos Afetados
* `index.html`
* `admin.html`
* `Implementation_Plan.md`
* `LOG_DESENVOLVIMENTO.md`
* `DOCUMENTACAO.md`

### Mudanças Propostas

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- **HTML:** Adicionar o bloco dinâmico `#admin-gallery-equipe` na aba Galeria do painel administrativo.
- **Lógica JavaScript:** 
  - Atualizar a função `renderAdminGallery()` para gerenciar e renderizar itens sob a categoria `'equipe'`.
  - Adicionar exemplos de barbeiros no `DEFAULT_CONFIG` inicial.

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- **HTML:** 
  - Adicionar o botão de filtro "Nossa Equipe" na seção da Galeria.
  - Criar a nova seção `<section id="team-section">` logo abaixo da galeria com o grid de cards dos barbeiros.
- **Lógica JavaScript:**
  - Atualizar `applyConfig()` para popular dinamicamente a seção de equipe usando dados de `config.gallery` e gerar links personalizados de agendamento por WhatsApp para cada barbeiro.
  - Ocultar automaticamente a seção de equipe caso não existam barbeiros cadastrados.

### Criterios de Validação

#### Manual Verification
1. Abrir o painel administrativo na aba Galeria e verificar a nova seção "Nossa Equipe (Barbeiros)".
2. Adicionar fotos de barbeiros, definir nome (título) e especialidade (descrição) e salvar as alterações.
3. Abrir o site principal (`index.html`) e validar que o filtro "Nossa Equipe" exibe as fotos corretas.
4. Rolar até a seção "Mestres da Navalha" e validar o visual premium dos cards e o funcionamento do botão de agendamento do WhatsApp com mensagem personalizada contendo o nome do barbeiro.
5. Remover todos os barbeiros no painel, salvar, e conferir que a seção "Nossa Equipe" desapareceu da landing page de forma resiliente.

---

## [2026-06-17] Customização da Mensagem de WhatsApp da Equipe

### Objetivo
Criar uma aba dedicada no painel administrativo (`admin.html`) chamada **"Mestres da Navalha"** para permitir ao administrador editar o título da seção, o subtítulo, e o template da mensagem de WhatsApp enviada pelo cliente ao agendar com um profissional específico, usando suporte a tags dinâmicas como `{nome}`.

### Arquivos Afetados
* `index.html`
* `admin.html`
* `Implementation_Plan.md`
* `LOG_DESENVOLVIMENTO.md`
* `DOCUMENTACAO.md`

### Mudanças Propostas

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- **HTML:** 
  - Adicionar o botão de aba lateral "Mestres da Navalha" (`data-tab="equipesecao"`).
  - Adicionar a div de conteúdo da aba `#tab-content-equipesecao` com inputs para Título, Subtítulo e o Template de Mensagem do WhatsApp.
- **Lógica JavaScript:** 
  - Atualizar `DEFAULT_CONFIG` com a propriedade `team_section` padrão.
  - Sincronizar em `populateFormFields()` para carregar os valores do Supabase/LocalStorage.
  - Atualizar a lógica do formulário no evento `submit` para salvar as edições de `team_section`.

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- **HTML:** Adicionar IDs `#team-section-title` e `#team-section-subtitle` para o título e subtítulo da seção de equipe.
- **Lógica JavaScript:** 
  - Ler e injetar dinamicamente o título e subtítulo da seção de equipe salvos em `config.team_section`.
  - Ler o template da mensagem do WhatsApp, substituir a tag `{nome}` pelo nome do profissional selecionado e gerar o link correto de agendamento por WhatsApp para cada barbeiro.

### Criterios de Validação

#### Manual Verification
1. Acessar o painel administrativo na aba **Mestres da Navalha**.
2. Alterar o título, subtítulo e customizar a mensagem de WhatsApp (ex: *"Olá! Quero agendar com o profissional {nome}."*).
3. Salvar as edições e conferir na landing page pública que o título da seção foi atualizado.
4. Clicar no agendamento de um barbeiro e conferir se o redirecionamento contém a mensagem personalizada com o nome substituído adequadamente.

---

## [2026-06-17] Correção do Disparo de Webhook por Delegação de Eventos

### Objetivo
Corrigir a falha no disparo de webhook de rastreamento do WhatsApp nos botões que são gerados ou atualizados dinamicamente no DOM (como os botões da equipe "Mestres da Navalha" e outros re-renderizados após o carregamento inicial da página), aplicando o padrão de delegação de eventos (Event Delegation) no `document`.

### Arquivos Afetados
* `index.html`
* `Implementation_Plan.md`
* `LOG_DESENVOLVIMENTO.md`

### Mudanças Propostas

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- **Lógica JavaScript:**
  - Substituir o anexo de event listeners estáticos em `window.addEventListener('DOMContentLoaded')` por uma escuta de cliques delegada em `document.addEventListener('click')` para elementos que correspondam ou estejam dentro da classe `.wa-link`.
  - Capturar o clique em qualquer link do WhatsApp mesmo que tenha sido injetado assincronamente (como os botões da equipe).
  - Adicionar suporte específico para a seção de equipe (`#team-section`), identificando quando o clique ocorreu no botão "Agendar com Ele" e extraindo o nome do barbeiro no card para enviar como `service_name` no payload do webhook (ex: `"Agendamento com o profissional: Bruno Navalha"`).

### Criterios de Validação

#### Manual Verification
1. Configurar um webhook de teste nas integrações do painel administrativo.
2. Abrir a landing page (`index.html`) e habilitar a ferramenta de desenvolvedor do navegador na aba de rede (Network).
3. Clicar em botões estáticos de WhatsApp (como "Reservar Experiência" no cabeçalho) e verificar se o disparo assíncrono do webhook (POST) é enviado no console/rede.
4. Clicar no botão "Agendar com Ele" de um barbeiro específico e verificar se a requisição de webhook também é disparada com sucesso e se o payload contém o campo `service_name` customizado com o nome do barbeiro correspondente.

