export function getCookie(name: string): string | null {
  const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));

  return match ? decodeURIComponent(match[2]) : null;
}

export function setCookie(name: string, value: string, days: number): void {
  const expirationDate = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/; SameSite=Lax; Secure`;

}
