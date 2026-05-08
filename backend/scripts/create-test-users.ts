import { PrismaClient } from "@prisma/client";
import * as bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = "OceanCyber123!";
  const hash = await bcrypt.hash(password, 12);

  const adminEmail = "admin@oceancyber.net";
  const userEmail = "user@oceancyber.net";

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash: hash, role: "admin", fullName: "Admin Tester" },
    create: { email: adminEmail, passwordHash: hash, role: "admin", fullName: "Admin Tester" },
  });

  await prisma.user.upsert({
    where: { email: userEmail },
    update: { passwordHash: hash, role: "user", fullName: "User Tester" },
    create: { email: userEmail, passwordHash: hash, role: "user", fullName: "User Tester" },
  });

  console.log("-----------------------------------------");
  console.log("SUCCESS: Test accounts created/updated.");
  console.log("Admin: admin@oceancyber.net");
  console.log("User: user@oceancyber.net");
  console.log("Password: OceanCyber123!");
  console.log("-----------------------------------------");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
