from django.shortcuts import render,get_object_or_404
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework import generics
from rest_framework.decorators import api_view,permission_classes
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .serializers import DiscussionSerializer,ReplySerializer
from .models import Discussion,Reply
from home.models import VoterList,AppUser,Organization
from rest_framework.parsers import MultiPartParser,FormParser
import json

# Create your views here.
class DiscussionView(generics.ListAPIView):
    queryset=Discussion.objects.all()
    permission_classes=[IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=DiscussionSerializer
    def get_queryset(self):
        organization_id=self.kwargs.get('organization_id')
        results= Discussion.objects.filter(organization=organization_id)
        return results
@csrf_exempt
@permission_classes([AllowAny])
@api_view(['POST'])
def discussion_view(request,organization_id):
    user_id=request.user.id
    user=get_object_or_404(AppUser,id=user_id)
    organization=get_object_or_404(Organization,id=organization_id)

    person=VoterList.objects.filter(email=user.email,Organization=organization).first()
    if not person:
        return JsonResponse({"status":"person not authorized for participation"})
    else:
        data=json.loads(request.body)
        description=data.get('description')
        discussion=Discussion(organization=organization,person=person,description=description)
        discussion.save()
        return JsonResponse({'status':'Successfully posted!'})



