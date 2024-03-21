const cookieName = "geotec_cookie";

export const setAuthCookie = (token: string) => {
  document.cookie = `${cookieName}=${JSON.stringify(
    token
  )}; path=/; samesite=strict`;
};

export const getAuthCookie = (): string | null => {
  const cookie = getC(cookieName);
  if (!cookie) return null;
  return JSON.parse(cookie);
/*   const cookie =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJJZCI6IjU4YTk2ZGVjLTAyYWEtNGY5OC04N2I4LTBkZTA5ZDc3M2Y0MiIsIlByb2plY3RJZCI6ImJhYzM5YWRhLTgwYjItNDBlZC05YTdmLTcxNjRkMWU3MjlkMyIsImV4cCI6MTcxMTEzNjczMSwiaXNzIjoiaHR0cHM6Ly9nZW90ZWMuY29tIiwiYXVkIjoiaHR0cHM6Ly9nZW90ZWMuY29tIn0.9aa5p-vqvnYA_X0aRyrMNvr3zZcdfKt9WVK0UjnIOls";
  return cookie; */
};

export const deleteAuthCookie = () => {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
};

function getC(cname: string) {
  const name = cname + "=";
  const ca = document.cookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
