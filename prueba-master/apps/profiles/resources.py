from django.contrib.auth.models import User
from import_export import resources
from import_export.fields import Field
from apps.profiles.models import *
	

class AcademicSpaceExport(resources.ModelResource):
    id = Field(attribute='id', column_name='ID')
    name = Field(attribute='name', column_name='Nombre')
    semester = Field(attribute='semester', column_name='Semestre')
    type_space = Field(attribute='type_space', column_name='Calificación')

    class Meta:
        model = AcademicSpace
        fields = (
            'id',
            'name',
            'semester',
            'type_space',
        )
        export_order = (
            'id',
            'name',
            'semester',
            'type_space',
        )

class AcademicSpaceImport(resources.ModelResource):
    class Meta:
        model = AcademicSpace

class RepetitionImport(resources.ModelResource):
    class Meta:
        model = Repetition



