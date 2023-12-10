export function setCsrfToken(token: string) {
  localStorage.setItem("csrfToken", token);
}

export function getCsrfToken(): string | null {
  localStorage.removeItem("csrfToken");
  return localStorage.getItem("csrfToken");
}

export function removeCsrfToken() {
  localStorage.removeItem("csrfToken");
}
