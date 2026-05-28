# Plano de Implementação - Nova Identidade Visual (BARBER & Logo B)

Este plano descreve o procedimento para a transição completa da identidade visual padrão da marca de **ELEGANCE** para **BARBER**, incluindo a substituição do monograma estático da letra **E** pela letra **B** nos componentes digitais da Landing Page (`index.html`) e do Painel Administrativo (`admin.html`).

---

## 🚦 Status das Modificações

### 1. Landing Page (`index.html`)
- [x] **Monograma no Loader:** Substituído o monograma estático antigo pela letra **B** estilizada no SVG com a fonte display de luxo `Space Grotesk`.
- [x] **Monograma na Barra de Navegação:** Atualizado para a letra **B** no SVG com gradiente dinâmico.
- [x] **Nome do Estabelecimento na Navegação:** Atualizado de `ELEGANCE` para `BARBER`.
- [ ] **Título e Metadados SEO:** Mudar o título (`<title>`) e meta tag `og:title` para `Barber Premium Barbershop`.
- [ ] **Textos Estáticos e Fallbacks:** Atualizar as menções textuais de "Elegance" nas seções de "O Padrão Elegance" para "O Padrão Barber", "Barba Elegance" para "Barba Barber", e "Clube Elegance" para "Clube Barber".
- [ ] **Dicionários de Configuração e Scripts:** Ajustar os fallbacks de inicialização no `#dom-dinamizer` e no theme injector.

### 2. Painel Administrativo (`admin.html`)
- [ ] **Monograma no Login:** Alterar o desenho vetorial (tag `<path>` estática) da letra "E" para a letra **B** usando a tag `<text>` com a tipografia premium `Space Grotesk`.
- [ ] **Monograma na Sidebar:** Atualizar o SVG de navegação lateral para exibir a letra **B** no lugar de "E".
- [ ] **Nome da Marca na Sidebar:** Alterar o texto estático de "Elegance" para "Barber".
- [ ] **Dicionário Padrão (Factory Reset):** Atualizar as strings no objeto `DEFAULT_CONFIG` para refletir as novas nomenclaturas (ex: `name: "Barber Premium"`, `solution_title: "O Padrão Barber"`, `name: "Barba Barber"`, etc.).

### 3. Documentação & Publicação
- [ ] **Log de Alterações:** Detalhar todas as substituições no arquivo `LOG_DESENVOLVIMENTO.md`.
- [ ] **Git Push:** Subir todas as modificações consolidadas para o repositório remoto no GitHub para deploy automático em produção na Vercel.

---

## 🛠️ Alterações Detalhadas Propostas

### 1. Refatoração de Metadados e Textos Estáticos no `index.html`
#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- **Título do Site (Linha 6):**
  - Mudar de `Elegance Premium Barbershop | Barbearia de Luxo em São Paulo` para `Barber Premium Barbershop | Barbearia de Luxo em São Paulo`.
- **Meta Tag OG Title (Linha 45):**
  - Mudar de `Elegance Premium Barbershop | Barbearia de Luxo` para `Barber Premium Barbershop | Barbearia de Luxo`.
- **Texto do Padrão (Linha 354):**
  - Mudar de `O Padrão Elegance` para `O Padrão Barber`.
- **Nome do Serviço 2 (Linha 408):**
  - Mudar de `Barba Elegance` para `Barba Barber`.
- **Link do WhatsApp do Serviço 2 (Linha 413):**
  - Ajustar o texto da mensagem padrão codificado na URL de `Barba%20Elegance` para `Barba%20Barber`.
- **Descrição do Serviço 3 (Linha 430):**
  - Ajustar a menção de `Barba Elegance` para `Barba Barber` no texto descritivo do Combo Imperial.
- **Título da Galeria (Linha 446):**
  - Mudar de `Explore a Experiência Elegance` para `Explore a Experiência Barber`.
- **Alt da Imagem da Galeria (Linha 571) e Legenda (Linha 574):**
  - Ajustar `Clientes no Lounge Elegance` para `Clientes no Lounge Barber` e a etiqueta `Clube Elegance` para `Clube Barber`.
- **Script da Galeria e Fallbacks (Linhas 956, 996, 1462):**
  - Sincronizar fallbacks e strings dos objetos JSON para a nova nomenclatura.

### 2. Refatoração de SVGs e Conteúdos no `admin.html`
#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- **Título da Página (Linha 6):**
  - Ajustar para `Barber Premium | Painel de Controle`.
- **SVG do Card de Login (Linhas 118-127):**
  - Remover a tag `<path>` (que desenha o "E") e substituí-la por uma tag `<text>` idêntica à do `index.html` contendo a letra **B** estilizada com `Space Grotesk`.
- **SVG da Sidebar Lateral (Linhas 154-163):**
  - Substituir a tag `<path>` pela tag `<text>` contendo a letra **B**.
- **Nome do Estabelecimento na Sidebar (Linha 165):**
  - Mudar de `Elegance` para `Barber`.
- **Dicionário Padrão `DEFAULT_CONFIG` (Linhas 920-990):**
  - Atualizar o nome da marca, URLs padrão das redes sociais, título da solução e o nome do serviço para a nova identidade visual.

---

## 📋 Plano de Verificação

1. **Validação Visual Local:**
   - Abrir o site principal (`index.html`) e o painel (`admin.html`) localmente e verificar se todos os monogramas "E" sumiram e foram perfeitamente substituídos pelo monograma "B" tipográfico com os gradientes dourados ativos.
   - Verificar se as strings de "ELEGANCE" / "Elegance" foram completamente alteradas para "BARBER" / "Barber" em todos os cabeçalhos, rodapés, seções, descrições e botões.
2. **Validação de Inputs e Reset:**
   - Entrar no painel de administração (`admin.html`), clicar em "Resetar Padrões de Fábrica" e testar se os campos padrão carregam com o novo nome "Barber Premium" e se a gravação no Supabase/LocalStorage persiste de forma intacta.
3. **Deploy em Produção (Vercel):**
   - Executar o commit e push das melhorias estéticas para o repositório remoto.
   - Acompanhar o deploy contínuo da Vercel e validar que o site público exibe a nova marca "BARBER" com 100% de precisão.
