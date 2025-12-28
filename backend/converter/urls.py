from django.urls import path
from .views import PDFToDOCXConvertView

urlpatterns = [
    path('convert/', PDFToDOCXConvertView.as_view(), name='pdf-to-docx-convert'),
]
