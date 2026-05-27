# Plano de Implementação - Preservação de Formato WebP/PNG e Transparência em Imagens

Este plano detalha o aprimoramento técnico na rotina de processamento e compressão de imagens via Canvas no painel administrativo (`admin.html`), assegurando que arquivos em formato WebP e PNG (como logotipos com fundo transparente) não sejam forçados a se converter em JPEG, preservando sua transparência e formato nativos.

## Objetivo
Tornar o motor de upload de imagens dinâmico, identificando o tipo MIME original do arquivo e aplicando a exportação apropriada (com qualidade otimizada para WebP/JPEG e suporte total a canal alfa/transparência para PNG e WebP).

---

## Proposta de Mudanças

### [Painel de Administração](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia)

#### [MODIFY] [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html)
- Modificar a rotina do motor de compressão na função `handleImageUploadEvent` (linha ~1520).
- Substituir o tipo de exportação estático `canvas.toDataURL('image/jpeg', 0.7)` por uma seleção de formato dinâmica baseada no tipo original do arquivo:
  - Se for **WebP (`image/webp`)**: Exportar como `image/webp` com qualidade `0.8`, mantendo transparência e ultra compressão.
  - Se for **PNG (`image/png`)**: Exportar como `image/png` para manter a transparência perfeita sem artefatos de perda.
  - Para outros formatos (ex: **JPEG/JPG**): Exportar como `image/jpeg` com qualidade `0.7`.

---

## Plano de Verificação

### Verificação Manual
1. Abrir o painel administrativo local [admin.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/admin.html) no navegador.
2. Ir na aba "Geral", no campo de upload do logotipo ("Logo").
3. Fazer o upload de uma imagem em formato `.webp` ou `.png` com fundo transparente.
4. Clicar em "Salvar Configurações".
5. Validar na página pública [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html) se o logotipo mantém a transparência perfeita e se a string base64 começa corretamente com `data:image/webp` ou `data:image/png` no banco de dados local.
