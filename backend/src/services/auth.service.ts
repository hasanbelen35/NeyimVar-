import  prisma  from '../database/db';
import { hashPassword } from '../utils/hash.util';
import { AppError } from '../utils/appError';

///////////////// REGISTER USER SERVICE //////////////////
export const registerUserService = async (userData: any) => {
  const { email, password, name, surname } = userData;

  if (!email || !password || !name || !surname) {
    throw new AppError("Lütfen tüm alanları doldurun.", 400);
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    throw new AppError("Bu e-posta adresi zaten kullanımda.", 400);
  }

  const hashedPassword = await hashPassword(password);

  return await prisma.user.create({
    data: { 
      email, 
      password: hashedPassword, 
      name, 
      surname 
    },
    select: {
      id: true,
      email: true,
      name: true,
      surname: true,
      createdAt: true
    }
  });
};