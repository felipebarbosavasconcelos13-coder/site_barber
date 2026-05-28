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
