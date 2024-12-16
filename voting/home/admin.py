from django.contrib import admin
from unfold.admin import ModelAdmin
from .models import AppUser,Organization,Members,MembersManifestos,VoterList,MembersVote

from import_export.admin import ImportExportModelAdmin
from unfold.contrib.import_export.forms import ExportForm, ImportForm, SelectableFieldsExportForm

@admin.register(Members)
class ExampleAdmin(ModelAdmin, ImportExportModelAdmin):
    import_form_class = ImportForm
    export_form_class = ExportForm
@admin.register(AppUser)
class CustomAdminClass(ModelAdmin):
#     import_form_class = ImportForm
#     export_form_class = ExportForm
    pass
@admin.register(MembersManifestos)
class MembersManifesto(ModelAdmin,ImportExportModelAdmin):
    import_form_class=ImportForm
    export_form_class=ExportForm

@admin.register(VoterList)
class VoterListAdmin(ModelAdmin,ImportExportModelAdmin):
    import_form_class=ImportForm
    export_form_class=ExportForm

@admin.register(MembersVote)
class MembersVoteAdmin(ModelAdmin):
    pass

@admin.register(Organization)
class OrganizationAdmin(ModelAdmin):
    pass