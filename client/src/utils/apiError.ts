// Reads the `{ error }` message the API returns, with a fallback for network errors.
export const getApiErrorMessage = (error: unknown, fallback: string): string => {
  const apiError = (error as { response?: { data?: { error?: unknown } } })
    ?.response?.data?.error;

  if (typeof apiError === "string" && apiError.trim().length > 0) {
    return apiError;
  }

  if (error instanceof Error && error.message.trim().length > 0) {
    return error.message;
  }

  return fallback;
};
