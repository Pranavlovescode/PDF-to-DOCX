from django.urls import path
from .views import PDFToDOCXConvertView, HealthCheckView

urlpatterns = [
    path('convert/', PDFToDOCXConvertView.as_view(), name='pdf-to-docx-convert'),
    path('health/', HealthCheckView.as_view(), name='health-check'),
]
