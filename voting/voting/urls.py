"""
URL configuration for voting project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include
from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from home.views import *
from exercise.views import discussion_view,DiscussionView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('vote/',include('rest_framework.urls')),
    path('vote/token/',TokenObtainPairView.as_view(),name='access'),
    path('vote/refresh/token/',TokenRefreshView.as_view(),name='refresh'),
    path('vote/users/',UserView.as_view(),name='users'),
    path('vote/organization/',OrganizationCreation.as_view(),name='organization'),
    path('vote/<int:organization_id>/member/',MemberRegistration.as_view(),name='member'),
    path('vote/<int:member_id>/manifesto/',ManifestoView.as_view(),name='manifesto_member'),
    path('vote/<int:member_id>/vote/',vote,name='voted'),
    path('vote/<int:organization_id>/countings/',MembersVoteCountView.as_view(),name='counting'),
    path('vote/<int:organization_id>/discussion/',discussion_view,name='voters_discusssion'),
    path('vote/<int:organization_id>/get_discussion/',DiscussionView.as_view(),name='get_discussions'),
    path('vote/<int:organization_id>/voterlist/',upload_voter_list,name='upload_voter_list'),
    path('vote/<int:organization_id>/membersfile/',upload_members_list,name='members_list_upload'),
    path('vote/chatbot/',chatbot,name='chatbot'),

]
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)