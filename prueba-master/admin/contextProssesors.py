from django.conf import settings

def version_static(request):
	return {'version_static': settings.VERSION_STATIC}