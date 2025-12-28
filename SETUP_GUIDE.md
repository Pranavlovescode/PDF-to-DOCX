# PDF to DOCX Converter - Complete Setup Guide

## Overview

This is a full-stack application with:
- **Backend**: Django REST Framework API with PDF to DOCX conversion
- **Frontend**: React + TypeScript + Vite + Tailwind CSS

## Prerequisites

- Python 3.8+
- Node.js 16+ or Bun
- pip (Python package manager)

## Backend Setup (Django)

### 1. Navigate to Backend Directory
```bash
cd /home/pranav/medius-assignment/backend
```

### 2. Create Virtual Environment
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

The requirements include:
- Django 4.2
- Django REST Framework
- django-cors-headers (for frontend communication)
- pdf2docx (for PDF conversion)
- Other supporting libraries

### 4. Run Migrations
```bash
python manage.py migrate
```

### 5. Create Superuser (Optional)
```bash
python manage.py createsuperuser
```

### 6. Start Backend Server
```bash
python manage.py runserver
```

The backend will run at `http://localhost:8000`

**API Endpoint**: `POST http://localhost:8000/api/convert/`

## Frontend Setup (React + Vite)

### 1. Navigate to Frontend Directory
```bash
cd /home/pranav/medius-assignment/frontend
```

### 2. Install Dependencies
```bash
npm install
# or
bun install
```

This installs:
- React 19
- TypeScript
- Vite
- Tailwind CSS
- Axios

### 3. Configure Environment (Optional)
The `.env.local` file is already configured:
```
VITE_API_URL=http://localhost:8000
```

To change it:
```bash
nano .env.local  # Edit the file
```

### 4. Start Development Server
```bash
npm run dev
# or
bun run dev
```

The frontend will be available at `http://localhost:5173`

## Running the Full Application

### Terminal 1 - Backend
```bash
cd /home/pranav/medius-assignment/backend
source venv/bin/activate
python manage.py runserver
```

### Terminal 2 - Frontend
```bash
cd /home/pranav/medius-assignment/frontend
npm run dev
```

Then open `http://localhost:5173` in your browser.

## Building for Production

### Frontend Build
```bash
cd /home/pranav/medius-assignment/frontend
npm run build
```

Output: `dist/` folder with optimized files

### Django Production Settings
Refer to Django deployment documentation for production setup.

## API Documentation

### Convert PDF to DOCX

**Endpoint**: `POST /api/convert/`

**Request**:
- Content-Type: `multipart/form-data`
- Body: Form data with `pdf_file` field

**Example using cURL**:
```bash
curl -X POST http://localhost:8000/api/convert/ \
  -F "pdf_file=@document.pdf"
```

**Response** (Success - 200):
```json
{
  "status": "success",
  "message": "PDF converted to DOCX successfully",
  "docx_file": "document.docx",
  "download_url": "http://localhost:8000/media/docx/document.docx",
  "pdf_file": "document.pdf"
}
```

**Response** (Error - 400):
```json
{
  "error": "Conversion failed",
  "detail": "Error message here"
}
```

## Project Structure

```
medius-assignment/
├── backend/                          # Django backend
│   ├── pdftodocx/                   # Project settings
│   │   ├── settings.py              # Django configuration
│   │   ├── urls.py                  # URL routing
│   │   └── wsgi.py                  # WSGI config
│   ├── converter/                    # Converter app
│   │   ├── models.py
│   │   ├── views.py                 # API views
│   │   ├── serializers.py           # DRF serializers
│   │   └── urls.py                  # App URLs
│   ├── media/                        # Uploaded files (created at runtime)
│   │   ├── pdfs/                    # PDF files
│   │   └── docx/                    # Converted DOCX files
│   ├── manage.py
│   ├── requirements.txt              # Python dependencies
│   └── db.sqlite3                    # Database
│
└── frontend/                         # React frontend
    ├── src/
    │   ├── App.tsx                  # Main component
    │   ├── main.tsx                 # Entry point
    │   ├── index.css                # Global styles
    │   └── services/
    │       └── api.ts               # API client
    ├── package.json
    ├── tailwind.config.js
    ├── postcss.config.js
    ├── vite.config.ts
    └── tsconfig.json
```

## Key Features

### Backend
- ✅ Simple REST API endpoint
- ✅ PDF validation
- ✅ Automatic DOCX conversion
- ✅ File storage and download links
- ✅ CORS enabled for frontend
- ✅ Error handling

### Frontend
- ✅ Clean, minimal UI
- ✅ File upload with drag-and-drop
- ✅ Real-time conversion status
- ✅ Direct download links
- ✅ Error notifications
- ✅ Responsive design
- ✅ TypeScript for type safety

## Troubleshooting

### Backend Issues

**Module not found**: Make sure all dependencies are installed
```bash
pip install -r requirements.txt
```

**Database error**: Run migrations
```bash
python manage.py migrate
```

**Port 8000 already in use**: Use a different port
```bash
python manage.py runserver 8001
```

### Frontend Issues

**Dependencies not found**: Reinstall packages
```bash
rm -rf node_modules
npm install
```

**CORS error**: Check backend CORS configuration in `settings.py`

**API connection error**: Ensure backend is running and check `.env.local` URL

**Build fails**: Clear cache and rebuild
```bash
rm -rf dist node_modules
npm install
npm run build
```

## Development Tips

### Enable Debug Mode
In Django `settings.py`, ensure:
```python
DEBUG = True
ALLOWED_HOSTS = ['*']  # For development only
```

### Test API Directly
Use Postman or cURL to test the API:
```bash
curl -F "pdf_file=@test.pdf" http://localhost:8000/api/convert/
```

### View Uploaded Files
Files are stored in:
- PDFs: `/home/pranav/medius-assignment/backend/media/pdfs/`
- DOCX: `/home/pranav/medius-assignment/backend/media/docx/`

### Check Django Admin
Visit `http://localhost:8000/admin/` to access Django admin panel.

## Performance Considerations

- Large PDF files may take time to convert
- API timeout is set to 60 seconds
- Files are automatically cleaned up after conversion (optional)
- Consider implementing file size limits for production

## Security Notes

For production deployment:
1. Change Django `SECRET_KEY`
2. Set `DEBUG = False`
3. Configure `ALLOWED_HOSTS` properly
4. Set up proper CORS origins
5. Use environment variables for sensitive data
6. Implement authentication/authorization
7. Add rate limiting

## Support

If you encounter issues:
1. Check terminal logs for error messages
2. Verify all dependencies are installed
3. Ensure both services are running
4. Check network connectivity between frontend and backend
5. Clear browser cache and try again
