import os, sys
# add the hellodjango project path into the sys.path
sys.path.append('/opt/maeztro/maeztroweb')

# add the virtualenv site-packages path to the sys.path
sys.path.append('/opt/maeztro/env_maeztro/lib/python3.5/site-packages')

# poiting to the project settings
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "admin.settings")

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# wsgi.py file end
# ===================
