# Plano de Implementação - Resiliência e Correção de Loop de Teste da Google Places API

Este plano detalha o aprimoramento técnico no mecanismo de teste de conexão com o Google Places API no painel administrativo (`admin.html`), impedindo travamentos e loops infinitos de processamento ("Testando...") quando são fornecidas chaves inválidas ou ocorrem falhas de rede.

## Objetivo
Criar um motor de teste resiliente com controle de tempo limite (Timeout) de 10 segundos e limpeza dinâmica de scripts anteriores do Google Maps, assegurando o destravamento imediato do painel em qualquer cenário de falha e permitindo múltiplos testes consecutivos com chaves diferentes.

---

## Proposta de Mudanças

### [Painel de Administração](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia)

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- Substituir o listener de clique do botão de teste do Google Places (`test-places-btn`).
- Injetar um **Timeout de Segurança de 10 segundos** para abortar o loop visual caso a API do Google não responda (comportamento típico de chaves inválidas bloqueadas silenciosamente pelo Google).
- Adicionar rotina de limpeza de scripts do Maps antigos (`maps.googleapis.com`) e redefinição da variável global `window.google = undefined` para viabilizar múltiplos testes seguidos com chaves diferentes sem conflitos.
- Fornecer feedback de erro com diagnósticos claros e informativos de acordo com o motivo da expiração do teste.

---

## Plano de Verificação

### Verificação Manual
1. Abrir o painel administrativo local [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html) no navegador.
2. Ir na aba "Integrações", inserir uma chave e Place ID fictícios/inválidos e clicar em "Verificar Conexão".
3. Validar se o botão destrava exatamente após 10 segundos, exibindo o diagnóstico de erro amigável ao invés de entrar em loop infinito.
4. Tentar testar uma chave e verificar se o comportamento é consistente ao repetir o teste com chaves alteradas.
