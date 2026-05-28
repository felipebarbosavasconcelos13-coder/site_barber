# Plano de Otimização de Performance Web: Velocidade Máxima Mobile (Core Web Vitals)

Este documento descreve as etapas para concluir a migração da barbearia do Tailwind em tempo de execução no cliente para a folha de estilo estática compilada e otimizada de alta velocidade, tanto na Landing Page quanto no Painel Administrativo.

---

## 🚦 Status e Diagnóstico do PageSpeed Insights

O diagnóstico inicial do PageSpeed Insights no mobile apontou os seguintes gargalos principais:
1. **Compilação Client-side do Tailwind (TBT Elevado):** O script `assets/js/tailwind.js` consumia de 1 a 2 segundos de CPU em dispositivos móveis de baixo/médio desempenho para interpretar a página e gerar as classes utilitárias no cliente.
2. **Render-Blocking Resources:** Arquivos CSS extras desnecessários e dependências locais pesadas que bloqueavam a renderização inicial do DOM.
3. **FOUC (Flash of Unstyled Content) ou Deslocamento de Layout (CLS):** Pequenas variações de carregamento de cores dinâmicas injetadas na nuvem.

---

## 📋 Etapas de Otimização Propostas

### Componente 1: Painel Administrativo (`admin.html`)
* **Remoção do Tailwind Client-side:**
  - Excluir a tag `<script src="assets/js/tailwind.js"></script>`.
  - Excluir o script inline `<script id="tailwind-config">` de 70+ linhas que configurava o Tailwind local.
  - Excluir a folha `<link href="assets/css/styles.css" rel="stylesheet"/>` legada.
* **Inserção do CSS Estático Compilado:**
  - Apontar para o arquivo CSS compilado de alta performance e minificado: `<link href="assets/css/app-compiled.min.css" rel="stylesheet"/>`.

### Componente 2: Injetor de Tema Dinâmico (`#theme-injector`)
* **Evitar FOUC e Piscadas Visuais:**
  - Declarar as variáveis padrões `:root` de cores diretamente no bloco de estilo estático principal das páginas (`index.html` e `admin.html`).
  - Atualizar o script `#theme-injector` para ler as variáveis `--dynamic-background` e `--dynamic-surface` a partir das configurações salvas e injetá-las de forma ultra-veloz no `:root` no momento exato do parseamento do `head`.
* **Mapeamento de Variáveis Suportadas:**
  ```css
  :root {
      --dynamic-background: #0e0e0e;
      --dynamic-surface: #131313;
      --dynamic-primary: #ffe8c7;
      --dynamic-secondary: #ffb693;
      --dynamic-primary-rgb: 255, 232, 199;
  }
  ```

### Componente 3: Limpeza do Workspace
* Apagar arquivos temporários ou desnecessários da pasta de trabalho, como `assets/css/tailwind-input.css` (usado apenas na compilação do Tailwind CLI) para manter o repositório limpo.

### Componente 4: Versionamento & Deploy Contínuo (Vercel)
* Fazer commit do código limpo local e realizar o push para a branch remota:
  ```bash
  git add .
  git commit -m "perf: otimização radical Core Web Vitals no admin e injetor de tema"
  git push origin main
  ```
* O push acionará automaticamente a compilação estática do pipeline da Vercel para produção na Athenas Barbearia e homologação na Nórdica Barbearia.

---

## 📋 Plano de Verificação e Auditoria

1. **Validação do Painel de Controle:** Acessar o Painel de Controle localmente e em homologação e validar se todos os formulários, paleta de cores hexadecimais, seções de serviços e injeção do places funcionam perfeitamente sem quebras de layout.
2. **Validação da Velocidade no Mobile:** Reexecutar as análises do PageSpeed Insights para garantir que a nota saltou para a zona verde (acima de 90) em produção.

---

## 🔗 Links Úteis
* **Visualização da Landing Page (Athenas Barbearia):** [https://www.athenasbarbearia.com.br](https://www.athenasbarbearia.com.br)
* **Visualização da Landing Page (Nórdica Barbearia):** [https://site-barber-m4gj.vercel.app](https://site-barber-m4gj.vercel.app)
* **Painel Administrativo da Nórdica Barbearia:** [https://site-barber-m4gj.vercel.app/admin.html](https://site-barber-m4gj.vercel.app/admin.html)
