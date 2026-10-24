import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'cedr_backend.settings')
django.setup()

from accounts.models import User
from cms.models import (
    HeroSlide, FocusArea, PlatformShowcase, ResearchPublication,
    TeamMember, RoadmapPhase, PartnershipInquiry, SiteSetting
)

def seed():
    print("Seeding Users...")
    users_data = [
        ('admin', 'admin@cedrbd.org', 'admin123', 'super_admin', 'Dr. System', 'Admin', '+880 1711-000001', 'Chief Administrator', True, True),
        ('content_manager', 'editor@cedrbd.org', 'manager123', 'content_manager', 'Kader', 'Faruki', '+880 1711-000002', 'Senior Content Lead', True, False),
        ('platform_editor', 'tech@cedrbd.org', 'editor123', 'platform_editor', 'Hamim', 'Ahsan', '+880 1711-000003', 'EdTech Platform Lead', True, False),
        ('research_editor', 'research@cedrbd.org', 'research123', 'research_editor', 'Badrul', 'Alam', '+880 1711-000004', 'Research Coordinator', True, False),
    ]

    for username, email, pwd, role, fname, lname, phone, title, is_staff, is_super in users_data:
        user, created = User.objects.get_or_create(username=username, defaults={
            'email': email,
            'role': role,
            'first_name': fname,
            'last_name': lname,
            'phone': phone,
            'title': title,
            'is_staff': is_staff,
            'is_superuser': is_super
        })
        if created:
            user.set_password(pwd)
            user.save()
            print(f"Created user: {username} ({role})")
        else:
            user.role = role
            user.set_password(pwd)
            user.save()
            print(f"Updated user: {username} ({role})")

    print("\nSeeding Site Settings...")
    SiteSetting.objects.update_or_create(
        id=1,
        defaults={
            'org_name_en': "Center for EduTech Development and Research (CEDR)",
            'org_name_bn': "সেন্টার ফর এডুটেক ডেভেলপমেন্ট অ্যান্ড রিসার্চ (সিইডিআর)",
            'tagline_en': "Teacher Capacity | Assessment Tools & Platforms | EduTech Research",
            'tagline_bn': "শিক্ষক সক্ষমতা বৃদ্ধি | মূল্যায়ন টুল ও প্ল্যাটফর্ম | এডুটেক গবেষণা",
            'vision_en': "A Bangladesh where every teacher is digitally confident and every learner benefits from evidence-based, technology-enabled education.",
            'vision_bn': "এমন একটি বাংলাদেশ যেখানে প্রতিটি শিক্ষক ডিজিটালভাবে আত্মবিশ্বাসী এবং প্রতিটি শিক্ষার্থী প্রমাণ-ভিত্তিক, প্রযুক্তি-সমর্থিত শিক্ষার সুফল পায়।",
            'mission_en': "To build teacher capacity, develop practical EduTech tools and platforms, and generate research that improves how people teach, learn and are assessed.",
            'mission_bn': "শিক্ষকদের সক্ষমতা বৃদ্ধি, ব্যবহারোপযোগী এডুটেক টুল ও প্ল্যাটফর্ম তৈরি করা এবং মানুষ কীভাবে শেখায়, শেখে ও মূল্যায়িত হয় তা উন্নয়নে গবেষণা পরিচালনা করা।",
            'address_en': "Dhaka, Bangladesh",
            'address_bn': "ঢাকা, বাংলাদেশ",
            'email': "info@cedrbd.org",
            'phone': "+880 1700-000000"
        }
    )

    print("\nSeeding Hero Slides...")
    HeroSlide.objects.all().delete()
    slides = [
        {
            'title_en': "Empowering Educators, Engineering Platforms, Grounded in Research",
            'title_bn': "শিক্ষক সক্ষমতা বৃদ্ধি, আধুনিক লার্নিং প্ল্যাটফর্ম এবং বাস্তবমুখী গবেষণা",
            'subtitle_en': "The Center works where pedagogy and technology meet: training teachers, building robust assessment tools and online platforms that support them, and researching what works.",
            'subtitle_bn': "যেখানে শিক্ষণপদ্ধতি ও প্রযুক্তির মেলবন্ধন: শিক্ষকদের প্রশিক্ষণ, মূল্যায়নের উপযোগী টুল ও অনলাইন প্ল্যাটফর্ম নির্মাণ এবং কার্যকর শিক্ষাব্যবস্থার বাস্তবমুখী গবেষণা।",
            'badge_en': "PRACTITIONER-FOUNDED EDTECH",
            'badge_bn': "অভিজ্ঞ শিক্ষাবিদ ও প্রযুক্তিবিদদের উদ্যোগে প্রতিষ্ঠিত",
            'cta_primary_text_en': "Explore Our Solutions",
            'cta_primary_text_bn': "আমাদের সেবাসমূহ",
            'cta_primary_link': "#solutions",
            'cta_secondary_text_en': "Partner With Us",
            'cta_secondary_text_bn': "অংশীদার হোন",
            'cta_secondary_link': "#partnership",
            'stat_number': "100%",
            'stat_label_en': "Classroom & Curriculum Grounded",
            'stat_label_bn': "জাতীয় শিক্ষাক্রম ও শ্রেণিকক্ষ উপযোগী",
            'theme_gradient': "blue",
            'order': 1,
            'is_active': True,
        },
        {
            'title_en': "Scalable Assessment Tools & VLE Learning Platforms",
            'title_bn': "উন্নত মূল্যায়ন টুল এবং আধুনিক ভার্চুয়াল লার্নিং এনভায়রনমেন্ট",
            'subtitle_en': "Deploying Moodle & Canvas-grade delivery platforms with complete Bangla and English bilingual support, automated item banks, secure testing, and deep learning analytics.",
            'subtitle_bn': "মুডল ও ক্যানভাস সমমানের প্ল্যাটফর্ম, বাংলা ও ইংরেজি দ্বিভাষিক ইন্টারফেস, স্বয়ংক্রিয় প্রশ্নভাণ্ডার এবং ডাটা-চালিত শিখন অ্যানালিটিক্স।",
            'badge_en': "NEXT-GEN PLATFORMS",
            'badge_bn': "পরবর্তী প্রজন্মের প্ল্যাটফর্ম",
            'cta_primary_text_en': "Interactive Platform Demo",
            'cta_primary_text_bn': "প্ল্যাটফর্ম ডেমো দেখুন",
            'cta_primary_link': "#platforms",
            'cta_secondary_text_en': "Technical Capabilities",
            'cta_secondary_text_bn': "কারিগরি সক্ষমতা",
            'cta_secondary_link': "#approach",
            'stat_number': "Bilingual",
            'stat_label_en': "Bangla & English Ready",
            'stat_label_bn': "বাংলা ও ইংরেজি উভয়ে কার্যকর",
            'theme_gradient': "emerald",
            'order': 2,
            'is_active': True,
        },
        {
            'title_en': "Pioneering AI & NLP Innovations for Inclusive Education",
            'title_bn': "অন্তর্ভুক্তিমূলক শিক্ষার জন্য এআই ও এনএলপি প্রযুক্তির উদ্ভাবন",
            'subtitle_en': "Integrating Bengali speech-to-text transcription, interactive gamified modules, and adaptive learning algorithms to bridge educational equity across Bangladesh.",
            'subtitle_bn': "বাংলা স্পিচ-টু-টেক্সট রূপান্তর, ইন্টারঅ্যাক্টিভ গেমিফাইড পাঠ এবং অভিযোজিত শিখন অ্যালগরিদমের মাধ্যমে সর্বস্তরে মানসম্মত শিক্ষা নিশ্চিতকরণ।",
            'badge_en': "AI & RESEARCH INNOVATION",
            'badge_bn': "এআই ও গবেষণা উদ্ভাবন",
            'cta_primary_text_en': "View Research & Innovations",
            'cta_primary_text_bn': "গবেষণা ও উদ্ভাবন",
            'cta_primary_link': "#research",
            'cta_secondary_text_en': "Download Policy Briefs",
            'cta_secondary_text_bn': "পলিসি ব্রিফ সংগ্রহ",
            'cta_secondary_link': "#research",
            'stat_number': "4-Step",
            'stat_label_en': "Design • Pilot • Evaluate • Scale",
            'stat_label_bn': "পরিকল্পনা • পাইলট • মূল্যায়ন • বিস্তার",
            'theme_gradient': "cyan",
            'order': 3,
            'is_active': True,
        }
    ]
    for s in slides:
        HeroSlide.objects.create(**s)

    print("\nSeeding Focus Areas...")
    FocusArea.objects.all().delete()
    focus_areas = [
        {
            'key_code': "teacher_capacity",
            'title_en': "1. Teacher & Educator Capacity",
            'title_bn': "১. শিক্ষক ও শিক্ষাবিদদের সক্ষমতা বৃদ্ধি",
            'tagline_en': "Transforming classroom practice through digital pedagogy and AI ethics.",
            'tagline_bn': "ডিজিটাল শিক্ষণপদ্ধতি ও এআই ব্যবহারের মাধ্যমে শ্রেণিকক্ষের পাঠদান রূপান্তর।",
            'description_en': "Courses and certificate programmes in educational technology for teachers and aspiring teachers: digital pedagogy, instructional design, online and blended teaching, assessment literacy, and responsible use of AI in the classroom. Delivered online, blended, and in person.",
            'description_bn': "শিক্ষক ও প্রশিক্ষণার্থী শিক্ষকদের জন্য এডুকেশনাল টেকনোলজি ও সার্টিফিকেট কোর্স: ডিজিটাল শিক্ষণবিজ্ঞান, নির্দেশনামূলক নকশা, অনলাইন ও ব্লেন্ডেড শিক্ষাদান, মূল্যায়ন সাক্ষরতা এবং শ্রেণিকক্ষে এআই-এর দায়িত্বশীল ব্যবহার।",
            'deliverables_en': "• Certificate programmes in Digital Pedagogy\n• Instructional Design & Blended Teaching Workshops\n• Assessment Literacy & Rubrics Mastery\n• Responsible AI Tools in Bangladeshi Classrooms",
            'deliverables_bn': "• ডিজিটাল পেডাগোজিতে সার্টিফিকেট কোর্স\n• ইনস্ট্রাকশনাল ডিজাইন ও ব্লেন্ডেড টিচিং কর্মশালা\n• মূল্যায়ন সাক্ষরতা ও রুব্রিক্স প্রণয়ন প্রশিক্ষণ\n• শ্রেণিকক্ষে এআই টুলের দায়িত্বশীল ব্যবহার",
            'beneficiaries_en': "Schools, Teacher-Training Institutes, Universities, NGOs",
            'beneficiaries_bn': "বিদ্যালয়, শিক্ষক প্রশিক্ষণ ইনস্টিটিউট, বিশ্ববিদ্যালয়, এনজিও",
            'icon_name': "School",
            'accent_color': "#0D3B75",
            'order': 1,
            'is_active': True,
        },
        {
            'key_code': "assessment_platforms",
            'title_en': "2. Assessment Tools & Delivery Platforms",
            'title_bn': "২. মূল্যায়ন টুল ও ডেলিভারি প্ল্যাটফর্ম",
            'tagline_en': "Custom learning environments and reliable testing systems built for scale.",
            'tagline_bn': "ব্যাপক ব্যবহারের উপযোগী কাস্টম লার্নিং প্ল্যাটফর্ম ও নির্ভরযোগ্য পরীক্ষা ব্যবস্থা।",
            'description_en': "Technology tools for educational assessment (online tests, item banks, analytics, feedback) and online platforms for course delivery, built on proven learning-management systems (Moodle/Canvas architecture) with full Bangla and English support.",
            'description_bn': "শিক্ষাগত মূল্যায়নের প্রযুক্তিগত টুল (অনলাইন পরীক্ষা, আইটেম ব্যাংক, অ্যানালিটিক্স, ফিডব্যাক) এবং কোর্স ডেলিভারির জন্য প্রমাণিত লার্নিং ম্যানেজমেন্ট সিস্টেম (মুডল/ক্যানভাস আর্কিটেকচার) যার সাথে রয়েছে পূর্ণাঙ্গ বাংলা ও ইংরেজি সমর্থন।",
            'deliverables_en': "• Custom Moodle/Canvas LMS Deployment & Optimization\n• Automated Question Item Banks & Test Generators\n• Real-Time Student Learning Analytics Dashboards\n• Low-Bandwidth Mobile-Optimized Learning Portals",
            'deliverables_bn': "• মুডল ও ক্যানভাস এলএমএস সেটআপ ও অপ্টিমাইজেশন\n• স্বয়ংক্রিয় প্রশ্নভাণ্ডার ও পরীক্ষা জেনারেটর\n• রিয়েল-টাইম শিক্ষার্থী শিখন অগ্রগতি ড্যাশবোর্ড\n• কম ব্যান্ডউইথে ব্যবহারযোগ্য মোবাইল লার্নিং পোর্টাল",
            'beneficiaries_en': "Education Institutions, Training Providers, Education Programmes",
            'beneficiaries_bn': "শিক্ষা প্রতিষ্ঠান, প্রশিক্ষণ প্রদানকারী সংস্থা, শিক্ষা কর্মসূচি",
            'icon_name': "Computer",
            'accent_color': "#10B981",
            'order': 2,
            'is_active': True,
        },
        {
            'key_code': "research_innovation",
            'title_en': "3. Research & Innovation",
            'title_bn': "৩. গবেষণা ও উদ্ভাবনী উদ্যোগ",
            'tagline_en': "Generating rigorous evidence on what works in classroom learning technology.",
            'tagline_bn': "শ্রেণিকক্ষে প্রযুক্তির সঠিক প্রয়োগ ও কার্যকারিতা নিয়ে প্রামাণ্য গবেষণা।",
            'description_en': "Applied research on teaching, learning, and technology use; rigorous pilots and evaluations; prototypes of new learning tools; and high-impact policy and practice briefs that inform nationwide educational decisions.",
            'description_bn': "শিক্ষণ, শিখন ও প্রযুক্তি ব্যবহারের ওপর ফলিত গবেষণা; ক্লাসরুম পাইলট ও মূল্যায়ন; নতুন লার্নিং টুলের প্রোটোটাইপিং; এবং নীতিনির্ধারকদের জন্য হাই-ইমপ্যাক্ট পলিসি ও প্র্যাকটিস ব্রিফ।",
            'deliverables_en': "• Independent Evaluation of EdTech Interventions\n• Bengali & English Speech-to-Text Transcription for Classrooms\n• Interactive Gamified Learning Module Prototypes\n• National Curriculum (NCTB) Alignment Studies",
            'deliverables_bn': "• এডুটেক ও শিক্ষক প্রশিক্ষণ কর্মসূচির স্বাধীন মূল্যায়ন\n• শ্রেণিকক্ষের জন্য বাংলা ও ইংরেজি স্পিচ-টু-টেক্সট রূপান্তর\n• ইন্টারঅ্যাক্টিভ গেমিফাইড শিখন মডিউল প্রোটোটাইপ\n• জাতীয় শিক্ষাক্রম (এনসিটিবি) সামঞ্জস্য গবেষণা",
            'beneficiaries_en': "Policy-Makers, Donors, Institutions, Wider Education Community",
            'beneficiaries_bn': "নীতি-নির্ধারক, দাতা সংস্থা, শিক্ষা প্রতিষ্ঠান ও বিশেষজ্ঞ সম্প্রদায়",
            'icon_name': "Psychology",
            'accent_color': "#0284C7",
            'order': 3,
            'is_active': True,
        }
    ]
    for fa in focus_areas:
        FocusArea.objects.create(**fa)

    print("\nSeeding Platform Showcases...")
    PlatformShowcase.objects.all().delete()
    platforms = [
        {
            'title_en': "CEDR Virtual Learning Environment (VLE)",
            'title_bn': "সিইডিআর ভার্চুয়াল লার্নিং এনভায়রনমেন্ট (ভিএলই)",
            'category': "LMS & Course Delivery",
            'summary_en': "High-performance, customizable learning platform built on modern LMS architecture. Fully localized for Bengali & English, supports asynchronous video, graded forums, live sessions, and progress tracking.",
            'summary_bn': "উচ্চ কর্মক্ষমতাসম্পন্ন এবং আধুনিক এলএমএস আর্কিটেকচারে তৈরি লার্নিং প্ল্যাটফর্ম। সম্পূর্ণ বাংলা ও ইংরেজি সমর্থন, ভিডিও পাঠ, ফোরাম ও লাইভ সেশনের সমন্বয়।",
            'features_en': "Bilingual interface (Bangla/English)\nMicro-credential badge issuing\nMobile responsive & low-data mode\nAttendance & completion tracking",
            'features_bn': "দ্বিভাষিক ইন্টারফেস (বাংলা/ইংরেজি)\nডিজিটাল সার্টিফিকেট ও ব্যাজ প্রদান\nমোবাইল রেসপন্সিভ ও কম ডেটা মোড\nউপস্থিতি ও অগ্রগতি ট্র্যাকিং",
            'tech_stack': "Moodle Core, React, Bootstrap, PostgreSQL, Docker",
            'demo_type': "lms",
            'status_badge': "Production Ready",
            'order': 1,
            'is_featured': True
        },
        {
            'title_en': "Smart Assessment & Item Banking Engine",
            'title_bn': "স্মার্ট অ্যাসেসমেন্ট ও আইটেম ব্যাংকিং ইঞ্জিন",
            'category': "Assessment & Analytics",
            'summary_en': "Modular assessment tool supporting Bloom's Taxonomy question banks, randomized test creation, rubric-based automated grading, and instant performance analytics.",
            'summary_bn': "ব্লুমস ট্যাক্সোনমি অনুযায়ী প্রশ্নভাণ্ডার, র‍্যান্ডমাইজড পরীক্ষা তৈরি, রুব্রিক্স-ভিত্তিক মূল্যায়ন এবং তাৎক্ষণিক পারফরম্যান্স অ্যানালিটিক্স।",
            'features_en': "Item bank tagging with competency maps\nAnti-cheating randomized question order\nInstant diagnostic feedback for learners\nCohort learning analytics & charts",
            'features_bn': "যোগ্যতা ম্যাপিং সহ প্রশ্নভাণ্ডার ট্যাগিং\nপরীক্ষায় স্বচ্ছতা নিশ্চিতে র‍্যান্ডমাইজেশন\nশিক্ষার্থীদের জন্য তাৎক্ষণিক ফিডব্যাক\nব্যাচভিত্তিক শিখন অগ্রগতি চার্ট",
            'tech_stack': "Python/Django, React, Canvas LMS API, SQLite/PostgreSQL",
            'demo_type': "assessment",
            'status_badge': "Pilot Ready",
            'order': 2,
            'is_featured': True
        },
        {
            'title_en': "Bangla Voice-to-Text Classroom Transcriber",
            'title_bn': "বাংলা ভয়েস-টু-টেক্সট ক্লাসরুম ট্রান্সক্রাইবার",
            'category': "AI & NLP Innovations",
            'summary_en': "Pioneering natural language processing (NLP) model trained on Bangladeshi educational dialect to automatically generate lecture transcripts, lecture summaries, and closed captions.",
            'summary_bn': "বাংলাদেশি শিক্ষামূলক কণ্ঠস্বর ও আঞ্চলিক উচ্চারণে প্রশিক্ষিত এনএলপি মডেল, যা স্বয়ংক্রিয়ভাবে লেকচার প্রতিলিপি, সারাংশ ও সাবটাইটেল তৈরি করে।",
            'features_en': "Real-time speech recognition in Bangla\nAutomatic bilingual key term glossary generation\nAccessible learning for hearing impaired\nInteractive audio playback synced with text",
            'features_bn': "রিয়েল-টাইম বাংলা ভয়েস রূপান্তর\nস্বয়ংক্রিয় গুরুত্বপূর্ণ পরিভাষা তালিকা\nশ্রবণ প্রতিবন্ধীদের জন্য সহায়ক শিক্ষা\nঅডিওর সাথে সমন্বিত টেক্সট প্লেব্যাক",
            'tech_stack': "PyTorch, Whisper/Wav2Vec2, FastAPI, React Audio Web API",
            'demo_type': "ai_nlp",
            'status_badge': "Research Prototype",
            'order': 3,
            'is_featured': True
        },
        {
            'title_en': "Gamified Pedagogical Simulation Modules",
            'title_bn': "গেমিফাইড পেডাগজিক্যাল সিমুলেশন মডিউল",
            'category': "Interactive Multimedia",
            'summary_en': "Interactive, game-based learning units and scenario simulations designed for pre-primary, primary, and secondary school conceptual clarity in math, science, and languages.",
            'summary_bn': "প্রাক-প্রাথমিক, প্রাথমিক ও মাধ্যমিক শিক্ষার্থীদের গণিত, বিজ্ঞান ও ভাষার ধারণাগত স্পষ্টতার জন্য তৈরি ইন্টারঅ্যাক্টিভ গেম ও সিমুলেশন পাঠ।",
            'features_en': "Play-based learning mechanics\nScenario-driven critical thinking\nImmediate milestone rewards\nTeacher dashboard to track conceptual mastery",
            'features_bn': "আনন্দময় খেলার মাধ্যমে শিখন\nঘটনা-ভিত্তিক যৌক্তিক চিন্তা উন্নয়ন\nতাৎক্ষণিক মাইলস্টোন রিওয়ার্ড\nধারণাগত দক্ষতা পর্যবেক্ষণে শিক্ষক ড্যাশবোর্ড",
            'tech_stack': "HTML5 Canvas, React, Framer Motion, WebGL",
            'demo_type': "gamified",
            'status_badge': "Active Development",
            'order': 4,
            'is_featured': True
        }
    ]
    for p in platforms:
        PlatformShowcase.objects.create(**p)

    print("\nSeeding Research Publications...")
    ResearchPublication.objects.all().delete()
    publications = [
        {
            'title_en': "Digital Pedagogy in Primary Education: NCTB & PEDP-III Insights",
            'title_bn': "প্রাথমিক শিক্ষায় ডিজিটাল পেডাগোজি: এনসিটিবি ও পিইডিপি-৩ এর অভিজ্ঞতা",
            'publication_type': "policy_brief",
            'abstract_en': "A comprehensive review of head-teacher capacity building and digital lesson integration in Bangladeshi government primary schools, highlighting practical classroom constraints and high-impact interventions.",
            'abstract_bn': "বাংলাদেশি সরকারি প্রাথমিক বিদ্যালয়ে প্রধান শিক্ষকদের নেতৃত্ব প্রশিক্ষণ এবং ডিজিটাল পাঠের সংযোজনের একটি বিশদ পর্যালোচনা।",
            'author': "AKM Badrul Alam & CEDR Policy Unit",
            'date_published': "October 2026",
            'tags': "Primary Education, PEDP-III, NCTB, Digital Pedagogy",
            'download_url': "#",
            'is_published': True,
            'order': 1
        },
        {
            'title_en': "Evidence-Based Moodle Deployment for Higher Education in South Asia",
            'title_bn': "দক্ষিণ এশিয়ার উচ্চশিক্ষায় প্রমাণ-ভিত্তিক মুডল বাস্তবায়ন ও পরিচালনা",
            'publication_type': "white_paper",
            'abstract_en': "Analyzing institutional adoption barriers, faculty onboarding methodologies, and scalable server configurations for university-wide virtual learning environments.",
            'abstract_bn': "বিশ্ববিদ্যালয় পর্যায়ে ভার্চুয়াল লার্নিং প্ল্যাটফর্ম বাস্তবায়নে প্রাতিষ্ঠানিক চ্যালেঞ্জ এবং সমাধান নিয়ে প্রায়োগিক গবেষণা।",
            'author': "Hamim Al Ahsan & CEDR Platforms Team",
            'date_published': "September 2026",
            'tags': "Moodle, Higher Ed, Blended Learning, Infrastructure",
            'download_url': "#",
            'is_published': True,
            'order': 2
        },
        {
            'title_en': "Strategic Governance & EdTech Sandbox Framework for Bangladesh",
            'title_bn': "বাংলাদেশের জন্য কৌশলগত সুশাসন এবং এডুটেক স্যান্ডবক্স ফ্রেমওয়ার্ক",
            'publication_type': "policy_brief",
            'abstract_en': "Guidelines on ethics, data privacy, and public-private partnership models under Bangladesh's startup policy framework to support sustainable educational technology innovation.",
            'abstract_bn': "টেকসই শিক্ষা প্রযুক্তি উদ্ভাবনে নীতিগত সহায়তা, তথ্য সুরক্ষা এবং সরকারি-বেসরকারি অংশীদারিত্ব মডেলের দিকনির্দেশনা।",
            'author': "Md Ershadul Kader Faruki",
            'date_published': "August 2026",
            'tags': "Startup Sandbox, Public Policy, Governance, Data Ethics",
            'download_url': "#",
            'is_published': True,
            'order': 3
        },
        {
            'title_en': "Play-Based Curriculum & Early Childhood Learning Outcomes",
            'title_bn': "খেলাভিত্তিক শিক্ষাক্রম এবং প্রাক-প্রাথমিক শিক্ষার্থীদের শিখন ফলাফল",
            'publication_type': "pilot_report",
            'abstract_en': "Comparative field pilot evaluating play-based learning modules for children aged 3 to 5, drawing from pilot implementations in East Africa and South Asia.",
            'abstract_bn': "৩ থেকে ৫ বছর বয়সী শিশুদের জন্য খেলাভিত্তিক শিখন মডিউলের মাঠপর্যায়ের প্রায়োগিক মূল্যায়ন।",
            'author': "AKM Badrul Alam",
            'date_published': "July 2026",
            'tags': "Early Childhood, Play-Based Learning, Curriculum Design",
            'download_url': "#",
            'is_published': True,
            'order': 4
        }
    ]
    for pub in publications:
        ResearchPublication.objects.create(**pub)

    print("\nSeeding Team Members...")
    TeamMember.objects.all().delete()
    team = [
        {
            'name_en': "Md Ershadul Kader Faruki",
            'name_bn': "মো: এরশাদুল কাদের ফারুকী",
            'role_en': "Co-founder & Chief Executive",
            'role_bn': "সহ-প্রতিষ্ঠাতা ও প্রধান নির্বাহী কর্মকর্তা",
            'portfolio_en': "Strategy, Governance & Institutional Planning",
            'portfolio_bn': "কৌশলগত পরিকল্পনা, সুশাসন ও প্রাতিষ্ঠানিক ব্যবস্থাপনা",
            'bio_en': "Management professional with 14 years of experience across academic, development and business organisations. Deep experience in strategic planning, governance and project management. Sustained academic contribution to designing general education, academic planning, and teaching and learning development. Research experience spans climate change, public policy, education and sustainable development.",
            'bio_bn': "একাডেমিক, উন্নয়ন সংস্থা ও ব্যবসায়িক প্রতিষ্ঠানে ১৪ বছরের অভিজ্ঞতা সম্পন্ন ব্যবস্থাপনা বিশেষজ্ঞ। কৌশলগত পরিকল্পনা, সুশাসন ও প্রকল্প পরিচালনায় অগাধ অভিজ্ঞতা। শিক্ষা উন্নয়ন ও পাবলিক পলিসি গবেষণায় দীর্ঘ অবদান রয়েছে।",
            'credentials_en': "• 14+ years in strategic leadership & project governance\n• Academic planning and institutional quality assurance\n• Research portfolio in public policy, education & sustainable development\n• Track record bridging academia with corporate development",
            'credentials_bn': "• কৌশলগত নেতৃত্ব ও প্রকল্প সুশাসনে ১৪+ বছরের অভিজ্ঞতা\n• প্রাতিষ্ঠানিক পাঠদান পরিকল্পনা ও মান নিশ্চিতকরণ\n• শিক্ষা ও টেকসই উন্নয়ন বিষয়ে বহুমুখী গবেষণা প্রকাশনা",
            'photo_url': "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
            'order': 1
        },
        {
            'name_en': "Hamim Al Ahsan",
            'name_bn': "হামিম আল আহসান",
            'role_en': "Co-founder & Chief Technology and Learning Officer",
            'role_bn': "সহ-প্রতিষ্ঠাতা ও প্রধান প্রযুক্তি ও শিখন কর্মকর্তা",
            'portfolio_en': "EdTech Platforms, VLE & AI Systems",
            'portfolio_bn': "এডুটেক প্ল্যাটফর্ম, ভার্চুয়াল লার্নিং ও এআই সিস্টেম",
            'bio_en': "EdTech professional with over a decade of experience in learning technologies, instructional design and system development. Has led the digital transformation of teaching and learning, managing and optimising Moodle-based virtual learning environments. Integrates AI-powered solutions, including Bengali and English speech-to-text transcription, to make learning more inclusive and data-driven. Expertise in Moodle, Bootstrap and digital pedagogy.",
            'bio_bn': "লার্নিং টেকনোলজি, ইনস্ট্রাকশনাল ডিজাইন ও সিস্টেম ডেভেলপমেন্টে এক দশকেরও বেশি অভিজ্ঞতাসম্পন্ন এডুটেক পেশাজীবী। মুডল-ভিত্তিক ভার্চুয়াল লার্নিং এনভায়রনমেন্ট পরিচালনা এবং বাংলা স্পিচ-টু-টেক্সট এআই সংযোজনে পারদর্শী।",
            'credentials_en': "• 10+ years optimizing enterprise Moodle VLE ecosystems\n• Architect of AI-powered Bengali & English speech-to-text tools\n• Instructional design expert for blended & asynchronous learning\n• Master developer in responsive web learning technologies",
            'credentials_bn': "• প্রাতিষ্ঠানিক মুডল আর্কিটেকচার পরিচালনায় ১০+ বছরের দক্ষতা\n• বাংলা ও ইংরেজি স্পিচ-টু-টেক্সট এআই সিস্টেমের উদ্ভাবক\n• ব্লেন্ডেড লার্নিং ও ইনস্ট্রাকশনাল ডিজাইনের বিশেষজ্ঞ",
            'photo_url': "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
            'order': 2
        },
        {
            'name_en': "AKM Badrul Alam",
            'name_bn': "এ কে এম বদরুল আলম",
            'role_en': "Co-founder & Director",
            'role_bn': "সহ-প্রতিষ্ঠাতা ও পরিচালক",
            'portfolio_en': "Curriculum & Teacher Development",
            'portfolio_bn': "শিক্ষাক্রম ও শিক্ষক পেশাগত উন্নয়ন",
            'bio_en': "Former Senior Faculty, Master of Education in Educational Leadership, Planning and Management, Institute of Educational Development, BRAC University. Served in BRAC Education Programme (2003-2010), designing teacher and staff development interventions. Contributed to leadership training for head teachers under DPE (PEDP-III). Member of NCTB committee reviewing Bangla language curriculum (2013) and authored Teachers' Edition textbooks. Contributed to national textbook refinement under DFID in Bangladesh and Pakistan. Developed play-based learning curriculum in Uganda (2016-2017). MEd from University of Bath, UK, and PhD studies at Southwest University, China.",
            'bio_bn': "সাবেক জ্যেষ্ঠ ফ্যাকাল্টি, ব্র্যাক ইউনিভার্সিটি (আইইডি)। ব্র্যাক শিক্ষা কর্মসূচিতে (২০০৩-২০১০) শিক্ষক উন্নয়ন বিশেষজ্ঞ হিসেবে দায়িত্ব পালন। জাতীয় শিক্ষাক্রম ও পাঠ্যপুস্তক বোর্ড (এনসিটিবি) কমিটির সদস্য ও শিক্ষক সহায়িকা প্রণেতা। বাথ বিশ্ববিদ্যালয় (যুক্তরাজ্য) থেকে স্নাতকোত্তর এবং পিএইচডি গবেষক (চীন)।",
            'credentials_en': "• Former Senior Faculty, MEd in Educational Leadership, BRAC University\n• NCTB Curriculum Committee Member; developed Grade IV-V Teachers' Editions\n• DPE PEDP-III leadership trainer for government primary school head teachers\n• DFID international curriculum consultant (Bangladesh & Pakistan)\n• International play-based curriculum author (Uganda, 2016-2017)\n• Master's in Learning & Teaching (University of Bath, UK); PhD studies (China)",
            'credentials_bn': "• সাবেক জ্যেষ্ঠ ফ্যাকাল্টি, ব্র্যাক বিশ্ববিদ্যালয় (শিক্ষা নেতৃত্ব ও ব্যবস্থাপনা)\n• এনসিটিবি শিক্ষাক্রম কমিটির সদস্য ও প্রাথমিক শিক্ষক সহায়িকার লেখক\n• ডিপিই পিইডিপি-৩ প্রধান শিক্ষক নেতৃত্ব প্রশিক্ষক\n• ডিএফআইডি আন্তর্জাতিক পাঠ্যপুস্তক উন্নয়ন পরামর্শক\n• যুক্তরাজ্যের বাথ বিশ্ববিদ্যালয় হতে স্নাতকোত্তর ও চীনে পিএইচডি গবেষক",
            'photo_url': "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
            'order': 3
        }
    ]
    for m in team:
        TeamMember.objects.create(**m)

    print("\nSeeding Roadmap Phases...")
    RoadmapPhase.objects.all().delete()
    roadmap = [
        {
            'phase_number': 1,
            'phase_title_en': "Foundation & Infrastructure",
            'phase_title_bn': "ভিত্তি স্থাপন ও প্রস্তুতি",
            'timeline_en': "Months 0 to 6",
            'timeline_bn': "০ থেকে ৬ মাস",
            'status': "active",
            'milestones_en': "• Register Private Limited Company\n• Ratify Founders & Shareholders Agreement\n• Launch Brand Identity & Digital Presence\n• Establish Expert Advisory Council\n• Initiate First Institutional Conversations",
            'milestones_bn': "• প্রাইভেট লিমিটেড কোম্পানি নিবন্ধন সম্পন্নকরণ\n• অংশীদার চুক্তি ও সুশাসন নীতিমালা চূড়ান্তকরণ\n• ব্র্যান্ড আইডেন্টিটি ও ওয়েব পোর্টাল উন্মোচন\n• বিশেষজ্ঞ উপদেষ্টা পর্ষদ গঠন\n• প্রাথমিক প্রাতিষ্ঠানিক অংশীদারিত্ব সংলাপ শুরু",
            'order': 1
        },
        {
            'phase_number': 2,
            'phase_title_en': "Pilots & Product Readiness",
            'phase_title_bn': "পাইলট কর্মসূচি ও পণ্য প্রস্তুতি",
            'timeline_en': "Months 6 to 12",
            'timeline_bn': "৬ থেকে ১২ মাস",
            'status': "upcoming",
            'milestones_en': "• Pilot Teacher EduTech Capacity Course with Partner School Network\n• Release Assessment Tool & Item Bank Prototype\n• Deploy Full Course-Delivery Platform Live (Moodle VLE)\n• Publish First Applied Classroom Research Study",
            'milestones_bn': "• অংশীদার বিদ্যালয় নেটওয়ার্কে শিক্ষক এডুটেক কোর্স পাইলট\n• অ্যাসেসমেন্ট টুল ও প্রশ্নভাণ্ডার প্রোটোটাইপ প্রকাশ\n• লাইভ কোর্স ডেলিভারি প্ল্যাটফর্ম (ভিএলই) উন্মুক্তকরণ\n• প্রথম প্রায়োগিক গবেষণাপত্র প্রকাশ ও নীতিনির্ধারকদের বিতরণ",
            'order': 2
        },
        {
            'phase_number': 3,
            'phase_title_en': "Scale, Sandbox & Expansion",
            'phase_title_bn': "সম্প্রসারণ, স্টার্টআপ স্যান্ডবক্স ও স্কেল",
            'timeline_en': "Months 12 to 24",
            'timeline_bn': "১২ থেকে ২৪ মাস",
            'status': "upcoming",
            'milestones_en': "• Scale Teacher Training Courses across Multiple Districts\n• Commercial Launch of Assessment & Analytics Platform\n• Apply to Government of Bangladesh Startup Sandbox\n• Open Stock Option Pool for Strategic Partners & Impact Investors",
            'milestones_bn': "• দেশব্যাপী বিভিন্ন জেলায় শিক্ষক প্রশিক্ষণ কার্যক্রম সম্প্রসারণ\n• অ্যাসেসমেন্ট ও অ্যানালিটিক্স প্ল্যাটফর্মের বাণিজ্যিক উন্মোচন\n• বাংলাদেশ সরকারের স্টার্টআপ স্যান্ডবক্সে অন্তর্ভুক্তি আবেদন\n• কৌশলগত অংশীদার ও বিনিয়োগকারীদের সাথে অংশীদারিত্ব স্থাপন",
            'order': 3
        }
    ]
    for r in roadmap:
        RoadmapPhase.objects.create(**r)

    print("\nDatabase seeded successfully!")

if __name__ == '__main__':
    seed()
