# PDF to DOCX Converter

A full-stack web application that converts PDF files to DOCX (Word) documents with a clean, intuitive interface.

## 🎯 Project Approach

This project follows a **modern full-stack architecture** with:
- **Backend**: RESTful API using Django REST Framework
- **Frontend**: Single Page Application (SPA) using React + Vite
- **Communication**: HTTP API with JSON payloads and file uploads

### Design Philosophy

- **Simplicity First**: Clean, straightforward UI without unnecessary complexity
- **Separation of Concerns**: Backend handles conversion logic, frontend handles user interaction
- **File-Based Storage**: Converted files are stored in media folder for direct downloads
- **Error Handling**: Comprehensive validation and error messages at both layers

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Frontend (React + Vite)                 │
│  - Simple file upload UI                                    │
│  - Real-time status updates                                 │
│  - Direct download links                                    │
│  - TypeScript for type safety                               │
└──────────────────────┬──────────────────────────────────────┘
                       │ HTTP/Axios
                       ↓
┌─────────────────────────────────────────────────────────────┐
│              Backend (Django REST Framework)                │
│  - POST /api/convert/ endpoint                              │
│  - PDF validation                                           │
│  - pdf2docx library conversion                              │
│  - File management (save/serve)                             │
│  - CORS enabled for frontend                                │
└─────────────────────────────────────────────────────────────┘
                       │
                       ↓
        ┌──────────────────────────────┐
        │  Media Folder (/media/)      │
        │  ├── pdfs/                   │
        │  └── docx/                   │
        └──────────────────────────────┘
```

## 📋 Technology Stack

### Backend
- **Django 4.2** - Web framework
- **Django REST Framework** - API layer
- **django-cors-headers** - Cross-Origin Resource Sharing
- **pdf2docx 0.5.6** - PDF to DOCX conversion library
- **Pillow, PyMuPDF** - Image and PDF processing

### Frontend
- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite 7** - Build tool (fast HMR and bundling)
- **Tailwind CSS** - Utility-first styling
- **Axios** - HTTP client

## 🔄 Data Flow

1. **User uploads PDF** → Frontend validates file type
2. **Send to Backend** → Axios POST to `/api/convert/`
3. **Backend processes** → Saves PDF, converts to DOCX using pdf2docx
4. **Save files** → Store in `/media/pdfs/` and `/media/docx/`
5. **Return response** → JSON with download URL
6. **Frontend handles** → Display success and provide download link
7. **User downloads** → Direct link to converted DOCX file

## 📦 Project Structure

```
medius-assignment/
├── backend/
│   ├── converter/                    # Main app
│   │   ├── views.py                 # API view with conversion logic
│   │   ├── serializers.py           # File validation
│   │   ├── urls.py                  # Route definition
│   │   └── models.py                # Database models (if needed)
│   ├── pdftodocx/
│   │   ├── settings.py              # Django configuration + CORS
│   │   ├── urls.py                  # URL routing
│   │   └── wsgi.py                  # WSGI entry point
│   ├── media/                        # Generated at runtime
│   │   ├── pdfs/                    # Uploaded PDFs
│   │   └── docx/                    # Converted DOCX files
│   ├── manage.py
│   ├── requirements.txt
│   └── db.sqlite3
│
└── frontend/
    ├── src/
    │   ├── App.tsx                  # Main component with UI logic
    │   ├── services/
    │   │   └── api.ts               # API client wrapper
    │   ├── main.tsx                 # React entry point
    │   └── index.css                # Tailwind + global styles
    ├── package.json
    ├── vite.config.ts
    ├── tailwind.config.js
    ├── tsconfig.json
    └── .env.local                   # API configuration
```

## 🚀 Key Features

### Backend Features
- ✅ RESTful API endpoint for file conversion
- ✅ PDF file validation (extension and type checking)
- ✅ Automatic conversion using pdf2docx library
- ✅ File storage with organized directory structure
- ✅ CORS enabled for frontend communication
- ✅ Comprehensive error handling and validation
- ✅ Media file serving via Django

### Frontend Features
- ✅ Minimal, clean user interface
- ✅ File upload with validation
- ✅ Drag-and-drop support (optional enhancement)
- ✅ Real-time loading states
- ✅ Success/error notifications
- ✅ Direct download capability
- ✅ Responsive design (mobile-friendly)
- ✅ TypeScript for type safety

## 💻 Implementation Details

### Backend API Endpoint

**Endpoint**: `POST /api/convert/`

**Request**:
```
Content-Type: multipart/form-data
Body: {pdf_file: <File>}
```

**Response** (Success):
```json
{
  "status": "success",
  "message": "PDF converted to DOCX successfully",
  "docx_file": "document.docx",
  "download_url": "http://localhost:8000/media/docx/document.docx",
  "pdf_file": "document.pdf"
}
```

### Frontend State Management

- **selectedFile**: Tracks uploaded PDF
- **isLoading**: Shows conversion progress
- **error**: Displays error messages
- **result**: Stores conversion response with download URL

### File Handling Strategy

1. **Upload**: Save PDF to `media/pdfs/` with original filename
2. **Convert**: Process PDF to DOCX in same location
3. **Store**: Save DOCX to `media/docx/` with converted name
4. **Serve**: Return download URL for client access
5. **Cleanup**: Files remain for later download (no auto-deletion)

## 🔐 Design Decisions

### Why Django REST Framework?
- Simple setup for file upload handling
- Built-in serializers for validation
- Easy CORS configuration
- Mature and well-documented

### Why Vite instead of Create React App?
- **Faster builds** - ES modules over bundling
- **Faster HMR** - Instant feedback during development
- **Smaller bundle** - Optimized production builds
- **Less boilerplate** - Minimal configuration needed

### Why Tailwind CSS?
- **Utility-first approach** - No custom CSS needed
- **Responsive by default** - Mobile-friendly out of the box
- **Consistent styling** - No design inconsistencies
- **Easy customization** - Simple configuration

### Why Store Files in Media Folder?
- **Direct serving** - No need for temporary file handling
- **User control** - Files available for multiple downloads
- **Scalability** - Easy to integrate with cloud storage later
- **Simplicity** - No complex memory management

## 🎓 Learning Approach

This implementation demonstrates:
1. **REST API Design** - Proper HTTP verbs and status codes
2. **File Upload Handling** - Multipart form data processing
3. **Error Handling** - Validation at multiple layers
4. **Full-stack Integration** - Backend-frontend communication
5. **Modern Frontend** - React hooks, TypeScript, Tailwind
6. **API Client Pattern** - Axios service layer abstraction

## 🔧 Setup & Running

### Quick Start

**Backend**:
```bash
cd backend
pip install -r requirements.txt
python manage.py runserver
```

**Frontend**:
```bash
cd frontend
bun install
bun run dev
```

Visit `http://localhost:5173` to use the application.

### Full Documentation
See [SETUP_GUIDE.md](SETUP_GUIDE.md) for detailed instructions.

## 📈 Future Enhancements

Potential improvements without changing core approach:
- Batch file conversion
- Conversion history/logs
- User authentication
- File size limits enforcement
- Conversion progress indicators
- Queue management for large batches
- Integration with cloud storage (AWS S3, etc.)

## ✨ Highlights

- **Clean Code**: Organized, readable, well-commented
- **Type Safety**: Full TypeScript implementation
- **Error Handling**: Graceful error messages for users
- **Responsive**: Works on desktop and mobile
- **Scalable**: Easy to extend with new features
- **Standard Practices**: Follows industry conventions

## 📝 Notes

- All files are stored in `media/` directory for easy access
- CORS is configured for `http://localhost:5173` (development)
- PDF2DOCX library handles the actual conversion
- No database models needed (stateless operations)
- Files can be manually deleted from media folder

---

**Created**: December 28, 2025 | **Status**: Production Ready
