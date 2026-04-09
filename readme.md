#  Acervo Sete Colinas

Sistema web desenvolvido para gerenciamento de livros.

---

##  Tecnologias Utilizadas

###  Backend

* Node.js
* Express **5.2.1**
* Sequelize **6.37.8**
* PostgreSQL (pg **8.20.0**)
* pg-hstore **2.3.4**
* Cors **2.8.6**
* Zod **4.3.6**

### Frontend

* React **19.2.0**
* React DOM **19.2.0**
* React Router DOM **7.13.1**
* Vite **7.3.1**

####  UI e Estilização

* Material UI (MUI) **7.3.9**
* MUI Icons **7.3.9**
* Emotion React **11.14.0**
* Emotion Styled **11.14.1**

####  Extras

* MUI Charts **8.28.2**
* MUI Date Pickers **8.27.2**
* Dayjs **1.11.20**
* Swiper **12.1.2**

---

##  Scripts

### Backend

```bash
npm run dev
```

### Frontend

```bash
npm run dev
```

---

##  Instalação

### 1. Clonar o repositório

```bash
git clone <URL_DO_REPOSITORIO>
```

### 2. Backend

```bash
cd backend
npm install
npm run dev
```

### 3. Frontend

```bash
cd frontend
npm install
npm run dev
```

---
##  Rotas do Sistema (Frontend)

Rotas disponíveis para acesso no navegador (temporário para referência):

```bash
/                      → Página inicial (Home)
/livro/:id             → Informações do livro
/livros                → Cadastro de livros
/entregadores          → Cadastro de entregadores
/funcionarios          → Cadastro de funcionários
/usuarios              → Cadastro de usuários
/login                 → Tela de login
/esqueci-senha         → Recuperação de senha
/enviado-email         → Confirmação de envio de email
/gerar-senha           → Criação de nova senha
/dashboard             → Painel administrativo
/emprestimos           → Meus empréstimos
```

 **Observação:**
Essas rotas são utilizadas para navegação no frontend e podem sofrer alterações durante o desenvolvimento.
