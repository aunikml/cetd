from rest_framework import viewsets, permissions, status
from rest_framework.response import Response
from .models import (
    HeroSlide, FocusArea, PlatformShowcase, ResearchPublication,
    TeamMember, RoadmapPhase, PartnershipInquiry, SiteSetting
)
from .serializers import (
    HeroSlideSerializer, FocusAreaSerializer, PlatformShowcaseSerializer,
    ResearchPublicationSerializer, TeamMemberSerializer, RoadmapPhaseSerializer,
    PartnershipInquirySerializer, SiteSettingSerializer
)
from accounts.permissions import (
    IsContentManagerOrReadOnly, IsPlatformEditorOrReadOnly,
    IsResearchEditorOrReadOnly, CanManageInquiries, IsSuperAdmin
)

class HeroSlideViewSet(viewsets.ModelViewSet):
    queryset = HeroSlide.objects.all().order_by('order', '-id')
    serializer_class = HeroSlideSerializer
    permission_classes = [IsContentManagerOrReadOnly]

    def get_queryset(self):
        # Public gets active slides, authenticated editors see all
        if self.request.user.is_authenticated and self.request.user.can_edit_cms():
            return HeroSlide.objects.all().order_by('order', '-id')
        return HeroSlide.objects.filter(is_active=True).order_by('order', '-id')


class FocusAreaViewSet(viewsets.ModelViewSet):
    queryset = FocusArea.objects.all().order_by('order')
    serializer_class = FocusAreaSerializer
    permission_classes = [IsContentManagerOrReadOnly]


class PlatformShowcaseViewSet(viewsets.ModelViewSet):
    queryset = PlatformShowcase.objects.all().order_by('order')
    serializer_class = PlatformShowcaseSerializer
    permission_classes = [IsPlatformEditorOrReadOnly]


class ResearchPublicationViewSet(viewsets.ModelViewSet):
    queryset = ResearchPublication.objects.all().order_by('order', '-id')
    serializer_class = ResearchPublicationSerializer
    permission_classes = [IsResearchEditorOrReadOnly]

    def get_queryset(self):
        if self.request.user.is_authenticated and self.request.user.can_edit_cms():
            return ResearchPublication.objects.all().order_by('order', '-id')
        return ResearchPublication.objects.filter(is_published=True).order_by('order', '-id')


class TeamMemberViewSet(viewsets.ModelViewSet):
    queryset = TeamMember.objects.all().order_by('order')
    serializer_class = TeamMemberSerializer
    permission_classes = [IsContentManagerOrReadOnly]


class RoadmapPhaseViewSet(viewsets.ModelViewSet):
    queryset = RoadmapPhase.objects.all().order_by('order')
    serializer_class = RoadmapPhaseSerializer
    permission_classes = [IsContentManagerOrReadOnly]


class PartnershipInquiryViewSet(viewsets.ModelViewSet):
    queryset = PartnershipInquiry.objects.all().order_by('-created_at')
    serializer_class = PartnershipInquirySerializer
    permission_classes = [CanManageInquiries]


class SiteSettingViewSet(viewsets.ModelViewSet):
    queryset = SiteSetting.objects.all()
    serializer_class = SiteSettingSerializer
    permission_classes = [IsContentManagerOrReadOnly]

    def get_object(self):
        obj, created = SiteSetting.objects.get_or_create(id=1)
        return obj
