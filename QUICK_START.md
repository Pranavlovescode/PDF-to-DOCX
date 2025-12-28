# Quick Start

## Install CORS Library
```bash
cd backend
pip install django-cors-headers==4.3.1
```

## Start Backend
```bash
cd backend
python manage.py runserver
```
→ Runs at `http://localhost:8000`

## Start Frontend
```bash
cd frontend
npm install
npm run dev
```
→ Opens at `http://localhost:5173`

## Test the App
1. Open browser to `http://localhost:5173`
2. Upload a PDF file
3. Click "Convert to DOCX"
4. Download the converted file

## File Structure
- **Backend**: `/home/pranav/medius-assignment/backend/`
  - API: `http://localhost:8000/api/convert/`
  - Files: `backend/media/{pdfs,docx}/`
  
- **Frontend**: `/home/pranav/medius-assignment/frontend/`
  - App runs on `http://localhost:5173`
  - Config: `.env.local`

## Troubleshooting
- CORS error? → Check backend is running, install django-cors-headers
- API error? → Check backend terminal for error messages
- UI not working? → Clear browser cache, restart frontend
