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
   - Texto, borda e fundo translúcido usam `--dynamic-primary` e `--dynamic-primary-rgb`.
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

## [2026-06-14] Galeria de Imagens Editável (Headline e Sub-headline)

### Objetivo

Tornar os títulos (headlines) e subtítulos (sub-headlines) de todas as fotos da galeria editáveis no painel de administração (`admin.html`) e injetados de forma dinâmica na landing page (`index.html`).

### Arquivos Afetados

* `index.html`
* `admin.html`
* `LOG_DESENVOLVIMENTO.md`
* `Implementation_Plan.md`
* `DOCUMENTACAO.md`

### Implementação

1. **Estrutura HTML do Painel (`admin.html`):** Concluído.
   - Criados inputs de texto no formulário da aba Galeria para headlines e sub-headlines de cortes, ambiente interno, ambiente externo e clientes.

2. **Lógica de Salvamento e Carregamento (`admin.html`):** Concluído.
   - Mapeados os novos campos na `DEFAULT_CONFIG` (com textos padrões para evitar inputs vazios), em `populateFormFields()` para carregar os dados e no manipulador de salvamento (`submit`) para enviá-los ao LocalStorage/Supabase.

3. **Injeção Dinâmica na Landing Page (`index.html`):** Concluído.
   - Adicionados IDs descritivos para cada texto de imagem na seção da galeria desktop.
   - Atualizada a função `updateDesktopGallery()` para ler do objeto de configuração e injetar o texto correto no DOM.
   - Atualizado o carrossel mobile `renderMobileCarousel()` para ler os mesmos arrays de texto do objeto de configuração.

4. **Criação da Documentação:** Concluído.
   - Criado o arquivo `DOCUMENTACAO.md` contendo a arquitetura e detalhes técnicos atualizados.

### Criterios de Validação

1. Acessar o Painel de Administração (`/admin`).
2. Abrir a aba **Galeria**.
3. Alterar os títulos e subtítulos de qualquer categoria de imagem (ex: mudar "Corte Signature" para "Corte Estilizado").
4. Salvar as alterações.
5. Acessar a página principal (`/`) e confirmar que o texto foi atualizado no desktop e no carrossel mobile.

### Próximos Passos

1. Obter a aprovação do usuário para o plano e alterações executadas.
2. Commit e pus## [2026-06-14] Galeria Dinâmica de Imagens (Adicionar & Excluir Fotos)

### Objetivo
Aprimorar a galeria de fotos para permitir que o administrador adicione novas fotos ou remova fotos existentes em qualquer uma das seções (Cortes & Serviços, Estrutura Física e Clientes). A interface deixará de ter uma grade fixa com inputs enumerados estáticos e passará a carregar painéis de gerenciamento dinâmicos em tempo de execução.

### Status da Implementação: [CONCLUÍDO]

### User Review Required
> [!IMPORTANT]
> **Alteração do Esquema de Dados (Retrocompatibilidade):** A estrutura de armazenamento do config foi unificada. Em vez de termos múltiplos arrays de strings (`gallery`, `gallery_interno`, `gallery_clientes`) e arrays correspondentes de títulos/subtítulos, salvamos tudo em um único array de objetos `gallery: [{ id, category, img, img_mobile, title, desc }]`. 
> O carregamento inicial inclui uma lógica automática de normalização (`migrateGalleryFormat`). Ao carregar dados no formato antigo, o sistema converte instantaneamente as configurações para o formato novo, garantindo que nenhuma foto ou texto atual seja perdido.

### Proposed Changes

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html) - *Concluído*
- **Painel de Administração (HTML):** Reestruturar a aba "Galeria" para conter três contêineres dinâmicos (`#admin-gallery-cortes`, `#admin-gallery-ambiente`, `#admin-gallery-clientes`) e botões dourados "Adicionar Nova Imagem" ao final de cada um.
- **DEFAULT_CONFIG (JS):** Atualizar a galeria para o novo formato unificado de array de objetos.
- **Função `renderAdminGallery()` (Novo JS):** Função que lê `config.gallery`, filtra pelas categorias e monta no DOM os blocos com o preview da imagem, inputs de upload (desktop/mobile), inputs de headline/sub-headline e o botão vermelho "Excluir Imagem".
- **Funções `addGalleryItem(category)` e `deleteGalleryItem(id)` (Novo JS):** Controlam a inserção de novos objetos vazios e exclusão de itens específicos com re-renderização em tempo real na tela de administração.
- **Manipulador de Salvamento (`submit`):** Atualizado para percorrer todos os blocos gerados dinamicamente na tela e montar o array unificado `gallery` para salvar no banco.

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html) - *Concluído*
- **Estrutura de Galeria (HTML):** Limpar o HTML estático do grid desktop (`#gallery-grid`) para ser preenchido dinamicamente via JavaScript.
- **Renderização Dinâmica do Grid (`updateDesktopGallery`):** Atualizar o JavaScript para ler `config.gallery`, criar os elementos de imagem e legendas em formato Tailwind e injetá-los no DOM.
- **Delegação de Eventos do Lightbox:** Ajustar o script do Lightbox para ouvir cliques delegados nos contêineres `#gallery-grid` e `#gallery-carousel`, garantindo que funcione para imagens adicionadas dinamicamente.
- **Carrossel Mobile (`renderMobileCarousel`):** Adaptar para ler a nova estrutura do array unificado `gallery` filtrando as imagens de acordo com a categoria de aba selecionada.

### Verification Plan

#### Manual Verification - *Realizado com Sucesso*
1. Abrir o painel administrativo e navegar até a aba **Galeria**.
2. Excluir uma imagem de cortes e salvar. Validar no `index.html` que ela sumiu.
3. Adicionar uma nova imagem na seção "Estrutura Física (Ambiente)", preencher título ("Área VIP"), descrição ("Luxo e conforto") e fazer upload de foto.
4. Salvar as alterações.
5. Validar na landing page que o novo card aparece dinamicamente no grid de fotos e responde corretamente aos botões de filtro e ao efeito de ampliação do Lightbox.
6. Testar o layout responsivo em modo mobile e validar o carrossel.
�es de filtro e ao efeito de ampliação do Lightbox.
6. Testar o layout responsivo em modo mobile e validar o carrossel.
