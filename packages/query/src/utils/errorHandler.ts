/**
 * Extracts error message from various error formats
 * 
 * @param error - Error object, string, or unknown type
 * @returns Extracted error message as string
 * 
 * @example
 * ```ts
 * extractErrorMessage(new Error('Something went wrong')); // "Something went wrong"
 * extractErrorMessage('Simple string error'); // "Simple string error"
 * extractErrorMessage({ message: 'Error message' }); // "Error message"
 * extractErrorMessage({ error: { message: 'Nested error' } }); // "Nested error"
 * ```
 */
export function extractErrorMessage(error: unknown): string {
  if (typeof error === 'string') {
    return error;
  }

  if (error instanceof Error) {
    return error.message;
  }

  if (typeof error === 'object' && error !== null) {
    // Try common error object structures
    if ('message' in error && typeof error.message === 'string') {
      return error.message;
    }

    if ('error' in error) {
      const nestedError = (error as { error: unknown }).error;
      if (typeof nestedError === 'string') {
        return nestedError;
      }
      if (nestedError instanceof Error) {
        return nestedError.message;
      }
      if (
        typeof nestedError === 'object' &&
        nestedError !== null &&
        'message' in nestedError &&
        typeof nestedError.message === 'string'
      ) {
        return nestedError.message;
      }
    }

    // Try to stringify if it's a plain object
    try {
      return JSON.stringify(error);
    } catch {
      // Fallback if stringify fails
      return 'Unknown error occurred';
    }
  }

  return 'Unknown error occurred';
}

/**
 * Checks if an error is a network error
 * 
 * @param error - Error to check
 * @returns True if error appears to be a network error
 */
export function isNetworkError(error: unknown): boolean {
  if (error instanceof Error) {
    return (
      error.message.includes('network') ||
      error.message.includes('fetch') ||
      error.message.includes('NetworkError') ||
      error.name === 'NetworkError' ||
      error.name === 'TypeError'
    );
  }

  if (typeof error === 'string') {
    return (
      error.toLowerCase().includes('network') ||
      error.toLowerCase().includes('fetch') ||
      error.toLowerCase().includes('connection')
    );
  }

  return false;
}

/**
 * Formats error for user display
 * Removes technical prefixes and cleans up the message
 * 
 * @param error - Error to format
 * @param fallbackMessage - Message to use if error cannot be extracted
 * @returns Formatted error message suitable for user display
 * 
 * @example
 * ```ts
 * formatErrorForDisplay(new Error('API Error: Invalid credentials'));
 * // "Invalid credentials"
 * ```
 */
export function formatErrorForDisplay(
  error: unknown,
  fallbackMessage = 'An error occurred. Please try again.'
): string {
  const message = extractErrorMessage(error);
  
  // Remove common technical prefixes
  const cleaned = message.replace(/^[ A-Za-z0-9]*(: )/, '').trim();
  
  return cleaned || fallbackMessage;
}

