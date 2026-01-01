# PRD: IA Flow CRM
## Plataforma de Automação Inteligente com WhatsApp

**Versão:** 2.0 (2025)  
**Status:** Especificação Técnica Completa  
**Objetivo:** Sistema unificado de CRM, automação visual e atendimento multicanal com IA como copiloto

---

## 1. VISÃO GERAL DO PRODUTO

### 1.1 Proposta de Valor
Uma plataforma **self-hosted** que une:
- **Inbox inteligente** (estilo Chatwoot) para atendimento humano em tempo real
- **Construtor de automações visuais** (estilo n8n/Zapier) para criar fluxos sem código
- **IA Orchestrator** que sugere ações contextuais e executa follow-ups automatizados
- **CRM com funil dinâmico** onde leads progridem conforme as automações

### 1.2 Diferencial Competitivo
Ao contrário de ferramentas isoladas (Chatwoot = apenas chat, n8n = apenas automação):
- **IA analisa conversas em tempo real** e sugere próximos passos ao atendente
- **Canvas unificado** onde o usuário visualiza como chat, CRM e automações interagem
- **Propriedade total** dos dados (self-hosted, sem vendor lock-in)

---

## 2. ARQUITETURA TÉCNICA

### 2.1 Stack Tecnológico (100% Open Source)

| Camada | Tecnologia | Justificativa |
|--------|-----------|---------------|
| **Framework Frontend** | Next.js 15 (App Router) | Server Components, Actions, streaming |
| **UI Components** | Shadcn/UI + Tailwind CSS | Componentes prontos, customizáveis |
| **Workflow Canvas** | XYFlow (React Flow 12) | Biblioteca madura para node-based UIs |
| **Real-time Engine** | Socket.io | Comunicação bidirecional para chat |
| **WhatsApp Gateway** | uazapiGO | API Go de alta performance |
| **Banco de Dados** | PostgreSQL 16 | ACID, JSON support, performance |
| **ORM** | Prisma | Type-safe, migrations, developer experience |
| **Cache/Queue** | Redis + BullMQ | Filas de mensagens e cache de sessões |
| **IA Engine** | Vercel AI SDK | Streaming, provider-agnostic |
| **Modelos de IA** | Groq (Llama 3.3) | Inferência rápida e gratuita |
| **Chat UI** | Chatscope (react) | Componentes prontos para inbox |
| **Dashboard Analytics** | Tremor | Gráficos especializados para dashboards |
| **Auth** | NextAuth.js | Autenticação multi-tenant |
| **Storage** | MinIO | S3-compatible, self-hosted |

### 2.2 Infraestrutura VPS

```
[VPS Ubuntu 22.04 LTS]
├── Docker Compose
│   ├── app (Next.js) - porta 3000
│   ├── uazapiGO - porta 8080
│   ├── PostgreSQL - porta 5432
│   ├── Redis - porta 6379
│   ├── MinIO - porta 9000
│   └── Nginx - porta 80/443
├── Volumes persistentes
│   ├── /data/postgres
│   ├── /data/redis
│   ├── /data/minio
│   └── /data/uazapi-sessions
└── SSL via Certbot (Let's Encrypt)
```

---

## 3. MÓDULOS FUNCIONAIS

### 3.1 Central de Atendimento (Omnichannel Inbox)

#### Features Core
- **Lista de conversas** com status: Aberto, Em Atendimento, Resolvido, Aguardando Cliente
- **Filtros avançados**: por canal, tag, atendente, período, palavras-chave
- **Multi-atendente**: vários operadores podem visualizar e assumir conversas
- **Atribuição automática**: round-robin ou baseada em carga de trabalho
- **Notas internas**: anotações privadas entre atendentes (não visíveis ao cliente)
- **Histórico unificado**: timeline com todas as interações (mensagens, mudanças de status, ações de IA)

#### Integração uazapiGO
```javascript
// Fluxo de mensagem recebida
1. Webhook do uazapiGO → POST /api/webhooks/whatsapp
2. Salvar mensagem no banco (PostgreSQL)
3. Emitir evento Socket.io → Atualizar inbox em tempo real
4. Processar com IA (análise de intenção)
5. Notificar atendente se necessário
```

#### UI do Inbox
- **Painel esquerdo**: Lista de conversas (avatar, nome, última mensagem, timestamp)
- **Painel central**: Thread de mensagens (bolhas, áudios, imagens, documentos)
- **Painel direito**: Detalhes do lead (CRM), tags, histórico de compras, ações rápidas

#### Ações Rápidas
- Enviar template pré-definido
- Criar tarefa de follow-up
- Mover para etapa do funil
- Transferir para outro atendente
- Adicionar tag
- **Sugestão da IA**: popup com ação recomendada

---

### 3.2 Construtor de Automação (Visual Workflow)

#### Canvas Interativo (XYFlow)
- **Drag-and-drop** de nós da biblioteca para o canvas
- **Auto-layout** para organizar fluxos complexos
- **Zoom/Pan** com mini-mapa de navegação
- **Undo/Redo** (ctrl+z / ctrl+shift+z)
- **Validação em tempo real**: detecta loops, nós órfãos, erros de configuração

#### Tipos de Nós

**GATILHOS (Triggers)**
- 🟢 **Mensagem Recebida**: filtra por palavra-chave, mídia, canal
- 🟢 **Lead Criado**: via webhook, formulário, API
- 🟢 **Tag Adicionada**: quando lead recebe tag específica
- 🟢 **Horário Agendado**: cron expression para envios recorrentes
- 🟢 **Mudança de Status**: quando lead muda de etapa no funil

**CONDIÇÕES (Logic)**
- 🔷 **Se/Senão**: avalia condição (ex: "se score > 80")
- 🔷 **Switch**: múltiplas condições (ex: por tipo de produto)
- 🔷 **Filtro**: passa apenas leads que atendem critérios
- 🔷 **Merge**: combina múltiplos caminhos do fluxo

**AÇÕES (Actions)**
- 🔵 **Enviar WhatsApp**: texto, imagem, áudio, documento, template
- 🔵 **Atualizar CRM**: muda etapa, adiciona nota, atribui vendedor
- 🔵 **Adicionar Tag**: marca lead com categoria
- 🔵 **Criar Tarefa**: notifica atendente para ação manual
- 🔵 **HTTP Request**: integra com APIs externas
- 🔵 **Delay**: aguarda X horas/dias antes do próximo nó

**AGENTES DE IA (AI Nodes)**
- 🤖 **Classificador de Intenção**: identifica se é Vendas/Suporte/Financeiro
- 🤖 **Análise de Sentimento**: detecta se lead está feliz/neutro/insatisfeito
- 🤖 **Extrator de Dados**: captura CPF, email, telefone da mensagem
- 🤖 **Gerador de Resposta (RAG)**: cria resposta baseada em documentos
- 🤖 **Scorer de Lead**: calcula probabilidade de conversão (0-100)
- 🤖 **Sugestão de Produto**: recomenda item do catálogo

#### Editor de Nó (Painel Lateral)
Ao clicar em um nó, abre painel com:
- **Nome do nó** (editável)
- **Descrição** (opcional)
- **Configurações específicas** (ex: texto da mensagem, delay em horas)
- **Variáveis disponíveis**: `{{lead.nome}}`, `{{lead.telefone}}`, `{{mensagem.texto}}`
- **Testes**: botão "Testar nó" com dados de exemplo

#### Templates Pré-configurados
- 🏪 **E-commerce**: Carrinho abandonado → Follow-up automático
- 📞 **Vendas B2B**: Qualificação → Agendamento → Follow-up
- 💊 **Clínica**: Triagem → Agendamento → Lembrete de consulta
- 🏋️ **Academia**: Lead → Trial gratuito → Conversão

---

### 3.3 IA Orchestrator (O Copiloto)

#### Modos de Operação

**Modo Sugestão (padrão)**
- IA **recomenda** ação, mas aguarda aprovação humana
- Exemplo: popup no inbox "💡 **IA sugere**: Este lead mencionou 'orçamento'. Enviar tabela de preços?"
- Atendente pode aceitar (1 clique) ou ignorar

**Modo Automático**
- IA **executa** ações predefinidas sem intervenção
- Configurável por tipo de ação (ex: auto-responder FAQ, mas aguardar para enviar orçamento)
- Log completo de ações automáticas para auditoria

#### Funcionalidades da IA

**Durante Atendimento (Tempo Real)**
- Analisa histórico do lead e mensagem atual
- Identifica oportunidades:
  - Lead pronto para fechar → sugerir envio de link de pagamento
  - Dúvida recorrente → sugerir envio de FAQ
  - Cliente insatisfeito → sugerir transferir para supervisor
- **Rascunho automático**: IA escreve resposta, atendente revisa e envia

**Na Criação de Fluxos**
- **Assistente de Workflow**: usuário descreve em linguagem natural ("Quero enviar follow-up em 3 dias se lead não responder")
- IA **desenha o fluxo no canvas** com os nós necessários
- **Validação inteligente**: "Detectei que este caminho nunca é executado. Deseja remover?"

**Análise Preditiva**
- **Previsão de conversão**: "Este lead tem 73% de chance de converter com base no histórico"
- **Melhor horário de contato**: "Leads semelhantes respondem melhor entre 14h-16h"
- **Otimização de mensagens**: "Mensagens com emojis têm 28% mais taxa de resposta neste funil"

#### Motor de IA (Implementação)

```typescript
// Fluxo de análise de intenção
async function analyzeIntent(message: string, leadContext: any) {
  const prompt = `
    Analise a intenção desta mensagem de WhatsApp.
    
    Contexto do lead:
    - Nome: ${leadContext.nome}
    - Etapa do funil: ${leadContext.etapa}
    - Histórico: ${leadContext.ultimasInteracoes}
    
    Mensagem: "${message}"
    
    Responda em JSON:
    {
      "intencao": "vendas|suporte|financeiro|outro",
      "urgencia": "alta|media|baixa",
      "sentimento": "positivo|neutro|negativo",
      "acaoSugerida": "descrição da ação",
      "confianca": 0.95
    }
  `;
  
  const response = await aiProvider.generate(prompt);
  return JSON.parse(response);
}
```

---

### 3.4 CRM & Gestão de Funil

#### Modelo de Dados

**Lead**
- `id`, `telefone`, `nome`, `email`, `avatar_url`
- `etapa_funil`: enum (novo, qualificado, proposta, negociacao, ganho, perdido)
- `score`: 0-100 (calculado por IA)
- `origem`: whatsapp, formulario, api, importacao
- `tags`: array de strings
- `custom_fields`: JSON com campos personalizados
- `atribuido_a`: ID do atendente
- `criado_em`, `atualizado_em`

**Conversa**
- `id`, `lead_id`, `canal`: whatsapp
- `status`: aberta, em_atendimento, resolvida, aguardando
- `atendente_id`
- `primeira_mensagem_em`, `ultima_mensagem_em`
- `tempo_primeira_resposta`, `tempo_medio_resposta`

**Mensagem**
- `id`, `conversa_id`, `tipo`: texto, audio, imagem, documento
- `conteudo`: texto ou URL do arquivo
- `remetente`: cliente ou atendente
- `enviada_em`, `lida_em`, `entregue_em`
- `metadados`: JSON (ex: transcrição de áudio)

#### Visualizações

**Kanban de Funil**
- Colunas: Novo → Qualificado → Proposta → Negociação → Ganho (Totalmente Personalizado, usuário pode criar quantos funis e etapas que quiser)
- Cards: foto do lead, nome, valor potencial, dias na etapa
- Drag-and-drop para mover entre etapas
- Contador de leads e valor total por coluna

**Lista de Leads**
- Tabela com filtros e ordenação
- Exportar para CSV/Excel
- Importação em massa via arquivo

**Detalhes do Lead (Painel Lateral)**
- Informações básicas + edição inline
- Timeline de atividades (mensagens, mudanças de etapa, notas)
- Conversas relacionadas
- Tarefas pendentes
- Score de conversão (atualizado em tempo real)

---

### 3.5 Dashboard de Analytics

#### Métricas Principais (KPIs)

**Performance de Atendimento**
- Taxa de Resposta: % de conversas respondidas
- Tempo Médio de Primeira Resposta (TMPR)
- Tempo Médio de Resolução (TMR)
- CSAT (Customer Satisfaction): após resolução, bot pergunta "De 1-5, como foi o atendimento?"

**Eficiência da Automação**
- Conversas resolvidas por IA vs. humano
- Taxa de aceitação de sugestões da IA
- Economia de tempo (horas salvas por automação)

**Conversão de Funil**
- Taxa de conversão por etapa
- Tempo médio em cada etapa
- Receita gerada (se integrado)
- Motivos de perda (análise qualitativa)

**Volume de Mensagens**
- Total diário/semanal/mensal
- Distribuição por horário (heatmap)
- Distribuição por canal
- Picos de demanda

#### Gráficos (Tremor)
- 📊 **Linha**: Volume de mensagens ao longo do tempo
- 📊 **Barra**: Conversas por atendente
- 📊 **Donut**: Distribuição de status das conversas
- 📊 **Funil**: Taxa de conversão entre etapas
- 📊 **Heatmap**: Horários de maior movimento
- 📊 **Tabela**: Top 10 automações mais usadas

#### Relatórios Agendados
- Envio automático (diário/semanal) por email
- Exportação PDF com logo da empresa
- Comparação com período anterior (variação %)

---

## 4. FLUXOS DE USUÁRIO (UX)

### 4.1 Onboarding (Primeira Vez)

**Passo 1: Criar Conta**
- Formulário: nome, email, senha
- Verificação por email

**Passo 2: Conectar WhatsApp**
- QR Code gerado pelo uazapiGO
- Instruções: "Abra WhatsApp → Aparelhos Conectados → Escanear código"
- Status: "Aguardando conexão..." → "✓ Conectado!"

**Passo 3: Tour Interativo**
- Pontos de destaque (tooltips) nos principais recursos:
  1. Inbox: "Aqui você vê todas as conversas"
  2. Workflow: "Crie automações sem código"
  3. CRM: "Gerencie seus leads"
  4. Analytics: "Acompanhe métricas"

**Passo 4: Criar Primeiro Fluxo**
- Modal: "Vamos criar sua primeira automação?"
- Opção 1: Usar template
- Opção 2: Criar do zero com ajuda da IA
- IA pergunta: "O que você quer automatizar?"
- Usuário responde: "Enviar boas-vindas para novos leads"
- IA cria o fluxo e explica cada nó

### 4.2 Atendimento Típico (Dia a Dia)

**Cenário: Lead envia mensagem no WhatsApp**

1. **Notificação** chega no inbox (som + badge no navegador)
2. **Atendente clica** na conversa
3. **IA já analisou** e exibe no topo:
   - 🎯 Intenção: Dúvida sobre preço
   - 😊 Sentimento: Neutro
   - 💡 Sugestão: "Enviar tabela de preços"
4. **Atendente pode**:
   - Aceitar sugestão (1 clique → mensagem enviada)
   - Digitar resposta personalizada
   - Transferir para outro atendente
5. **IA continua sugerindo** conforme conversa evolui
6. **Atendente finaliza** marcando conversa como resolvida
7. **Bot envia CSAT**: "Como foi o atendimento? 1-5"

### 4.3 Criação de Automação (Power User)

**Cenário: Criar fluxo de carrinho abandonado**

1. **Usuário acessa** Workflow Builder
2. **Clica em** "Novo Fluxo" → "Criar com IA"
3. **Descreve**: "Se cliente adicionar produto ao carrinho mas não finalizar em 1 hora, enviar lembrete com desconto de 10%"
4. **IA gera fluxo**:
   - Nó 1: Trigger "Webhook: Carrinho criado"
   - Nó 2: Delay "1 hora"
   - Nó 3: Condição "Pedido não finalizado?"
   - Nó 4: Ação "Enviar WhatsApp com cupom"
5. **Usuário revisa**, ajusta texto da mensagem, adiciona emoji
6. **Testa** com lead de exemplo
7. **Ativa** o fluxo (toggle on)
8. **Dashboard mostra** métricas do fluxo em tempo real

---

## 5. INTEGRAÇÕES

### 5.1 uazapiGO (WhatsApp Core)

**Endpoints usados**
```
POST /send-message         # Enviar mensagem de texto
POST /send-media           # Enviar imagem/áudio/vídeo/documento
POST /send-template        # Enviar template aprovado pela Meta
GET /profile-picture       # Buscar foto de perfil do contato
POST /set-presence         # "typing..." ou "recording..."
GET /is-on-whatsapp        # Verificar se número está no WhatsApp
```

**Webhooks recebidos**
```
/api/webhooks/whatsapp
├── message.received       # Nova mensagem
├── message.delivered      # Mensagem entregue (check cinza)
├── message.read           # Mensagem lida (check azul)
├── status.update          # Status da conexão (conectado/desconectado)
└── qr.updated             # Novo QR code disponível
```

### 5.2 APIs Externas (Opcionais)

**E-commerce**
- Shopify / WooCommerce: buscar pedidos, produtos, estoque
- Webhook: carrinho abandonado, pedido criado

**Pagamentos**
- Stripe / Mercado Pago: criar link de pagamento, verificar status

**Calendário**
- Google Calendar / Calendly: agendar reuniões

**Email**
- SendGrid: enviar emails transacionais

**CRM Legado**
- Salesforce / Pipedrive: sincronizar leads (via Zapier ou API direta)

---

## 6. SEGURANÇA & CONFORMIDADE

### 6.1 Autenticação
- **NextAuth.js** com suporte a:
  - Email + Senha (bcrypt)
  - OAuth (Google, Microsoft)
  - 2FA via TOTP (Google Authenticator)

### 6.2 Autorização (RBAC)
**Papéis**
- **Admin**: acesso total, gerencia usuários e configurações
- **Manager**: cria fluxos, visualiza analytics de toda equipe
- **Agente**: acessa apenas inbox e leads atribuídos a ele
- **Viewer**: apenas leitura (analytics)

### 6.3 Dados Sensíveis
- **Criptografia em repouso**: senhas (bcrypt), tokens (AES-256)
- **HTTPS obrigatório** (certificado Let's Encrypt)
- **Rate limiting**: máximo 100 requisições/minuto por IP
- **Logs de auditoria**: quem fez o quê e quando

### 6.4 LGPD (Lei Geral de Proteção de Dados)
- **Consentimento**: lead pode solicitar exclusão dos dados (botão no chat)
- **Anonimização**: após 2 anos de inatividade, dados pessoais são anonimizados
- **Exportação**: lead pode baixar todos os seus dados em JSON

---

## 7. PERFORMANCE & ESCALABILIDADE

### 7.1 Otimizações

**Frontend**
- **Next.js Server Components** para rendering no servidor
- **Lazy loading** de imagens e componentes pesados
- **Virtual scrolling** na lista de conversas (react-window)
- **Debounce** em buscas e filtros (300ms)

**Backend**
- **Database indexing**: índices em campos mais consultados (lead_id, telefone, criado_em)
- **Query optimization**: uso de `JOIN` eficiente, evitar N+1
- **Cache Redis**: sessões de usuário, contadores, rate limiting
- **BullMQ**: processamento assíncrono de mensagens e automações

**Real-time**
- **Socket.io rooms**: cada atendente só recebe eventos das conversas dele
- **Compression**: ativar compressão WebSocket
- **Heartbeat**: ping/pong a cada 30s para detectar desconexões

### 7.2 Limites Técnicos

| Métrica | Limite Recomendado |
|---------|-------------------|
| Atendentes simultâneos | 50 |
| Conversas ativas | 1.000 |
| Mensagens/dia | 50.000 |
| Nós por fluxo | 100 |
| Fluxos ativos | 50 |
| Retenção de mensagens | 1 ano (arquivar antigas) |

**Plano de Escala**
- Se ultrapassar limites: migrar para cluster Kubernetes
- PostgreSQL → sharding por tenant (multi-tenancy)
- Redis → cluster com sentinels

---

## 8. MONITORAMENTO

### 8.1 Métricas de Infraestrutura
- **Docker stats**: CPU, memória, I/O de cada container
- **Prometheus + Grafana**: dashboards de saúde do sistema
  - Latência de APIs
  - Taxa de erro (5xx)
  - Uptime do uazapiGO

### 8.2 Logs
- **Winston** (Node.js) para logs estruturados
- Níveis: error, warn, info, debug
- Rotação diária (manter últimos 7 dias)

### 8.3 Alertas
- **Email/Telegram** se:
  - uazapiGO desconectar (WhatsApp offline)
  - Uso de CPU > 80% por 5 minutos
  - Disco > 90% cheio
  - Taxa de erro > 5%

---

## 9. ROADMAP DE IMPLEMENTAÇÃO

### Fase 1: MVP (4-6 semanas)
**Objetivo:** Sistema funcional para teste interno

- [ ] Setup Docker Compose + VPS
- [ ] Integração uazapiGO (enviar/receber mensagens)
- [ ] Inbox básico (Socket.io + Chatscope)
- [ ] CRUD de Leads (PostgreSQL + Prisma)
- [ ] Auth (NextAuth.js)
- [ ] Canvas de automação (XYFlow) - apenas envio de mensagens e delays
- [ ] Deploy em staging

### Fase 2: IA v1 (2-3 semanas)
**Objetivo:** Primeira iteração dos agentes inteligentes

- [ ] Integração Groq + Llama 3.3
- [ ] Nó de IA: Classificador de Intenção
- [ ] Nó de IA: Análise de Sentimento
- [ ] Sugestões da IA no inbox (popup)
- [ ] Modo automático (IA executa sem aprovação)

### Fase 3: CRM Avançado (2 semanas)
**Objetivo:** Funil visual e gestão completa

- [ ] Kanban de funil (drag-and-drop)
- [ ] Tags e filtros avançados
- [ ] Score de lead (calculado por IA)
- [ ] Tarefas e follow-ups manuais

### Fase 4: Analytics (1-2 semanas)
**Objetivo:** Dashboards para tomada de decisão

- [ ] KPIs principais (Tremor)
- [ ] Gráficos de performance
- [ ] Relatórios exportáveis (PDF)
- [ ] CSAT após atendimento

### Fase 5: Templates & Onboarding (1 semana)
**Objetivo:** Facilitar adoção por novos usuários

- [ ] 5 templates prontos (e-commerce, vendas, suporte, etc)
- [ ] Tour interativo no primeiro acesso
- [ ] IA para criar fluxos via linguagem natural

### Fase 6: Polimento & Launch (2 semanas)
**Objetivo:** Preparar para produção

- [ ] Testes de carga
- [ ] Documentação de API
- [ ] Vídeos tutoriais
- [ ] Backup automatizado
- [ ] Monitoramento completo

**Total estimado: 12-16 semanas**

---

## 10. CRITÉRIOS DE SUCESSO

### Técnicos
- [ ] Latência < 500ms para receber mensagem do WhatsApp
- [ ] Uptime > 99.5% (máximo 3h de downtime/mês)
- [ ] Canvas suporta 100+ nós sem lag
- [ ] Socket.io mantém 50 conexões simultâneas sem perda

### Negócio
- [ ] Tempo para criar primeira automação < 5 minutos
- [ ] Taxa de adoção de sugestões da IA > 60%
- [ ] Redução de 40% no tempo médio de resposta vs. manual
- [ ] CSAT médio > 4.5/5

### UX
- [ ] Onboarding completo em < 10 minutos
- [ ] Usuário consegue usar sem ler documentação
- [ ] 0 bugs críticos (que impedem uso)

---

## 11. CONSIDERAÇÕES FINAIS

### Pontos de Atenção

**WhatsApp e Meta**
- Evitar spam: sempre respeitar opt-in do lead
- Rate limiting: não enviar > 1 mensagem/segundo
- Templates: mensagens após 24h de inatividade precisam ser templates aprovados pela Meta

**Custos Operacionais**
- VPS: ~R$ 50-200/mês (4GB RAM, 2 vCPU)
- Domínio + SSL: ~R$ 40/ano
- Groq (IA): gratuito até 14.400 req/dia (suficiente para MVP)
- Total mensal: < R$ 250

**Evolução Futura**
- Multi-tenant (SaaS): permitir que clientes criem suas próprias instâncias
- Marketplace de templates: comunidade compartilha fluxos
- Integrações premium: Salesforce, HubSpot, SAP
- Mobile app: versão nativa para iOS/Android

---

## 12. ANEXOS

### Exemplo de Docker Compose

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      DATABASE_URL: postgresql://user:pass@db:5432/iaflowcrm
      REDIS_URL: redis://redis:6379
      NEXTAUTH_SECRET: ${NEXTAUTH_SECRET}
    depends_on:
      - db
      - redis

  uazapi:
    image: uazapigo/api:latest
    ports:
      - "8080:8080"
    volumes:
      - ./data/uazapi:/sessions
    environment:
      API_KEY: ${UAZAPI_KEY}

  db:
    image: postgres:16-alpine
    volumes:
      - ./data/postgres:/var/lib/postgresql/data
    environment:
      POSTGRES_DB: iaflowcrm
      POSTGRES_USER: user
      POSTGRES_PASSWORD: pass

  redis:
    image: redis:7-alpine
    volumes:
      - ./data/redis:/data

  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ./nginx.conf:/etc/nginx/nginx.conf
      - ./data/certbot:/etc/letsencrypt