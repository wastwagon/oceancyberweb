import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const testPass = "OceanCyber123!";
  const testHash = await bcrypt.hash(testPass, 12);

  const users = [
    { email: "admin@oceancyber.net", fullName: "Test Administrator", role: "admin" },
    { email: "user@oceancyber.net", fullName: "Test Client", role: "user" },
  ];

  for (const u of users) {
    await prisma.user.upsert({
      where: { email: u.email },
      create: {
        email: u.email,
        passwordHash: testHash,
        fullName: u.fullName,
        role: u.role,
      },
      update: {
        passwordHash: testHash,
        fullName: u.fullName,
        role: u.role,
      },
    });
    console.log(`Upserted user: ${u.email}`);
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
