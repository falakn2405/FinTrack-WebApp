# FinTrack – Income & Expense Tracker

FinTrack is a full-stack web application built to simplify personal finance management. It allows users to easily record and monitor their income and expenses in one place, making it easier to stay on top of their financial habits.

The application is developed using React for the frontend, Spring Boot for the backend, and MySQL as the database. It offers a clean and intuitive interface where users can log transactions, categorize their spending, and view summaries of their financial activity.

## Features

- User Authentication
- Category Management
- Income & Expense
- Add / Update / Delete Transactions
- Financial Dashboard with Charts
- Secure REST APIs
- Responsive UI

## Tech Stack

#### Frontend
- React (Vite)
- Tailwind CSS
- Axios
- Recharts

#### Backend
- Spring Boot
- Spring Security (JWT Authentication)
- Hibernate / JPA

#### Database
- MySQL

#### Other Tools
- Cloudinary (Image Upload)
- SMTP (Email Service)

## Setup Instructions

### 1- Clone Repository

```bash
git clone https://github.com/falakn2405/FinTrack.git
cd FinTrack
```

### 2- Backend Setup (Spring Boot)
Update application.properties
- Configure Database (MySQL)

```bash
spring.datasource.url=jdbc:mysql://localhost:3306/fintrack
spring.datasource.username=root
spring.datasource.password=your_password
```

- Configure SMTP (Email Server)

```bash
spring.mail.host=smtp_host
spring.mail.port=587
spring.mail.username=smtp_email
spring.mail.password=smtp_pass
```

- Run Backend

```bash
cd backend
mvn spring-boot:run
```

Backend runs at:
http://localhost:8080

### 3- Frontebd Setup (React + Vite)
Update apiEndpoints.js
- Configure Cloudinary

```bash
const CLOUDINARY_CLOUD_NAME=cloud_name;
```

- Run Frontend

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at:
http://localhost:5173
