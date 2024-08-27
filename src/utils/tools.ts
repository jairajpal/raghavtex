export const getCSRFToken = () => {
  const csrfCookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith("csrftoken="))
    ?.split("=")[1];
  return csrfCookie;
};
