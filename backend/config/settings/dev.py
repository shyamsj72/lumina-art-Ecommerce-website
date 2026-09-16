from .base import *

# Override default settings for development
DEBUG = True
ALLOWED_HOSTS = ['localhost', '127.0.0.1']

# Connect to the local PostgreSQL database
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'luminaart_db',
        'USER': 'luminaart_user',
        'PASSWORD': 'LuminaArt@123',
        'HOST': 'localhost',
        'PORT': '5432',
    }
}

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]
