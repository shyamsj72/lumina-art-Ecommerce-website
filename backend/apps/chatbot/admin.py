from django.contrib import admin
from .models import ChatConversation, ChatMessage

class ChatMessageInline(admin.TabularInline):
    model = ChatMessage
    extra = 0
    readonly_fields = ('role', 'content', 'created_at')
    can_delete = False

    def has_add_permission(self, request, obj):
        return False

@admin.register(ChatConversation)
class ChatConversationAdmin(admin.ModelAdmin):
    list_display = ('session_id', 'created_at', 'message_count')
    search_fields = ('session_id',)
    ordering = ('-created_at',)
    inlines = [ChatMessageInline]
    
    def message_count(self, obj):
        return obj.messages.count()
    message_count.short_description = 'Messages'

    def has_add_permission(self, request):
        return False
        
    def has_change_permission(self, request, obj=None):
        return False
