import { SignJWT, jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(
  process.env.JWT_SECRET || 'supersecretjwtkey'
);

export async function signJwt(payload: any) {
  // Ensure we don't pass complex objects like Mongoose IDs
  const cleanPayload = JSON.parse(JSON.stringify(payload));
  
  const token = await new SignJWT(cleanPayload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('24h')
    .sign(JWT_SECRET);
  return token;
}

export async function verifyJwt(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET);
    return payload;
  } catch (error) {
    console.error('JWT Verification Error:', error);
    return null;
  }
}
