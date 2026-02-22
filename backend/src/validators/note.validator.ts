import { z } from 'zod';

export const noteSchema = z.object({
  title: z
    .string()
    .min(1, "Başlık boş olamaz")
    .max(100, "Başlık 100 karakterden uzun olamaz"),
  
  content: z
    .string()
    .min(1, "İçerik boş olamaz"),

  isPublic: z
    .boolean()
    .optional()
    .default(true)
});