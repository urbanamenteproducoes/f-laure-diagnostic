<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://images.unsplash.com/photo-1552581234-26160f608093?auto=format&fit=crop&q=80&w=1200" />
</div>

# F-Laure / Hard Produções - Ecossistema 360º

A **F-Laure / Hard Produções** não é apenas uma agência, mas uma produtora e assessoria completa que integra arte, soluções audiovisuais, estratégia de negócios e tecnologia digital de alta performance para escalar sua marca, projeto ou carreira artística.

## 🚀 Nosso Ecossistema de Soluções

### 🎬 Audiovisual de Alto Padrão
- Ensaios fotográficos e videográficos
- Produção de **Videoclipes** e Comerciais
- Cinema: **Curtas, Médias e Longas Metragens** 

### 🎭 Arte, Agenciamento & Gestão de Carreira
- Agenciamento estratégico para **Dançarinos, Atores e Cantores**
- Gestão de Casting (Corais, Bandas Marciais, Grupos de Pagode, etc.)
- Gravação e **Produção de Música**
- Publicações e **Produção Literária**
- Gestão de **Shows e Espetáculos de Dança**

### 🤝 Eventos, Negócios & Social
- Produção de **Eventos e Festas** empresariais/culturais
- Estruturação de **Projetos Sociais**
- Especialistas em **Captação de Recursos via Leis de Incentivo** (Rouanet, Aldir Blanc, Paulo Gustavo) e Editais Públicos.

### 💻 Tecnologia & Marketing Digital
- **Criação** de Sites, Landing Pages, Apps e Blogs Otimizados
- **Design Gráfico** UI/UX Experience
- **Social Media** (Criação e Automação orientada por Inteligência Artificial)
- Análises e Diagnósticos de Sistemas Empresariais

---

## 🛠 Como rodar a plataforma/aplicativo localmente

**Pré-requisitos:**  Node.js (18+ recomendado)

1. Instale as dependências:
   ```bash
   npm install
   ```
2. Crie um arquivo `.env.local` na raiz do projeto e adicione a sua chave:
   ```env
   GEMINI_API_KEY=sua_chave_aqui
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## 🌐 Deploy de Produção
Este ecossistema foi projetado para *deploy serverless* e front-end escalável (Vite). A API utiliza a infraestrutura do Vercel Node.js para disparar notificações por e-mail utilizando *Nodemailer*.
Acesse a documentação interna para mais informações das funções (`api/send-email.ts`, e algoritmos em `src/utils/`).
