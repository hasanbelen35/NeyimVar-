const { z } = require('zod');

// REGISTER SCHEMA
export const registerSchema = z.object({
  // Name 
  name: z
    .string({ required_error: "İsim alanı zorunludur" })
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(50, "İsim çok uzun"),

  // Surname 
  surname: z
    .string({ required_error: "Soyisim alanı zorunludur" })
    .min(2, "Soyisim en az 2 karakter olmalıdır")
    .max(50, "Soyisim çok uzun"),

  // Email 
  email: z
    .string({ required_error: "E-posta adresi zorunludur" })
    .email("Geçerli bir e-posta adresi giriniz"),

  // Password 
  password: z
    .string({ required_error: "Şifre zorunludur" })
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .regex(/[a-z]/, "Şifre en az bir küçük harf içermelidir")
    .regex(/[A-Z]/, "Şifre en az bir büyük harf içermelidir")
    .regex(/[0-9]/, "Şifre en az bir rakam içermelidir"),
});

// LOGIN SCHEMA
export const loginSchema = z.object({
  email: z
    .string({ required_error: "E-posta alanı boş bırakılamaz" })
    .email("Geçerli bir e-posta formatı giriniz"),
    
  password: z
    .string({ required_error: "Şifre alanı boş bırakılamaz" })
    .min(1, "Şifre girmelisiniz") 
});