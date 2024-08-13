from django.db import models
from django.conf import settings
from django.contrib.auth.models import *

# Create your models here.
       
class AcademicSpace(models.Model):
    name = models.CharField(max_length=255)
    semester = models.IntegerField()
    type_space = models.CharField(max_length=50, null=True)
    def __str__(self):
        return self.name

class Repetition(models.Model):
    academic_space = models.ForeignKey(AcademicSpace, on_delete=models.CASCADE)
    times_repeated = models.IntegerField()
    student_count = models.IntegerField()

