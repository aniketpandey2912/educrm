import { decodeJwt, isTokenExpired } from './jwt';

function makeToken(payload: Record<string, unknown>): string {
  const base64url = (obj: unknown) =>
    Buffer.from(JSON.stringify(obj))
      .toString('base64')
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '');
  return `${base64url({ alg: 'HS256' })}.${base64url(payload)}.signature`;
}

describe('decodeJwt', () => {
  it('decodes a well-formed token payload', () => {
    const token = makeToken({ sub: '123', role: 'student' });
    expect(decodeJwt(token)).toEqual({ sub: '123', role: 'student' });
  });

  it('returns null for a malformed token', () => {
    expect(decodeJwt('not-a-token')).toBeNull();
  });
});

describe('isTokenExpired', () => {
  it('returns true when exp is in the past', () => {
    const token = makeToken({ exp: Math.floor(Date.now() / 1000) - 60 });
    expect(isTokenExpired(token)).toBe(true);
  });

  it('returns false when exp is in the future', () => {
    const token = makeToken({ exp: Math.floor(Date.now() / 1000) + 3600 });
    expect(isTokenExpired(token)).toBe(false);
  });
});
