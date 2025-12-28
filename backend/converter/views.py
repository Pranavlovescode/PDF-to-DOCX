from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import os
from pdf2docx import Converter
from django.conf import settings
from .serializers import PDFToDOCXSerializer


class PDFToDOCXConvertView(APIView):
    """
    API endpoint to convert PDF files to DOCX format.
    
    POST /api/convert/
    - Accepts multipart/form-data with 'pdf_file' field
    - Returns JSON response with download link to converted DOCX file
    """
    parser_classes = (MultiPartParser, FormParser)

    def post(self, request, *args, **kwargs):
        serializer = PDFToDOCXSerializer(data=request.data)
        
        if serializer.is_valid():
            pdf_file = serializer.validated_data['pdf_file']
            
            try:
                # Create directories for file storage
                pdf_dir = os.path.join(settings.MEDIA_ROOT, 'pdfs')
                docx_dir = os.path.join(settings.MEDIA_ROOT, 'docx')
                os.makedirs(pdf_dir, exist_ok=True)
                os.makedirs(docx_dir, exist_ok=True)
                
                # Save uploaded PDF file
                pdf_filename = pdf_file.name
                pdf_path = os.path.join(pdf_dir, pdf_filename)
                with open(pdf_path, 'wb+') as destination:
                    for chunk in pdf_file.chunks():
                        destination.write(chunk)
                
                # Generate output DOCX file path
                docx_filename = os.path.splitext(pdf_filename)[0] + '.docx'
                docx_path = os.path.join(docx_dir, docx_filename)
                
                # Convert PDF to DOCX
                converter = Converter(pdf_path)
                converter.convert(docx_path)
                converter.close()
                
                # Generate download URL
                download_url = f'{request.scheme}://{request.get_host()}{settings.MEDIA_URL}docx/{docx_filename}'
                
                return Response(
                    {
                        'status': 'success',
                        'message': 'PDF converted to DOCX successfully',
                        'docx_file': docx_filename,
                        'download_url': download_url,
                        'pdf_file': pdf_filename
                    },
                    status=status.HTTP_200_OK
                )
                
            except Exception as e:
                return Response(
                    {
                        'error': 'Conversion failed',
                        'detail': str(e)
                    },
                    status=status.HTTP_400_BAD_REQUEST
                )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    

class HealthCheckView(APIView):
    """
    API endpoint for health check.
    
    GET /api/health/
    - Returns a simple JSON response indicating the service is running
    """
    def get(self, request, *args, **kwargs):
        return Response(
            {
                'status': 'success',
                'message': 'Service is running'
            },
            status=status.HTTP_200_OK
        )
