# Docker

**Tags**: `#Docker` `#DevOps` `#Container`
**Data**: 2024-12-17
**Links Relacionados**: [[Virtualização]], [[Containers]]

---

## 💡 O que é?
Docker é uma plataforma que permite criar, implantar e executar aplicações em **containers**. Imagine containers de navio: eles padronizam o transporte de cargas diferentes. O Docker faz isso com software, empacotando código e dependências para rodar em qualquer lugar.

## ⚙️ Como funciona?
Ele utiliza recursos do Kernel do Linux (Namespaces e Cgroups) para isolar processos. Diferente de uma Máquina Virtual (VM) que emula um SO inteiro, o Docker compartilha o Kernel do host, sendo muito mais leve.

- **Imagens**: O "planta" ou receita (read-only).
- **Containers**: A instância rodando da imagem.

## 💻 Exemplo Prático
Criando um container Nginx simples:
```bash
# Baixa e roda a imagem nginx na porta 8080
docker run -d -p 8080:80 --name meu-site nginx
```

Criando um Dockerfile básico:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
CMD ["node", "app.js"]
```

## 🧠 Por que isso é importante?
- **Consistência**: "Funciona na minha máquina" e funciona em produção.
- **Isolamento**: Várias apps com diferentes versões de Node/Python no mesmo servidor.
- **Escalabilidade**: Fácil subir e descer réplicas.

## 📚 Referências
- [Docker Documentation](https://docs.docker.com/)


## 🛠 Projects applying this concept
- [ApiWithBun](../../01_Projetos/ApiWithBun)
- [CallScheduleApp](../../01_Projetos/CallScheduleApp)
- [CalligraphyTrainingApp](../../01_Projetos/CalligraphyTrainingApp)
- [CleanDDD_Core](../../01_Projetos/CleanDDD_Core)
- [Content_Planning](../../01_Projetos/Content_Planning)
- [DailyLogger](../../01_Projetos/DailyLogger)
- [DesignSystem_Lib](../../01_Projetos/DesignSystem_Lib)
- [DevFinance](../../01_Projetos/DevFinance)
- [DevStore_Ecom](../../01_Projetos/DevStore_Ecom)
- [Felipe_Website](../../01_Projetos/Felipe_Website)
- [FindYourDuo_App](../../01_Projetos/FindYourDuo_App)
- [FocusTimeChallenge](../../01_Projetos/FocusTimeChallenge)
- [FoodCourtApp](../../01_Projetos/FoodCourtApp)
- [GDashChallenge](../../01_Projetos/GDashChallenge)
- [GeminiVision_AI](../../01_Projetos/GeminiVision_AI)
- [GymPass_App](../../01_Projetos/GymPass_App)
- [IgniteShop](../../01_Projetos/IgniteShop)
- [ImageReader_Tool](../../01_Projetos/ImageReader_Tool)
- [MangaGenAI](../../01_Projetos/MangaGenAI)
- [MovieNotesAPI](../../01_Projetos/MovieNotesAPI)
- [NestCleanArchitecture](../../01_Projetos/NestCleanArchitecture)
- [NestCleanRocketseat](../../01_Projetos/NestCleanRocketseat)
- [NextJS_Fundamentals](../../01_Projetos/NextJS_Fundamentals)
- [NodeJS_Studies](../../01_Projetos/NodeJS_Studies)
- [Notes_App](../../01_Projetos/Notes_App)
- [PizzaShop_Web](../../01_Projetos/PizzaShop_Web)
- [PizzaShoppingAPI](../../01_Projetos/PizzaShoppingAPI)
- [PizzaSmart_Specs](../../01_Projetos/PizzaSmart_Specs)
- [Portfolio_Docs](../../01_Projetos/Portfolio_Docs)
- [ReactStateManagement](../../01_Projetos/ReactStateManagement)
- [SaaS_RBAC_System](../../01_Projetos/SaaS_RBAC_System)
- [ServerlessTesting](../../01_Projetos/ServerlessTesting)
- [SmartPizza_App](../../01_Projetos/SmartPizza_App)
- [TailwindMastery](../../01_Projetos/TailwindMastery)
- [TaskManagementApp](../../01_Projetos/TaskManagementApp)
- [WebDevChallenge](../../01_Projetos/WebDevChallenge)
- [YourHotel_App](../../01_Projetos/YourHotel_App)
