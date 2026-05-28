# Plano de Implementação - Personalização Avançada (Galeria, Botões e Opacidade do Hero)

Este plano detalha a implementação das melhorias de personalização solicitadas no site da Barbearia Elegance Premium:
1. **Avisos de Tamanho na Galeria:** Exibição clara das dimensões sugeridas de imagens (desktop/mobile) na aba Galeria do painel administrativo.
2. **Textos de Botões Editáveis:** Controle total para que o administrador possa editar o texto de cada botão do site através do painel.
3. **Controle de Opacidade do Hero:** Slider premium no painel administrativo para controlar a opacidade da imagem de fundo do Hero (de 0% a 100%).

---

## 🚦 Status Atual do Desenvolvimento
- [x] **Painel Administrativo (`admin.html`):** Toda a interface do painel com slider de opacidade, inputs de textos para os 9 botões do site e exibição premium dos tamanhos recomendados na Galeria já foi implementada e validada.
- [x] **Lógica de Salvamento e Retrocompatibilidade:** JavaScript em `admin.html` atualizado com fallbacks seguros e envio correto dos campos de botões e opacidade para o LocalStorage e Supabase (via APIs Vercel).
- [ ] **Dinamização do Site Principal (`index.html`):** Resta envolver os textos dos botões do site em tags `<span>` com IDs dedicados e injetar o processamento da opacidade do Hero e textos dinâmicos de botões no `#dom-dinamizer`.

---

## 🛠️ Alterações Propostas (Próxima Etapa)

### Modificações na Landing Page (`index.html`)

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)

1. **Estrutura HTML (Envelopamento de Botões):**
   - Envolver os textos dos botões do site nas tags `<span>` com IDs bem definidos para dinamização em tempo real:
     - Botão Principal do Hero (de agendamento): `<span id="hero-primary-btn-text">Reservar Experiência</span>`
     - Botão Secundário do Hero (de rolagem interna): `<span id="hero-secondary-btn-text">Conhecer Serviços</span>`
     - Botão do Serviço 1 (Corte Signature): `<span id="serv-0-btn-text">Reservar Experiência</span>`
     - Botão do Serviço 2 (Barba Elegance): `<span id="serv-1-btn-text">Reservar Experiência</span>`
     - Botão do Serviço 3 (Combo Imperial - VIP): `<span id="serv-2-btn-text">Reservar Experiência</span>`
     - Botão de Direções (Como Chegar): `<span id="loc-directions-btn-text">Como Chegar</span>`
     - Botão de Falar com a Recepção: `<span id="loc-reception-btn-text">Falar com Recepção</span>` (e adicionar o ID `loc-reception-btn` ao elemento `<a>`)
     - Botão CTA do Rodapé: `<span id="cro-footer-btn-text">Agendar Agora via WhatsApp</span>`
   - Remover a classe Tailwind estática `opacity-25` da tag `<img>` `#hero-bg-img` para evitar conflito com a opacidade inline dinâmica.

2. **Lógica de Dinamização (`#dom-dinamizer`):**
   - **Controle de Opacidade do Hero:**
     Adicionar a aplicação dinâmica da opacidade via estilo inline diretamente no elemento `#hero-bg-img`:
     ```javascript
     const opacityVal = (config.hero && config.hero.bg_opacity !== undefined) ? config.hero.bg_opacity : "25";
     document.getElementById('hero-bg-img').style.opacity = parseFloat(opacityVal) / 100;
     ```
   - **Textos de Botões Dinâmicos:**
     Injetar os textos dinâmicos do objeto `config.buttons` nos respectivos IDs de spans criados, utilizando fallbacks seguros para os textos padrão originais se a configuração no banco estiver sem o dicionário `buttons` ou se os botões não estiverem preenchidos:
     ```javascript
     if (config.buttons) {
         if (config.buttons.nav_reservar) {
             const btnDesktop = document.getElementById('nav-btn-text-desktop');
             const btnMobile = document.getElementById('nav-btn-text-mobile');
             if (btnDesktop) btnDesktop.innerText = config.buttons.nav_reservar;
             if (btnMobile) btnMobile.innerText = config.buttons.nav_reservar;
         }
         if (config.buttons.hero_primary && document.getElementById('hero-primary-btn-text')) {
             document.getElementById('hero-primary-btn-text').innerText = config.buttons.hero_primary;
         }
         if (config.buttons.hero_secondary && document.getElementById('hero-secondary-btn-text')) {
             document.getElementById('hero-secondary-btn-text').innerText = config.buttons.hero_secondary;
         }
         for (let i = 0; i < 3; i++) {
             if (config.buttons[`serv_${i}`] && document.getElementById(`serv-${i}-btn-text`)) {
                 document.getElementById(`serv-${i}-btn-text`).innerText = config.buttons[`serv_${i}`];
             }
         }
         if (config.buttons.loc_directions && document.getElementById('loc-directions-btn-text')) {
             document.getElementById('loc-directions-btn-text').innerText = config.buttons.loc_directions;
         }
         if (config.buttons.loc_reception && document.getElementById('loc-reception-btn-text')) {
             document.getElementById('loc-reception-btn-text').innerText = config.buttons.loc_reception;
         }
         if (config.buttons.cta_footer && document.getElementById('cro-footer-btn-text')) {
             document.getElementById('cro-footer-btn-text').innerText = config.buttons.cta_footer;
         }
     }
     ```

---

## 📋 Plano de Verificação

### Testes Visuais e Funcionais
1. **Controle de Opacidade:** Ajustar o slider no painel de controle e salvar, verificando se a transparência da imagem de fundo no site muda instantaneamente na tela.
2. **Edição de Botões:** Alterar o texto de todos os botões no painel administrativo, salvar, e conferir se eles foram perfeitamente alterados tanto no computador quanto no celular (inclusive no carrossel de serviços e cabeçalho).
3. **Clareza de Imagens:** Validar que as dicas visuais de resolução da galeria aparecem de forma limpa e premium na aba do painel administrativo.

### Persistência de Dados
1. Confirmar que as novas propriedades (`hero.bg_opacity` e `buttons`) são devidamente enviadas e salvas na tabela `configuracoes` no Supabase.
2. Confirmar o funcionamento resiliente do cache do `localStorage` mantendo as novas configurações ativas.
