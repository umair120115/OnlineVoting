from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser
from django.core.exceptions import ValidationError
from django.core .validators import RegexValidator

# Create your models here.
# Age validator
def age_validator(value):
    if value < 18:
        raise ValidationError('Not eligible to vote')
class AppUserManager(BaseUserManager):
    def create_user(self,email,password=None,**extra_fields):
        if not email:
            raise ValueError('Email is required')
        if not password:
            raise ValueError('Password is required')
        email=self.normalize_email(email)
        extra_fields.setdefault('is_active',True)
        user=self.model(email=email,**extra_fields)
        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self,email,password=None,**extra_fields):
        extra_fields.setdefault('is_staff',True)
        extra_fields.setdefault('is_superuser',True)
        return self.create_user(email,password,**extra_fields)
        
class AppUser(AbstractBaseUser):
    name=models.CharField(max_length=50)
    age=models.IntegerField(validators=[age_validator])
    phone = models.CharField(
        max_length=15, 
        unique=True, 
        validators=[RegexValidator(regex=r'^\+?\d{10,15}$', message="Enter a valid phone number.")]
    )
    email=models.EmailField(unique=True)
    nationality=models.CharField(max_length=50)
    address=models.TextField()
    photo=models.ImageField(upload_to='profile/')
    is_active=models.BooleanField(default=False)
    is_staff=models.BooleanField(default=False)
    is_superuser=models.BooleanField(default=False)

    USERNAME_FIELD='email'
    REQUIRED_FIELDS=['name','age','phone','password','photo']

    objects = AppUserManager()

    def __str__(self):
        return self.name

    def has_module_perms(self, app_label):
        return True

    def has_perm(self, perm, obj=None):
        return True
    

class Organization(models.Model):
    organization_name=models.CharField(max_length=200)
    purpose=models.CharField(max_length=200)
    date=models.DateField()
    Organizer_name=models.ForeignKey(AppUser,on_delete=models.CASCADE,related_name='users')
    organizer_post=models.CharField(max_length=150)
    description=models.TextField()
    def __str__(self):
        return self.organization_name

class Members(models.Model):
    Organization=models.ForeignKey(Organization, on_delete=models.CASCADE,related_name='organization')
    name=models.CharField(max_length=100)
    age=models.IntegerField()
    email=models.EmailField()
    
    

    def __str__(self):
        return self.name
    

    


class MembersManifestos(models.Model):
    photo=models.ImageField(upload_to='profilemem/')
    member=models.ForeignKey(Members,on_delete=models.CASCADE,related_name='member_manifesto')
    manifesto=models.FileField(upload_to='manifestos/')

class VoterList(models.Model):
    Organization=models.ForeignKey(Organization,on_delete=models.CASCADE,related_name='voter_list')
    name=models.CharField(max_length=100)
    email=models.EmailField()
    voted=models.BooleanField(default=False)
    def __str__(self):
        return self.name
    
class MembersVote(models.Model):
    organization=models.ForeignKey(Organization,on_delete=models.CASCADE,related_name='related_organization')
    member=models.ForeignKey(Members,on_delete=models.CASCADE,related_name='member_vote')
    votes=models.ManyToManyField(VoterList,related_name='votes',blank=True)


