from django.db import models

class HeroSlide(models.Model):
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255, blank=True)
    subtitle_en = models.TextField()
    subtitle_bn = models.TextField(blank=True)
    badge_en = models.CharField(max_length=100, default="Evidence-Led EdTech")
    badge_bn = models.CharField(max_length=100, blank=True, default="গবেষণা-ভিত্তিক এডুটেক")
    
    cta_primary_text_en = models.CharField(max_length=100, default="Explore Solutions")
    cta_primary_text_bn = models.CharField(max_length=100, blank=True, default="আমাদের সেবাসমূহ")
    cta_primary_link = models.CharField(max_length=200, default="#solutions")
    
    cta_secondary_text_en = models.CharField(max_length=100, default="Partner With Us")
    cta_secondary_text_bn = models.CharField(max_length=100, blank=True, default="অংশীদার হোন")
    cta_secondary_link = models.CharField(max_length=200, default="#partnership")
    
    stat_number = models.CharField(max_length=50, blank=True, default="100%")
    stat_label_en = models.CharField(max_length=100, blank=True, default="Classroom-Grounded Pedagogy")
    stat_label_bn = models.CharField(max_length=100, blank=True, default="শ্রেণিকক্ষ-ভিত্তিক শিক্ষণপদ্ধতি")
    
    theme_gradient = models.CharField(
        max_length=50, 
        choices=(
            ('blue', 'Ocean Blue'),
            ('emerald', 'Emerald Green'),
            ('cyan', 'Tech Cyan'),
            ('indigo', 'Academic Indigo')
        ),
        default='blue'
    )
    image_url = models.URLField(max_length=500, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return f"Slide #{self.order}: {self.title_en[:40]}"


class FocusArea(models.Model):
    key_code = models.CharField(max_length=50, unique=True)
    title_en = models.CharField(max_length=200)
    title_bn = models.CharField(max_length=200, blank=True)
    tagline_en = models.CharField(max_length=300)
    tagline_bn = models.CharField(max_length=300, blank=True)
    description_en = models.TextField()
    description_bn = models.TextField(blank=True)
    
    deliverables_en = models.TextField(help_text="Bullet points or newline separated list")
    deliverables_bn = models.TextField(blank=True)
    beneficiaries_en = models.CharField(max_length=255)
    beneficiaries_bn = models.CharField(max_length=255, blank=True)
    
    icon_name = models.CharField(max_length=50, default="School")
    accent_color = models.CharField(max_length=30, default="#0D3B75")
    order = models.PositiveIntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_en


class PlatformShowcase(models.Model):
    title_en = models.CharField(max_length=200)
    title_bn = models.CharField(max_length=200, blank=True)
    category = models.CharField(max_length=100)
    summary_en = models.TextField()
    summary_bn = models.TextField(blank=True)
    features_en = models.TextField(help_text="Newline separated list of features")
    features_bn = models.TextField(blank=True)
    tech_stack = models.CharField(max_length=200, default="Moodle LMS, React, Python/AI, PostgreSQL")
    demo_type = models.CharField(
        max_length=50,
        choices=(
            ('lms', 'LMS & Course Delivery'),
            ('assessment', 'Assessment & Item Banking'),
            ('ai_nlp', 'Bangla Speech-to-Text & AI'),
            ('gamified', 'Interactive Learning Modules')
        ),
        default='lms'
    )
    status_badge = models.CharField(max_length=50, default="Pilot Ready")
    order = models.PositiveIntegerField(default=0)
    is_featured = models.BooleanField(default=True)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.title_en


class ResearchPublication(models.Model):
    title_en = models.CharField(max_length=255)
    title_bn = models.CharField(max_length=255, blank=True)
    publication_type = models.CharField(
        max_length=50,
        choices=(
            ('policy_brief', 'Policy Brief'),
            ('pilot_report', 'Pilot Evaluation'),
            ('white_paper', 'White Paper'),
            ('practice_note', 'Practice Guide')
        ),
        default='policy_brief'
    )
    abstract_en = models.TextField()
    abstract_bn = models.TextField(blank=True)
    author = models.CharField(max_length=200, default="CEDR Research Team")
    date_published = models.CharField(max_length=50, default="October 2026")
    tags = models.CharField(max_length=200, default="EdTech, Pedagogy, Bangladesh")
    download_url = models.CharField(max_length=500, blank=True, default="#")
    is_published = models.BooleanField(default=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order', '-id']

    def __str__(self):
        return self.title_en


class TeamMember(models.Model):
    name_en = models.CharField(max_length=150)
    name_bn = models.CharField(max_length=150, blank=True)
    role_en = models.CharField(max_length=150)
    role_bn = models.CharField(max_length=150, blank=True)
    portfolio_en = models.CharField(max_length=150)
    portfolio_bn = models.CharField(max_length=150, blank=True)
    bio_en = models.TextField()
    bio_bn = models.TextField(blank=True)
    credentials_en = models.TextField(help_text="Bullet points or newline separated highlights")
    credentials_bn = models.TextField(blank=True)
    photo_url = models.CharField(max_length=500, blank=True, null=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return self.name_en


class RoadmapPhase(models.Model):
    phase_number = models.PositiveIntegerField()
    phase_title_en = models.CharField(max_length=100)
    phase_title_bn = models.CharField(max_length=100, blank=True)
    timeline_en = models.CharField(max_length=100)
    timeline_bn = models.CharField(max_length=100, blank=True)
    status = models.CharField(
        max_length=50,
        choices=(
            ('active', 'Current / In Progress'),
            ('upcoming', 'Upcoming / Planned'),
            ('completed', 'Completed')
        ),
        default='upcoming'
    )
    milestones_en = models.TextField(help_text="Newline separated milestones")
    milestones_bn = models.TextField(blank=True)
    order = models.PositiveIntegerField(default=0)

    class Meta:
        ordering = ['order']

    def __str__(self):
        return f"Phase {self.phase_number}: {self.phase_title_en}"


class PartnershipInquiry(models.Model):
    STATUS_CHOICES = (
        ('new', 'New'),
        ('in_review', 'In Review'),
        ('contacted', 'Contacted / Scheduled'),
        ('partnered', 'Partnered / Closed'),
    )

    PARTNER_TYPE_CHOICES = (
        ('schools', 'Schools & School Networks'),
        ('universities', 'Teacher-Training Institutes & Universities'),
        ('ngos', 'NGOs, Development Agencies & Donors'),
        ('government', 'Government Education Agencies (NCTB, DPE)'),
        ('edtech', 'EdTech Firms & Content Publishers'),
        ('csr', 'Corporates & Foundations (CSR)'),
        ('investor', 'Startup Sandbox / Investor'),
        ('other', 'Other Collaboration'),
    )

    name = models.CharField(max_length=150)
    organization = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=50, blank=True)
    partner_type = models.CharField(max_length=50, choices=PARTNER_TYPE_CHOICES, default='schools')
    interests = models.CharField(max_length=255, blank=True)
    message = models.TextField()
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='new')
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.organization} ({self.status})"


class SiteSetting(models.Model):
    org_name_en = models.CharField(max_length=200, default="Center for EduTech Development and Research")
    org_name_bn = models.CharField(max_length=200, default="সেন্টার ফর এডুটেক ডেভেলপমেন্ট অ্যান্ড রিসার্চ")
    tagline_en = models.CharField(max_length=300, default="Teacher capacity | Assessment tools and platforms | EduTech research")
    tagline_bn = models.CharField(max_length=300, default="শিক্ষক সক্ষমতা বৃদ্ধি | মূল্যায়ন টুল ও প্ল্যাটফর্ম | এডুটেক গবেষণা")
    
    vision_en = models.TextField(default="A Bangladesh where every teacher is digitally confident and every learner benefits from evidence-based, technology-enabled education.")
    vision_bn = models.TextField(default="এমন একটি বাংলাদেশ যেখানে প্রতিটি শিক্ষক ডিজিটালভাবে আত্মবিশ্বাসী এবং প্রতিটি শিক্ষার্থী প্রমাণ-ভিত্তিক, প্রযুক্তি-সমর্থিত শিক্ষার সুফল পায়।")
    
    mission_en = models.TextField(default="To build teacher capacity, develop practical EduTech tools and platforms, and generate research that improves how people teach, learn and are assessed.")
    mission_bn = models.TextField(default="শিক্ষকদের সক্ষমতা বৃদ্ধি, ব্যবহারোপযোগী এডুটেক টুল ও প্ল্যাটফর্ম তৈরি করা এবং মানুষ কীভাবে শেখায়, শেখে ও মূল্যায়িত হয় তা উন্নয়নে গবেষণা পরিচালনা করা।")

    address_en = models.CharField(max_length=255, default="Dhaka, Bangladesh")
    address_bn = models.CharField(max_length=255, default="ঢাকা, বাংলাদেশ")
    email = models.EmailField(default="contact@cedrbd.org")
    phone = models.CharField(max_length=50, default="+880 1700-000000")

    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.org_name_en
