# Center for EduTech Development and Research (CEDR)
**Full-Stack Web Application & Content Management System (CMS)**
*Dhaka, Bangladesh • October 2026*

This platform reflects the complete company profile of the **Center for EduTech Development and Research (CEDR)**, incorporating an evidence-based presentation for institutions, school networks, universities, and donors, alongside a dedicated **React + MUI Role-Based CMS Panel** and **Django REST API backend**.

---

## 🏗️ Architecture Overview

- **Backend**:
  - **Framework**: Django 6.x & Django REST Framework
  - **Authentication**: JWT via `djangorestframework-simplejwt`
  - **Virtual Environment**: Isolated in `backend/venv`
  - **Role-Based Access Control (RBAC)**: Custom `accounts.User` model supporting 4 distinct privilege tiers (`super_admin`, `content_manager`, `platform_editor`, `research_editor`).
  - **Data Seed**: Complete institutional data seeded via `backend/seed_data.py`.
- **Frontend**:
  - **Framework**: React 19 + Vite
  - **UI Design System**: Material UI (MUI v6) tailored with brand color tokens derived from the official CEDR emblem.
  - **Motion & Interactions**: `framer-motion` for the modern Hero Slider carousel and interactive transitions.
  - **Bilingual Engine**: Instant reactive toggle between **English** and **বাংলা** (Bangla Unicode with Google Fonts `Hind Siliguri` & `Plus Jakarta Sans`).
  - **Interactive Labs**: Working simulations for Moodle/Canvas VLE, Bloom's Taxonomy Assessment Engine, Bangla Speech-to-Text NLP transcriber, and Gamified Pedagogical Modules.

---

## 🚀 Running the Project

### 1. Django Backend
The backend runs in an isolated Python virtual environment:

```powershell
cd backend
# Activate virtual environment
.\venv\Scripts\Activate.ps1

# Run migrations and seed data (already performed)
python manage.py migrate
python seed_data.py

# Start Django Development Server (Port 8000)
python manage.py runserver 8000
```
- **REST API Base**: `http://127.0.0.1:8000/api/`
- **Django Superuser Admin**: `http://127.0.0.1:8000/admin/`

---

### 2. React Frontend
```powershell
cd frontend
# Start Vite Development Server (Port 5173)
npm run dev
```
- **Public Portal**: `http://localhost:5173/`
- **Dedicated CMS Admin Panel**: `http://localhost:5173/admin-portal/login`

---

## 👥 Seeded Content Manager Roles & Test Credentials

The system comes pre-configured with four distinct accounts to test role-based permissions immediately:

| Role Tier | Username | Password | Privileges |
| :--- | :--- | :--- | :--- |
| **👑 Super Admin** | `admin` | `admin123` | Full control: User creation, Role tier assignment, Hero slides, all CMS modules, and site settings |
| **✍️ Senior Content Manager** | `content_manager` | `manager123` | Can edit Hero Slides, Focus Areas, Roadmap, Team, and review incoming Partnership Inquiries |
| **💻 Course & Platform Editor** | `platform_editor` | `editor123` | Specialized access to Platform Showcases, LMS specifications, and tech stacks |
| **🔬 Research Contributor** | `research_editor` | `research123` | Dedicated access to publish and edit Applied Research papers, policy briefs, and abstracts |

> **Note**: The CMS login page (`/admin-portal/login`) includes **One-Click Demo Login Buttons** for instant evaluation of each role tier without needing to type passwords!

---

## 🎨 Brand Color Palette (Extrapolated from CEDR Logo)

- **Primary Deep Navy** (`#0D3B75`): Academic rigor, institutional trust, leadership.
- **Vibrant Emerald / Leaf Green** (`#16A34A` / `#22C55E`): Bangladesh identity, growth, pedagogy.
- **Tech Cyan / Sky** (`#0284C7` / `#38BDF8`): AI, speech recognition, digital innovation.
- **Clean Backgrounds** (`#F8FAFC` & `#FFFFFF`): Premium card elevations, glassmorphic filters, and clean contrast.
