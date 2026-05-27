# Plano de Implementação - Otimização de Layout Anti-Slop (design-taste-frontend)

Este plano descreve as otimizações técnicas e visuais que serão implementadas na landing page principal (`index.html`) e folha de estilos (`assets/css/styles.css`) para elevar o design ao padrão premium da skill `design-taste-frontend`, corrigindo vieses de templates comuns gerados por inteligências artificiais.

## Objetivo
Aplicar a disciplina de design anti-slop, focando em tipografiaDisplay agressiva, eliminação de repetições de layout, estrutura Bento assimétrica na seção de serviços, harmonização de CTAs com intenção única ("Reservar Experiência") e remoção do excesso de elementos "eyebrow" clichês.

---

## Proposta de Mudanças

### 1. Tipografia e Proporções de Escala
- **Display Headlines:** Ajustar o H1 do Hero de `tracking-tight` para `tracking-tighter` com leading focado `leading-[1.02]` e tamanho ajustado para desktops (`lg:text-[5.5rem]`). Isso cria o visual editorial imponente exigido pela Space Grotesk.
- **Hero Subtext:** Reduzir o subtexto do Hero de 27 palavras para exatamente **20 palavras cirúrgicas**, garantindo que toda a dobra inicial caiba perfeitamente no viewport de qualquer dispositivo sem quebras.
  - *Nova redação:* "Cortes de precisão e barboterapia clássica sob medida na Av. Paulista. Um refúgio de alta classe com lounge de elite e drinks de cortesia."

### 2. Remoção de Clichês e Repetições (Eyebrow Restraint)
- Remover os pequenos rótulos ("eyebrows") sobre as seções de Serviços, Galeria e Depoimentos. Deixar que os títulos H2 majestosos comandem a página de forma minimalista e editorial.

### 3. Bento Grid Assimétrico para Serviços
- Quebrar a simetria de "3 cartões iguais em pé".
- Reestruturar o grid de Serviços para usar 2 colunas no desktop (`md:grid-cols-2`):
  - **Corte Signature:** Card vertical no lado esquerdo (`md:col-span-1`).
  - **Barba Elegance:** Card vertical no lado direito (`md:col-span-1`).
  - **Combo Imperial (VIP):** Destaque horizontal ocupando a largura total (`md:col-span-2`). Ele terá um layout de 2 colunas internas em desktops: descrição detalhada à esquerda e preço/botão à direita com fundo escurecido premium.

### 4. Rastreamento e Intenção de CTA Única (No Duplicate CTA Intent)
- Padronizar todos os rótulos de agendamento do site para a mesma frase ultra-sofisticada: **"Reservar Experiência"** (Nav, Hero, Serviços e Menu Mobile). Isso remove a flutuação de termos e constrói valor de marca.

### 5. Consistência de Bordas (Shape Consistency Lock)
- Unificar todos os arredondamentos do site. Adotaremos `rounded-2xl` para todos os cards de serviços, depoimentos, galeria de imagens e CTAs principais, gerando uma linguagem geométrica consistente em toda a página.

### 6. Animações de Scroll Suaves (IntersectionObserver)
- Injetar um motor de reveal suave em JavaScript nativo. À medida que as seções entram no viewport, elas sobem e aparecem sutilmente com spring-feel, sem dependências externas pesadas e garantindo fluidez mobile estável.

---

## Plano de Verificação

### Verificação Manual
1. Abrir o site no navegador local.
2. Validar que o Hero se ajusta perfeitamente à tela sem forçar rolagem desnecessária para ver o botão.
3. Testar a responsividade da seção de Serviços e da Galeria.
4. Garantir que todos os botões de conversão ("Reservar Experiência") continuem enviando os payloads corretos ao webhook local.
