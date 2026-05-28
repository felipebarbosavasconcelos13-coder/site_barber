# Plano de Implementação - Carregamento Cinematográfico Premium (Fim do Layout Shift)

Este plano descreve o procedimento para eliminar a piscada visual ("versão estática limpa" -> "versão dinâmica editada") no primeiro carregamento do site em navegadores novos. Implementaremos um **Loader de Transição Premium** que exibe uma tela cinematográfica preta com a logo dourada pulsando suavemente enquanto os dados iniciais do Supabase são baixados na primeira visita, revelando a página 100% pronta e estável com um fade-out luxuoso.

---

## 🚦 Status Atual do Desenvolvimento
- [x] **Segurança e Robustez:** Chaves Places ocultadas em variáveis de ambiente, LocalStorage blindado contra cota, Git push destravado e publicado, dados do Supabase isolados por projeto Vercel.
- [ ] **Carregamento Híbrido Cinematográfico (FALHA VISUAL):** Primeiros acessos em novos navegadores revelam brevemente o HTML limpo padrão antes de injetar as edições do Supabase, causando uma piscada de layout.

---

## 🛠️ Alterações Propostas

### 1. Injetar a Animação da Barra de Progresso no CSS do Cabeçalho
#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- Adicionar o `@keyframes loader-bar` para a animação suave de progressão da barra no bloco de estilos `<style>` do cabeçalho (linha 171-172):
  ```css
  @keyframes loader-bar {
      0% { width: 0%; }
      50% { width: 70%; }
      100% { width: 100%; }
  }
  ```

### 2. Adicionar o Loader Premium no Início do Body
#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- Inserir a estrutura do contêiner de transição imediatamente após a abertura do `<body>` (linha 204), contendo fundo escuro absoluto, monograma "E" de luxo e nome dourado com efeito pulso da marca.

### 3. Implementar a Lógica do Loader no Injetor do DOM
#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- Na lógica de inicialização de duas fases do script (linha 1194-1224):
  - **Fase 1 (Acessos subsequentes):** Se o LocalStorage já possui dados, removemos o loader da tela instantaneamente de forma síncrona, mantendo o carregamento instantâneo de 0ms sem nenhuma tela de loading.
  - **Fase 2 (Primeiro acesso):** Se o LocalStorage está vazio, mantemos o loader na tela rodando a animação. Assim que os dados do Supabase chegam via `/api/get-config`, aplicamos as edições, salvamos o cache local e removemos o loader com um fade-out suave de 700ms após um breve delay de estabilização visual (500ms).
  - **Fallback:** Se o fetch falhar, o loader é removido imediatamente para exibir o site estático original com resiliência total.

---

## 📋 Plano de Verificação

### Testes de UX e Animação
1. **Primeira Visita (LocalStorage Vazio):** Limpar o cache do LocalStorage no console (`localStorage.clear()`), atualizar a página e verificar que a tela preta com a logo dourada pulsa suavemente e se dissolve em fade-out revelando as modificações prontas do Supabase sem piscadas de texto.
2. **Visitas Subsequentes:** Atualizar a página novamente e verificar que o site carrega de forma instantânea (0ms de carregamento) sem exibir a tela de loader, mantendo a altíssima performance.
3. **Resiliência Offline:** Simular perda de conexão de rede, limpar o LocalStorage e garantir que a página estática de fallback abre perfeitamente após a remoção rápida do loader.
