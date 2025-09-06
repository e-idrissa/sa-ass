export interface ApiErrorResponse {
  response?: {
    status: number;
    data?: {
      message?: string;
      error?: string;
      errors?: Array<{
        field: string;
        message: string;
      }>;
    };
  };
  message?: string;
  code?: string;
}

export interface CustomError extends Error {
  statusCode: number;
}

// Type guard for API errors
export const isApiError = (error: unknown): error is ApiErrorResponse => {
  return (
    typeof error === 'object' &&
    error !== null &&
    ('response' in error || 'message' in error)
  );
};

// Helper function to extract error message
export const getErrorMessage = (error: unknown): string => {
  if (isApiError(error)) {
    return (
      error.response?.data?.message ||
      error.message ||
      'An error occurred'
    );
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  return 'An unknown error occurred';
};

// Helper function to extract error status code
export const getErrorStatusCode = (error: unknown): number => {
  if (isApiError(error) && error.response?.status) {
    return error.response.status;
  }
  
  return 500;
};
