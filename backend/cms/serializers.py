from rest_framework import serializers
from .models import (
    HeroSlide, FocusArea, PlatformShowcase, ResearchPublication,
    TeamMember, RoadmapPhase, PartnershipInquiry, SiteSetting
)

class HeroSlideSerializer(serializers.ModelSerializer):
    class Meta:
        model = HeroSlide
        fields = '__all__'


class FocusAreaSerializer(serializers.ModelSerializer):
    class Meta:
        model = FocusArea
        fields = '__all__'


class PlatformShowcaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = PlatformShowcase
        fields = '__all__'


class ResearchPublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = ResearchPublication
        fields = '__all__'


class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        fields = '__all__'


class RoadmapPhaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoadmapPhase
        fields = '__all__'


class PartnershipInquirySerializer(serializers.ModelSerializer):
    class Meta:
        model = PartnershipInquiry
        fields = '__all__'
        read_only_fields = ['id', 'created_at']


class SiteSettingSerializer(serializers.ModelSerializer):
    class Meta:
        model = SiteSetting
        fields = '__all__'
