export const isFetchNetworkError = (error: unknown) => {
  if (error instanceof Error) {
    return error.message === "Failed to fetch";
  } else {
    return false;
  }
};
