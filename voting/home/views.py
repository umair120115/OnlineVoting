from django.shortcuts import render,get_object_or_404
from .models import AppUser,Organization,Members,MembersManifestos,VoterList,MembersVote
from rest_framework.parsers import MultiPartParser,FormParser
from rest_framework.permissions import AllowAny,IsAuthenticated,IsAdminUser
from rest_framework import generics
from django.http import JsonResponse
from rest_framework.decorators import api_view,permission_classes
from .serializers import UserSerializer,OrganizationSerializer,MemberSerialization,MembersVoteSerializer,MembersManifestoSerializer
from django.views.decorators.csrf import csrf_exempt
from datetime import date
from PyPDF2 import PdfReader
from django.db import transaction
import csv
from main import chat

# Create your views here.
class UserView(generics.ListCreateAPIView):
    queryset=AppUser.objects.all()
    parser_classes=[FormParser,MultiPartParser]
    serializer_class=UserSerializer
    permission_classes=[AllowAny]

class OrganizationCreation(generics.ListCreateAPIView):
    queryset=Organization.objects.all()
    parser_classes=[FormParser,MultiPartParser]
    serializer_class=OrganizationSerializer
    permission_classes=[AllowAny]
    def perform_create(self, serializer):
        user=self.request.user
        user_instance=get_object_or_404(AppUser,id=user.id)
        serializer.save(Organizer_name=user_instance)
        return super().perform_create(serializer)
    

class MemberRegistration(generics.ListCreateAPIView):
    queryset=Members.objects.all()
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=MemberSerialization
    permission_classes=[IsAuthenticated]
    def get_queryset(self):
        organization_id=self.kwargs.get('organization_id')
        members=Members.objects.filter(Organization=organization_id)

        return members


@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def vote(request, member_id):
    current_user = request.user
    curr_user_object = get_object_or_404(AppUser, id=current_user.id)  # Current user
    member = get_object_or_404(Members, id=member_id)  # Selected member
    current_date=date.today()
    organization=get_object_or_404(Organization,id=member.Organization_id)
    if (current_date!=organization.date):
        return JsonResponse({'status':'not date of event!'})

    # Get voter from VoterList
    voter = VoterList.objects.filter(email=curr_user_object.email,Organization=member.Organization).first()
    if not voter:
        return JsonResponse({'status': 'Not authorized to give vote!'})

    # Validate organization
    # print(member.Organization_id)
    if member.Organization_id != voter.Organization_id:
        return JsonResponse({'status': 'Voter and Member must belong to the same organization!'})

    # Check if already voted
    if voter.voted:
        return JsonResponse({'status': 'Already Voted'})
    
    
    # Perform the voting logic atomically
    with transaction.atomic():
            users_vote, created = MembersVote.objects.get_or_create(
            organization=voter.Organization, 
            member=member
        )
            users_vote.votes.add(voter)  # Link the voter to the vote
            users_vote.save()

            voter.voted = True  # Mark voter as having voted
            voter.save()

    

            return JsonResponse({
        'status': 'Successfully Voted',
        'member': member.name,
        
    })
    

class MembersVoteCountView(generics.ListAPIView):
    queryset=MembersVote.objects.all()
    permission_classes=[IsAuthenticated]
    parser_classes=[MultiPartParser,FormParser]
    serializer_class=MembersVoteSerializer
    def get_queryset(self):
        organization_id=self.kwargs.get('organization_id')
        votes=MembersVote.objects.filter(organization=organization_id)
        return votes



        

class ManifestoView(generics.ListCreateAPIView):
    queryset=MembersManifestos.objects.all()
    parser_classes=[MultiPartParser,FormParser]
    permission_classes=[IsAuthenticated]
    serializer_class=MembersManifestoSerializer
    def get_queryset(self):
        member_id=self.kwargs.get('member_id')
        manifesto=MembersManifestos.objects.filter(member=member_id)
        return manifesto

from django.db import IntegrityError

@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])  # Ensure only authenticated users
def upload_voter_list(request, organization_id):
    # Get the current user and organization
    user = request.user
    organization = get_object_or_404(Organization, id=organization_id)

    # Ensure only the event organizer can upload the voter list
    if user.email != organization.Organizer_name.email:
        return JsonResponse({'status': 'You are not allowed to upload the voter list'}, status=403)

    # Ensure a file is uploaded
    if 'csv_file' not in request.FILES:
        return JsonResponse({'status': 'No file uploaded'}, status=400)

    csv_file = request.FILES['csv_file']

    if not csv_file.name.endswith('.csv'):
        return JsonResponse({'status': 'Invalid file format. Please upload a CSV file.'}, status=400)

    # Read and parse the CSV file
    try:
        decoded_file = csv_file.read().decode("utf-8").splitlines()
        reader = csv.DictReader(decoded_file)

        # Check if CSV headers are valid
        required_headers = {'name', 'email'}
        if not required_headers.issubset(reader.fieldnames):
            return JsonResponse({'status': f'Missing required headers: {required_headers}'}, status=400)

        # Iterate over each row and create instances
        created_count = 0
        duplicate_count = 0
        for row in reader:
            name = row.get('name', '').strip()
            email = row.get('email', '').strip()

            # Skip empty or invalid rows
            if not name or not email:
                continue

            try:
                # Create a new voter instance
                VoterList.objects.create(
                    Organization=organization,
                    name=name,
                    email=email
                )
                created_count += 1
            except IntegrityError:
                # Handle duplicate emails or other constraints
                duplicate_count += 1

        return JsonResponse({
            'status': 'Upload Complete',
            'created': created_count,
            'duplicates': duplicate_count
        })

    except Exception as e:
        return JsonResponse({'status': f'Error processing file: {str(e)}'}, status=500)
    
@csrf_exempt
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def upload_members_list(request,organization_id):
    # Get the current user and organization
    user = request.user
    organization = get_object_or_404(Organization, id=organization_id)

    # Ensure only the event organizer can upload the voter list
    if user.email != organization.Organizer_name.email:
        return JsonResponse({'status': 'You are not allowed to upload the voter list'}, status=403)

    # Ensure a file is uploaded
    if 'csv_file' not in request.FILES:
        return JsonResponse({'status': 'No file uploaded'}, status=400)

    csv_file = request.FILES['memberscsv_file']

    if not csv_file.name.endswith('.csv'):
        return JsonResponse({'status': 'Invalid file format. Please upload a CSV file.'}, status=400)

    # Read and parse the CSV file
    try:
        decoded_file = csv_file.read().decode("utf-8").splitlines()
        reader = csv.DictReader(decoded_file)

        # Check if CSV headers are valid
        required_headers = {'name', 'email'}
        if not required_headers.issubset(reader.fieldnames):
            return JsonResponse({'status': f'Missing required headers: {required_headers}'}, status=400)

        # Iterate over each row and create instances
        created_count = 0
        duplicate_count = 0
        for row in reader:
            name = row.get('name', '').strip()
            email = row.get('email', '').strip()
            age=row.get('age','').strip()

            # Skip empty or invalid rows
            if not name or not email:
                continue

            try:
                # Create a new voter instance
                Members.objects.create(
                    Organization=organization,
                    name=name,
                    age=age,
                    email=email
                )
                created_count += 1
            except IntegrityError:
                # Handle duplicate emails or other constraints
                duplicate_count += 1

        return JsonResponse({
            'status': 'Upload Complete',
            'created': created_count,
            'duplicates': duplicate_count
        })

    except Exception as e:
        return JsonResponse({'status': f'Error processing file: {str(e)}'}, status=500)


@csrf_exempt
@api_view(['POST'])
@permission_classes([AllowAny])
def chatbot(request):
    question = request.data.get('question')
    if not question:
        return JsonResponse({'status': 'Question not provided'}, status=400)
    
    try:
        response = chat(question)
        return JsonResponse({'answer': response['answer']})
    except Exception as e:
        return JsonResponse({'status': f'Error processing request: {str(e)}'}, status=500)