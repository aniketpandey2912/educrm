/** Decodes a JWT payload without verifying the signature (verification always happens server-side). */
export function decodeJwt<T>(token: string): T | null {
  const payload = token.split('.')[1];
  if (!payload) return null;

  try {
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');
    const json = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + c.charCodeAt(0).toString(16).padStart(2, '0'))
        .join(''),
    );
    return JSON.parse(json) as T;
  } catch {
    return null;
  }
}

export function isTokenExpired(token: string): boolean {
  const payload = decodeJwt<{ exp: number }>(token);
  if (!payload?.exp) return true;
  return Date.now() >= payload.exp * 1000;
}
