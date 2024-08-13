from django import forms
from django.contrib.auth.models import Group, User
from apps.profiles.models import*
from allauth.account.adapter import get_adapter
from django.contrib.auth import authenticate
from django.core.files.images import get_image_dimensions

