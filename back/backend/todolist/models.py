from django.db import models

# Create your models here.
class Notes(models.Model):
    name = models.CharField(max_length=200 , null=True );
    priority = models.CharField(max_length=200 , null=True );