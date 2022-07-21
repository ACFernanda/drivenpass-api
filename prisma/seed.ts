import bcrypt from "bcrypt";

import prisma from "../src/config/db.js";

async function main() {
  const SALT = 10;
  const hashedPassword = bcrypt.hashSync("admin", SALT);

  await prisma.users.upsert({
    where: { email: "admin@admin.com" },
    update: {},
    create: {
      email: "admin@admin.com",
      password: hashedPassword,
    },
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
