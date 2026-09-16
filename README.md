# Lumina Art - Custom E-Commerce & Showroom

Lumina Art is a full-stack custom CNC-craft showroom application. It provides an immersive product catalog, shopping cart with WhatsApp checkout integration, custom design file uploads, and an AI-powered chatbot assistant.

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS (v4), Framer Motion, Lucide React
- **Backend**: Django 5.1, Django REST Framework, PostgreSQL
- **AI Integration**: Google Gemini API (`gemini-3.5-flash-lite`)

## Features
- **Dynamic Catalog**: Filter products by categories, search, and view pricing across different thickness variants.
- **WhatsApp Checkout**: Instead of a traditional payment gateway, customers build their cart and check out seamlessly via a pre-filled WhatsApp message sent to the store.
- **Custom Design Studio**: Customers can upload reference files (images/PDFs) and describe their custom CNC or acrylic needs. Requests are routed securely via Django email backend to the store owner.
- **Lumina AI Chatbot**: An intelligent, floating chat widget that uses the live Django database to answer customer questions about products, business hours, and pricing. Uses rate limiting and graceful degradation to WhatsApp if API limits are reached.

## Local Development

### 1. Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
# source venv/bin/activate # Mac/Linux
pip install -r requirements/dev.txt

# Create a .env file based on .env.example
# Add your GEMINI_API_KEY and EMAIL_HOST settings
python manage.py migrate
python manage.py runserver
```

### 2. Frontend Setup
```bash
cd frontend
npm install
# Create a .env file
# Add VITE_API_BASE_URL=http://127.0.0.1:8000
npm run dev
```

## Production Deployment

### Backend (Render)
1. Connect this repository to a Render Web Service.
2. Root Directory: `backend`
3. Build Command: `./build.sh`
4. Start Command: `gunicorn config.wsgi:application`
5. Environment Variables:
   - `DJANGO_SETTINGS_MODULE`: `config.settings.prod`
   - `DATABASE_URL`: Add a Render PostgreSQL database URL
   - `ALLOWED_HOSTS`: `<your-render-url>.onrender.com`
   - `CORS_ALLOWED_ORIGINS`: `https://<your-vercel-url>.vercel.app`
   - `CLOUDINARY_URL`: For cloud media storage
   - `GEMINI_API_KEY`: Google Gemini API key
   - `EMAIL_HOST_USER` / `EMAIL_HOST_PASSWORD`: For custom design emails

### Frontend (Vercel)
1. Connect this repository to Vercel.
2. Framework Preset: `Vite`
3. Root Directory: `frontend`
4. Environment Variables:
   - `VITE_API_BASE_URL`: The URL of your deployed Render backend (e.g., `https://lumina-backend.onrender.com`)
