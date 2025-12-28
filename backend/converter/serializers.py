from rest_framework import serializers


class PDFToDOCXSerializer(serializers.Serializer):
    pdf_file = serializers.FileField(
        help_text="Upload a PDF file to convert to DOCX"
    )

    def validate_pdf_file(self, value):
        """Validate that the uploaded file is a PDF"""
        if not value.name.lower().endswith('.pdf'):
            raise serializers.ValidationError(
                "File must be a PDF. Please upload a valid PDF file."
            )
        return value
