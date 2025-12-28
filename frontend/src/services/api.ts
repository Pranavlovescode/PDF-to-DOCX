import axios, { type AxiosInstance } from 'axios';

interface ConversionResponse {
  status: string;
  message: string;
  docx_file: string;
  download_url: string;
  pdf_file: string;
}

class PDFConverterAPI {
  private api: AxiosInstance;
  private baseURL: string;

  constructor() {
    this.baseURL = import.meta.env.VITE_API_URL || 'http://localhost:8000';
    this.api = axios.create({
      baseURL: this.baseURL,
      timeout: 60000, // 60 seconds for file conversion
    });
  }

  async convertPDF(file: File): Promise<ConversionResponse> {
    const formData = new FormData();
    formData.append('pdf_file', file);

    try {
      const response = await this.api.post<ConversionResponse>(
        '/api/convert/',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(
          error.response?.data?.detail || error.message || 'Conversion failed'
        );
      }
      throw error;
    }
  }

  getDownloadURL(downloadPath: string): string {
    return downloadPath;
  }
}

export default new PDFConverterAPI();
