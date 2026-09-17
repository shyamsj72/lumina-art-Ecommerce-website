<div align="center">
  <img src="./frontend/public/logo.svg" alt="Lumina Art Logo" width="120" />
  
  # Lumina Art - Premium Architectural Fabrication Studio
  
  **A full-stack custom CNC-craft e-commerce and showroom application.**
  
  [![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)](https://react.dev/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.5-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
  [![Django](https://img.shields.io/badge/Django-5.1-092E20?style=for-the-badge&logo=django)](https://www.djangoproject.com/)
  [![TailwindCSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
  [![Vite](https://img.shields.io/badge/Vite-6.0-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

  [Live Demo](https://lumina-art-ecommerce-website.vercel.app/) • [Report Bug](#) • [Request Feature](#)
</div>

---

## 📖 Overview

Lumina Art is a state-of-the-art e-commerce platform designed for an architectural fabrication studio. It showcases premium CNC-cut entrance name boards, laser-cut acrylics, and LED signage.

Unlike traditional e-commerce stores, Lumina Art is optimized for **high-touch, custom manufacturing**. Instead of a generic payment gateway, it leverages a **WhatsApp-integrated checkout flow**, allowing customers to build their cart and instantly send a structured order inquiry to the sales team for personalized pricing and fulfillment.

## 📸 UI Layout & Screenshots

Here is a glimpse of the Lumina Art interface:

<div align="center">
  <img src="docs/home.png" alt="Lumina Art Home Dashboard" width="800" />
  <p><i>The main showroom dashboard featuring dynamic product cards and categories.</i></p>

  <img src="docs/ai.png" alt="Lumina AI Chatbot" width="800" />
  <p><i>The Lumina AI Chatbot assisting a customer with product inquiries.</i></p>
</div>

## ✨ Key Features

- 🛍️ **Immersive Product Catalog**: Browse products by discipline (CNC, Laser, LED, Wood), complete with responsive galleries and dynamic pricing variants.
- 💬 **WhatsApp Checkout & Enquiry**: Frictionless cart compilation that routes directly to the studio's WhatsApp, maximizing conversion for high-ticket custom items.
- 🎨 **Custom Design Studio**: A dedicated portal for clients to upload reference files (sketches, PDFs) and request completely bespoke architectural fabrication.
- 🤖 **AI-Powered Concierge (Gemini)**: An intelligent, context-aware chatbot powered by Google's Gemini AI that helps customers find products, answers FAQs, and assists with materials.
- 📱 **Mobile-First UX**: Buttery smooth animations powered by Framer Motion, optimized for mobile browsing with a sticky cart drawer and intuitive navigation.
- 🔍 **SEO & Search Console Ready**: Includes pre-configured Google Search Console verification.

## 🛠️ Technology Stack

### Frontend (Client-Side)
- **Framework**: React 19 (Vite)
- **Language**: TypeScript
- **Styling**: Tailwind CSS (v4) with custom design tokens
- **Animations**: Motion (Framer Motion)
- **Icons**: Lucide React
- **Deployment**: Vercel

### Backend (Server-Side & API)
- **Framework**: Django 5.1 & Django REST Framework (DRF)
- **Database**: PostgreSQL (Production) / SQLite (Development)
- **AI Integration**: `google-genai` SDK (`gemini-3.5-flash-lite`)
- **Deployment**: Render / Heroku

---

## 🚀 Local Development Setup

To run this project locally, you will need two separate terminal windows—one for the backend API and one for the frontend client.

### 1. Backend Setup (Django)

```bash
# Navigate to the backend directory
cd backend

# Create and activate a virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Mac/Linux:
# source venv/bin/activate

# Install dependencies
pip install -r requirements/dev.txt

# Set up environment variables
cp .env.example .env
# Edit .env and add your GEMINI_API_KEY and email settings

# Run database migrations
python manage.py migrate

# Load initial catalog data (Categories & Products)
python manage.py loaddata apps/catalog/fixtures/initial_data.json

# Start the development server
python manage.py runserver
```

### 2. Frontend Setup (React)

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Ensure VITE_API_BASE_URL=http://127.0.0.1:8000 is set

# Start the Vite development server
npm run dev
```

---

## 🌍 Production Deployment Guide

### Backend Hosting (e.g., Render)
1. Create a new Web Service pointing to the `backend` directory.
2. **Build Command**: `./build.sh` *(This script installs dependencies, collects static files, runs migrations, and automatically loads the initial database fixture).*
3. **Start Command**: `gunicorn config.wsgi:application`
4. **Required Environment Variables**:
   - `DJANGO_SETTINGS_MODULE`: `config.settings.prod`
   - `DATABASE_URL`: Your production PostgreSQL connection string.
   - `ALLOWED_HOSTS`: The domain of your backend server (e.g., `lumina-api.onrender.com`).
   - `CORS_ALLOWED_ORIGINS`: The domain of your deployed frontend (e.g., `https://lumina-art-ecommerce-website.vercel.app`).
   - `GEMINI_API_KEY`: Your Google API key for the chatbot.

### Frontend Hosting (Vercel)
1. Import the repository into Vercel.
2. Set the Root Directory to `frontend`.
3. Vercel will automatically detect the Vite preset.
4. **Environment Variables**:
   - `VITE_API_BASE_URL`: The production URL of your backend.

---

## 🤝 Contributing
Contributions, issues, and feature requests are welcome! 

## 📄 License
This project is proprietary and confidential. Unauthorized copying of this project, via any medium, is strictly prohibited.
