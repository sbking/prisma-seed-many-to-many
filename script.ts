import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const roles = await prisma.role.findMany({
    include: {
      _count: {
        select: {
          users: true,
        },
      },
    },
  });

  console.info("Roles:");
  for (const role of roles) {
    console.info(` - ${role.name} (${role._count.users} users)`);
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
