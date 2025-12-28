# Frontend Setup and Usage Guide

## Quick Start

### 1. Install Dependencies
```bash
cd /home/pranav/medius-assignment/frontend
npm install
# or
bun install
```

### 2. Start Development Server
```bash
npm run dev
# or
bun run dev
```

The app will be available at `http://localhost:5173`

### 3. Start Backend API
In another terminal:
```bash
cd /home/pranav/medius-assignment/backend
python manage.py runserver
```

The API will be available at `http://localhost:8000`

## How to Use

1. **Open the Application**: Go to `http://localhost:5173` in your browser
2. **Select a PDF**: Click on the file upload area or drag and drop a PDF file
3. **Convert**: Click "Convert to DOCX" button
4. **Download**: Wait for the conversion and click "Download DOCX" to get your file
5. **Convert More**: Click "Convert Another" to process more files

## Features

✅ Simple, clean UI
✅ PDF file validation
✅ Real-time conversion status
✅ Direct download links
✅ Error handling with clear messages
✅ Responsive design
✅ No fancy animations - focus on functionality

## Technologies Used

- **Vite** - Fast build tool
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Axios** - HTTP client

## Project Structure

```
src/
├── App.tsx                    # Main converter component
├── main.tsx                   # React entry point
├── index.css                  # Tailwind + global styles
└── services/
    └── api.ts                 # Backend API integration
```

## API Configuration

The frontend connects to the backend at:
- **Development**: `http://localhost:8000`
- **Configured in**: `.env.local` (VITE_API_URL)

To change the API URL, edit `.env.local`:
```
VITE_API_URL=http://your-backend-url:8000
```

## Building for Production

```bash
npm run build
# or
bun run build
```

Output files will be in the `dist/` directory.

## Troubleshooting

### Backend Connection Error
- Check if backend is running on `http://localhost:8000`
- Verify VITE_API_URL in `.env.local`
- Enable CORS in Django if needed

### File Upload Issues
- Ensure file is a valid PDF
- Check file size limits if any
- Try with a different PDF file

### Conversion Fails
- Check backend logs for detailed error messages
- Verify backend API is working with a test file
- Ensure pdf2docx library is installed on backend
