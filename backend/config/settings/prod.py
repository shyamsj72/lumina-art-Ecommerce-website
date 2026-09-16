from .base import *
import dj_database_url

DEBUG = False

# Render sets ALLOWED_HOSTS through env
ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*'])

DATABASES = {
    'default': dj_database_url.config(
        conn_max_age=600,
        conn_health_checks=True,
    )
}

SECURE_SSL_REDIRECT = True
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True

CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[])

# Cloudinary for media storage
CLOUDINARY_URL = env('CLOUDINARY_URL', default=None)
if CLOUDINARY_URL:
    DEFAULT_FILE_STORAGE = 'cloudinary_storage.storage.MediaCloudinaryStorage'

# Whitenoise for static files
MIDDLEWARE.insert(1, 'whitenoise.middleware.WhiteNoiseMiddleware')
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'
