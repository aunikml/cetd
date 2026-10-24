from django.contrib import admin
from .models import (
    HeroSlide, FocusArea, PlatformShowcase, ResearchPublication,
    TeamMember, RoadmapPhase, PartnershipInquiry, SiteSetting
)

@admin.register(HeroSlide)
class HeroSlideAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'theme_gradient', 'order', 'is_active', 'updated_at')
    list_editable = ('order', 'is_active')
    search_fields = ('title_en', 'title_bn', 'subtitle_en')

@admin.register(FocusArea)
class FocusAreaAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'key_code', 'order', 'is_active')
    list_editable = ('order', 'is_active')
    search_fields = ('title_en', 'key_code')

@admin.register(PlatformShowcase)
class PlatformShowcaseAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'category', 'demo_type', 'status_badge', 'order', 'is_featured')
    list_editable = ('order', 'is_featured')
    search_fields = ('title_en', 'category', 'tech_stack')

@admin.register(ResearchPublication)
class ResearchPublicationAdmin(admin.ModelAdmin):
    list_display = ('title_en', 'publication_type', 'author', 'date_published', 'is_published')
    list_editable = ('is_published',)
    search_fields = ('title_en', 'tags', 'author')

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ('name_en', 'role_en', 'portfolio_en', 'order')
    list_editable = ('order',)
    search_fields = ('name_en', 'role_en')

@admin.register(RoadmapPhase)
class RoadmapPhaseAdmin(admin.ModelAdmin):
    list_display = ('phase_number', 'phase_title_en', 'timeline_en', 'status', 'order')
    list_editable = ('status', 'order')

@admin.register(PartnershipInquiry)
class PartnershipInquiryAdmin(admin.ModelAdmin):
    list_display = ('name', 'organization', 'email', 'partner_type', 'status', 'created_at')
    list_filter = ('partner_type', 'status', 'created_at')
    search_fields = ('name', 'organization', 'email', 'message')

@admin.register(SiteSetting)
class SiteSettingAdmin(admin.ModelAdmin):
    list_display = ('org_name_en', 'email', 'phone', 'updated_at')
