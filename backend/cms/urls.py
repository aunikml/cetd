from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    HeroSlideViewSet, FocusAreaViewSet, PlatformShowcaseViewSet,
    ResearchPublicationViewSet, TeamMemberViewSet, RoadmapPhaseViewSet,
    PartnershipInquiryViewSet, SiteSettingViewSet
)

router = DefaultRouter()
router.register(r'hero-slides', HeroSlideViewSet, basename='hero-slide')
router.register(r'focus-areas', FocusAreaViewSet, basename='focus-area')
router.register(r'platforms', PlatformShowcaseViewSet, basename='platform')
router.register(r'research', ResearchPublicationViewSet, basename='research')
router.register(r'team', TeamMemberViewSet, basename='team')
router.register(r'roadmap', RoadmapPhaseViewSet, basename='roadmap')
router.register(r'inquiries', PartnershipInquiryViewSet, basename='inquiry')
router.register(r'settings', SiteSettingViewSet, basename='settings')

urlpatterns = [
    path('', include(router.urls)),
]
