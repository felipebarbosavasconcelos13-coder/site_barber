# Plano de Implementação - Google Places API: Nota em Tempo Real na Hero & 5 Depoimentos

Este plano detalha o aprimoramento técnico na integração do Google Places API no site principal (`index.html`), assegurando que a nota média e o número total de avaliações sejam atualizados e armazenados em cache local a partir da API em tempo real na seção Hero, e expandindo a exibição de depoimentos de 3 para 5 avaliações (padrão retornado pela API).

## Objetivo
1. **Atualização e Cache do Google Places na Hero:** Atualizar a nota e quantidade de avaliações em tempo real a partir da API do Google, salvando as credenciais obtidas de volta no cache do `localStorage` para carregamento imediato (zero delay) nas próximas visitas.
2. **Exibição de 5 Depoimentos de Usuários:** Expandir a exibição da seção de depoimentos na UI do site para renderizar até 5 avaliações qualificadas de 4 e 5 estrelas vindas diretamente do Google Places API (o limite gratuito oficial do PlacesService).

---

## Proposta de Mudanças

### [Site Principal](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia)

#### [MODIFY] [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html)
- Modificar o callback de sucesso `initGooglePlaces` da API Google Places (linhas ~1090 a 1145):
  - Inserir rotina de salvamento automático no cache `localStorage` (`elegance_barber_config.general.google_rating` e `elegance_barber_config.general.google_reviews_count`) sempre que a API responder com nota e volume de avaliações atualizados em tempo real.
  - Substituir a fatia estrita de 3 avaliações (`.slice(0, 3)`) para renderizar até **5 avaliações qualificadas** (`.slice(0, 5)`), aproveitando ao máximo a cota de depoimentos importados por padrão do Google Places.

---

## Plano de Verificação

### Verificação Manual
1. Abrir o site local [index.html](file:///c:/Users/felip/Desktop/N8N/Atigra/Pag%20barbearia/index.html) no navegador com chaves válidas configuradas no painel.
2. Observar se a nota e o volume de avaliações na Hero são atualizados para os valores reais do estabelecimento cadastrado no Google Places.
3. Verificar a aba de depoimentos e validar se até 5 avaliações qualificadas de 4 e 5 estrelas são importadas e renderizadas em um grid responsivo harmonioso.
4. Recarregar a página e confirmar se os novos valores de nota da Hero são aplicados instantaneamente desde o primeiro milissegundo de carregamento (graças ao cache do `localStorage`).
