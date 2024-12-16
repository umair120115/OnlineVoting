from rest_framework import serializers
from home.serializers import VotersSerializer
from .models import Discussion,Reply

class DiscussionSerializer(serializers.ModelSerializer):
    person_name=serializers.SerializerMethodField()
    class Meta:
        model=Discussion
        fields=['id','organization','person','date','description','person_name']
        read_only_fields=['organization','person']
    def get_person_name(self,obj):
        return obj.person.name
    
class ReplySerializer(serializers.ModelSerializer):
    person_name=serializers.SerializerMethodField()
    class Meta:
        model=Reply
        fields=['id','discussion','person','reply','date']
    def get_person_name(self,obj):
        return obj.person.name