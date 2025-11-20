from rest_framework import serializers
from .models import ExampleModel

class ExampleModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExampleModel
        fields = '__all__'  # or specify the fields you want to include, e.g., ['field1', 'field2']