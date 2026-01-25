import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET as string;
// utils/jwt.ts
export const generateToken = (payloadData: { userId: number, email: string }) => {
  const payload = {
    sub: payloadData.userId,   
    email: payloadData.email,
    iat: Math.floor(Date.now() / 1000) 
  };

  return jwt.sign(payload, JWT_SECRET as string, { 
    expiresIn: '30s' 
  });
};

export const verifyToken = (token: string) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error:any) {
    return null;
  }
};