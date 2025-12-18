#SaaS

Objetivo, resolver um único problema.
Exemplo uma ferramenta para agendamento de serviço.
[[mapa.canvas|mapa]]



![[MicroSaaS_Concept_1.png]]

Cliente alvo:
	Salão de beleza e cabelereiros
Objetivo
	Uma plataforma para agendamento de horários, onde o clientes podem agenda data e hora para atendimento no salão
Forma de pagamento:
Pix, boleto
Precificar:

Requisitos iniciais 
- landpage
		descrever o que o Saas resolve
Requisitos técnicos usuário 
-  Cliente deve agenda com seu numero de telefone.
- Criar um agendamento no google calendar
- Cliente vai receber via Sms e Whatsap uma mensagem lembrete do dia e hora agendado
- Segurança: (Sera feito por ultimo)
	Ele deve confirma a partir de um link recebido no seu Whatsap ou Sms
	Se não confirma não terá o agendamento
Requisitos técnicos cliente
- cadastra
- login
- adicionar serviços
	- imagem
	- valor
- data e hora para agendamento
	- agendamento no google calendar
- pagamentos com stripe
	- pix/ boleto
- tela de assinatura
Ferramentas
- Nextjs
- Zod
- talves Hono.dev
- Bun
- Pisma
- PostgreSQL
- Vitestjs
- Google Analytics



![[MicroSaaS_Concept_2.png]]

## 🛠 Projects applying this concept
- [IgniteShop](../../01_Projetos/IgniteShop)
