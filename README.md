# 🖥️ Task Management System - Frontend

Frontend application for the Task Management System built with **Next.js, TypeScript, and TailwindCSS**.

This application allows:
- User Registration & Login
- Admin Dashboard
- User Management
- Task Assignment
- Profile Management
- Secure Authentication (Cookies-based)

---

## 🚀 Tech Stack

- Next.js 14 (App Router)
- TypeScript
- TailwindCSS
- Axios
- React Context API
- React Hot Toast
- React Icons

---

## 📂 Project Structure

src/
│
├── app/ # Next.js pages
├── components/ # Reusable components
├── context/ # User & Task Context
├── hooks/ # Custom hooks
├── utils/ # Icons & helpers


---

## ⚙️ Environment Setup

Create a `.env.local` file in root:

NEXT_PUBLIC_SERVER_URL=http://localhost:8000


---

## 🛠️ Installation

Clone the repository:

```bash
git clone https://github.com/YOUR_USERNAME/frontend-repo.git
cd frontend-repo
Install dependencies:

npm install
Run development server:

npm run dev
App will run on:

http://localhost:3000
🔐 Authentication Flow
Login uses HTTP-only cookies

Axios configured with withCredentials: true

Backend must allow CORS with credentials enabled

Example axios config:

axios.defaults.withCredentials = true;
👨‍💼 Admin Features
Admin can:

View all users

Delete users

Assign tasks

View tasks in card layout

Register new users via modal

Admin routes depend on backend:

/api/v1/admin/*
🎨 UI Features
Modern Tailwind UI

Modal-based user creation

Card-based task display

Profile edit modal

Password change support

Dark mode

