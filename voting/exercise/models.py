from django.db import models
from home.models import Organization,VoterList
# Create your models here.
class Discussion(models.Model):
    organization=models.ForeignKey(Organization,on_delete=models.CASCADE,related_name='related_organization_discussion')
    person=models.ForeignKey(VoterList,on_delete=models.CASCADE,related_name='discussion_topic')
    date=models.DateField(auto_now_add=True)
    description=models.TextField()

class Reply(models.Model):
    discussion=models.ForeignKey(Discussion,on_delete=models.CASCADE,related_name='related_discussion')
    person=models.ForeignKey(VoterList,on_delete=models.CASCADE,related_name='person_replied')
    reply=models.TextField()
    date=models.DateField(auto_now_add=True)
    








