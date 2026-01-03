"""
WSGI config for Hermes Saze Sabz project.
"""

import os
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hermes_backend.settings')
application = get_wsgi_application()
