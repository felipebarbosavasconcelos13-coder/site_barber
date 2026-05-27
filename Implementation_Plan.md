# Plano de Implementação - Correção e Robustez de Login Administrativo

Este plano detalha a correção imediata do motor de login do painel administrativo (`admin.html`) para assegurar que a credencial mestra legítima (`6AEwhQnQCoTWHWF!id$52z`) funcione de forma imediata em qualquer navegador e ambiente (local via `file://`, HTTP ou HTTPS).

## Objetivo
Resolver a incompatibilidade de autenticação que impede o login do usuário, criando uma verificação de texto claro direta e robusta para a credencial mestra original, contornando quaisquer restrições de segurança ou suporte ausente à Web Crypto API (`crypto.subtle`) em ambientes locais e offline.

---

## Proposta de Mudanças

### [Painel de Controle](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia)

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- Modificar o evento de escuta `submit` do formulário de login (`loginForm`) para executar uma comparação direta em texto claro com a credencial mestra antes de recorrer ao cálculo de hash criptográfico assíncrono.
- Preservar o fluxo criptográfico SHA-256 secundário como contingência, assegurando integridade e compatibilidade.

---

## Plano de Verificação

### Verificação Manual
1. Abrir o painel administrativo local [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html) no navegador.
2. Inserir a senha mestra original `6AEwhQnQCoTWHWF!id$52z` e pressionar "Desbloquear Painel".
3. Validar se o painel de personalização é aberto instantaneamente com sucesso.
