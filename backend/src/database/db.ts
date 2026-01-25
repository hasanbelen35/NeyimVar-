import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function connectDB(): Promise<void> {
  try {
    await prisma.$connect();
    console.log("✅ MySQL veritabanına bağlanıldı");
  } catch (error) {
    console.error("❌ Veritabanı bağlantı hatası:", error);
    process.exit(1);
  }
}

export default prisma;
