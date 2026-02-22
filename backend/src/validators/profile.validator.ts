import { z } from 'zod';

export const updateProfileSchema = z.object({
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(20, "Kullanıcı adı çok uzun")
    .regex(/^[a-zA-Z0-9_]+$/, "Kullanıcı adı sadece harf, rakam ve alt çizgi içerebilir")
    .optional()
    .or(z.literal('')), 

  bio: z
    .string()
    .max(500, "Biyografi 500 karakterden fazla olamaz")
    .optional(),
    
  university: z
    .string()
    .max(100, "Üniversite adı çok uzun")
    .optional(),

  department: z
    .string()
    .max(100, "Bölüm adı çok uzun")
    .optional(),

  avatarUrl: z
    .string()
    .url("Geçerli bir fotoğraf bağlantısı giriniz")
    .optional()
    .or(z.literal('')),
});