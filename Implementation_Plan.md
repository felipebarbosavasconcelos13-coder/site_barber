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
2. Realizar o commit e push das alterações para o GitHub para deploy automático na Vercel.

