export const isPageError404 = (error: Error) => {
  return error.message === "fetch API response status: 404";
};
