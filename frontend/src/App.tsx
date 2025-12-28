import { useState, useRef } from 'react';
import PDFConverterAPI from './services/api';

interface ConversionResult {
  status: string;
  message: string;
  docx_file: string;
  download_url: string;
  pdf_file: string;
}

export default function App() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ConversionResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.type === 'application/pdf') {
        setSelectedFile(file);
        setError(null);
        setResult(null);
      } else {
        setError('Please select a valid PDF file');
        setSelectedFile(null);
      }
    }
  };

  const handleConvert = async () => {
    if (!selectedFile) {
      setError('Please select a PDF file first');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await PDFConverterAPI.convertPDF(selectedFile);
      setResult(response);
      setSelectedFile(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'An error occurred during conversion';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setSelectedFile(null);
    setError(null);
    setResult(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-md mx-auto bg-white rounded-lg shadow p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">PDF to DOCX</h1>
          <p className="text-gray-600">Convert your PDF files to Word documents</p>
        </div>

        {/* Result Section */}
        {result && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded">
            <div className="flex items-center mb-3">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-green-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <p className="ml-3 text-sm font-medium text-green-800">
                {result.message}
              </p>
            </div>
            <div className="text-sm text-gray-700 mb-4">
              <p className="mb-1">
                <span className="font-semibold">Original:</span> {result.pdf_file}
              </p>
              <p>
                <span className="font-semibold">Converted:</span> {result.docx_file}
              </p>
            </div>
            <a
              href={result.download_url}
              className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors"
              download
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                />
              </svg>
              Download DOCX
            </a>
            <button
              onClick={handleReset}
              className="ml-2 px-4 py-2 border border-gray-300 text-gray-700 rounded hover:bg-gray-50 transition-colors"
            >
              Convert Another
            </button>
          </div>
        )}

        {/* Error Section */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg
                  className="h-5 w-5 text-red-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-red-800">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Upload Section */}
        {!result && (
          <div className="space-y-4">
            <div>
              <label
                htmlFor="pdf-input"
                className="block w-full border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-gray-400 transition-colors"
              >
                <div className="mb-2">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20a4 4 0 004 4h24a4 4 0 004-4V20m-8-12v8m0 0l-3-3m3 3l3-3"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <p className="text-gray-600 font-medium">
                  {selectedFile ? selectedFile.name : 'Click to select PDF file'}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  or drag and drop here
                </p>
              </label>
              <input
                ref={fileInputRef}
                id="pdf-input"
                type="file"
                accept=".pdf"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            <button
              onClick={handleConvert}
              disabled={!selectedFile || isLoading}
              className="w-full bg-blue-600 text-white font-medium py-2 px-4 rounded hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Converting...
                </span>
              ) : (
                'Convert to DOCX'
              )}
            </button>
          </div>
        )}

        {/* Info Section */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <h3 className="text-sm font-semibold text-gray-900 mb-3">How it works:</h3>
          <ol className="text-sm text-gray-600 space-y-2">
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-3">1.</span>
              <span>Select a PDF file from your device</span>
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-3">2.</span>
              <span>Click the convert button</span>
            </li>
            <li className="flex">
              <span className="font-semibold text-blue-600 mr-3">3.</span>
              <span>Download your DOCX file</span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  );
}
