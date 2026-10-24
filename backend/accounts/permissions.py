from rest_framework import permissions

class IsSuperAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and (request.user.role == 'super_admin' or request.user.is_superuser))


class IsContentManagerOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role in ['super_admin', 'content_manager'])


class IsPlatformEditorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role in ['super_admin', 'content_manager', 'platform_editor'])


class IsResearchEditorOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return bool(request.user and request.user.is_authenticated and request.user.role in ['super_admin', 'content_manager', 'research_editor'])


class CanManageInquiries(permissions.BasePermission):
    def has_permission(self, request, view):
        # Anyone can POST an inquiry (contact form)
        if request.method == 'POST':
            return True
        # Only authenticated staff can view/edit inquiries
        return bool(request.user and request.user.is_authenticated and request.user.role in ['super_admin', 'content_manager'])
