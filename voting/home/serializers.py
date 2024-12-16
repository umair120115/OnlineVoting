from rest_framework import serializers
from .models import AppUser,Organization,Members,MembersManifestos,VoterList,MembersVote
from datetime import timedelta

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=AppUser
        fields=['id','name','email','password','age','phone','nationality','photo','address']
    def create(self, validated_data):
        user=AppUser.objects.create_user(**validated_data)
        return user
    
class OrganizationSerializer(serializers.ModelSerializer):
    name=serializers.SerializerMethodField()
    class Meta:
        model=Organization
        fields=['id','organization_name','purpose','date','Organizer_name','name','organizer_post','description']
        read_only_fields=['Organizer_name']
    def get_name(self,obj):
        return obj.Organizer_name.name

class MemberSerialization(serializers.ModelSerializer):
    organization_name=serializers.SerializerMethodField()
   
    class Meta:
        model=Members
        fields=['id','Organization','name','age','email','organization_name']
        read_only_fields=['Organization']
    def get_organization_name(self,obj):
        return obj.Organization.organization_name
class VotersSerializer(serializers.ModelSerializer):

    class Meta:
        model=VoterList
        fields=['Organization','name','email','voted']
        read_only_fields=['organization']

class MembersVoteSerializer(serializers.ModelSerializer):
    votes=VotersSerializer(many=True,read_only=True)
    member_name=serializers.SerializerMethodField()
    no_votes=serializers.SerializerMethodField()
    class Meta:
        model=MembersVote
        fields=['organization','member','member_name','votes','no_votes']
        read_only_fields=['organization','member']
    def get_no_votes(self,obj):
        return len(obj.votes.all())
    def get_member_name(self,obj):
        return obj.member.name



class MembersManifestoSerializer(serializers.ModelSerializer):
    member_name=serializers.SerializerMethodField()
    member_email=serializers.SerializerMethodField()
    member_age=serializers.SerializerMethodField()
    class Meta:
        model=MembersManifestos
        fields=['photo','member','manifesto','member_name','member_age','member_email']
        read_only_fields=['member']
    def get_member_name(self,obj):
        return obj.member.name
    def get_member_age(self,obj):
        return obj.member.age
    def get_member_email(self,obj):
        return obj.member.email
    

    