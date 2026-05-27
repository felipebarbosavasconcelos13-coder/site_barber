# Plano de Implementação - Otimizações de Estrutura, Acessibilidade e Resiliência (index.html & admin.html)

Este documento descreve o plano detalhado para corrigir erros estruturais de HTML, implementar melhores práticas de acessibilidade (teclado e tags ARIA) e aumentar a resiliência dos scripts em ambientes reais.

## Objetivos
1. **Correção de Sintaxe HTML:** Remover a tag `</section>` órfã na linha 578 de `index.html` para garantir conformidade de marcação e SEO.
2. **Acessibilidade por Teclado (Lightbox):** Adicionar suporte para fechar a visualização ampliada do Lightbox (tanto no site quanto em modais do painel) pressionando a tecla `Escape`.
3. **Semântica e Acessibilidade (Leitores de Tela):** Adicionar atributos `aria-label` descritivos nos botões de controle (menu móvel, fechar lightbox e redes sociais no rodapé) para melhorar a pontuação do Lighthouse e usabilidade inclusiva.
4. **Resiliência a Erros em Rastreamento de UTMs:** Blindar o carregamento do `sessionStorage` na captura de parâmetros de anúncio para prevenir travamentos se o cache do navegador contiver dados corrompidos.
5. **Ajuste de Precisão do Scroll do Carrossel Mobile:** Sincronizar perfeitamente os indicadores ativos em formato de pílula na transição final do carrossel de fotos.

---

## 🛠️ Alterações Propostas

### 1. Landing Page (`index.html`)

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)

*   **Correção de Sintaxe (Linha 578):**
    Excluir a tag `</section>` órfã após o bloco da `div` do Lightbox.

*   **Acessibilidade por Teclado e Eventos do Lightbox (JavaScript):**
    Adicionar escuta global para o evento `keydown` no navegador para fechar o lightbox com `Escape`:
    ```javascript
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && !lightbox.classList.contains('hidden')) {
            closeLightbox();
        }
    });
    ```

*   **Acessibilidade de Tags (HTML):**
    Adicionar `aria-label` adequados nas redes sociais, botão de menu móvel e botão de fechar lightbox:
    - Botão do menu mobile: `aria-label="Abrir Menu de Navegação"`
    - Links de redes sociais no rodapé: `aria-label="Acesse nosso perfil no Instagram"`, `aria-label="Acesse nossa página no Facebook"`
    - Botão do Lightbox close: `aria-label="Fechar ampliação da imagem"`

*   **Resiliência no Script de UTMs (JavaScript):**
    Refatorar a decodificação de `sessionStorage` para garantir que o parse do JSON seja feito com fallback absoluto, prevenindo qualquer travamento:
    ```javascript
    let sessionTracking = {};
    try {
        const stored = sessionStorage.getItem('elegance_barber_tracking');
        if (stored) {
            sessionTracking = JSON.parse(stored);
        }
    } catch (e) {
        console.warn("Rastreamento de sessão resetado:", e);
    }
    ```

---

### 2. Painel de Controle (`admin.html`)

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)

*   **Acessibilidade de Teclado no Logout e Formulários:**
    Adicionar o fechamento de avisos/alertas de sucesso (Toast) ou modais com `Escape` caso estejam visíveis.

---

## Plano de Verificação

### Testes Manuais
1. **Validação do DOM:** Verificar se o console do desenvolvedor não acusa erros de sintaxe ou tags órfãs ao carregar o site.
2. **Teste do Lightbox por Teclado:** Abrir uma imagem na galeria (tanto no desktop quanto no carrossel mobile) e pressionar a tecla `Escape`. A imagem deve fechar suavemente.
3. **Teste de Acessibilidade:** Executar leitor de tela ou validar no DevTools se os elementos descritos possuem os atributos `aria-label` correspondentes.
4. **Teste de Robusteza de UTMs:** Inserir um valor inválido no `sessionStorage` manualmente e atualizar a página. O script deve prosseguir de forma invisível e sem erros no console.
