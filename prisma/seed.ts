import { randomUUID } from "crypto";
import { faker } from "@faker-js/faker";
import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Cleanup existing data
  await prisma.role.deleteMany();
  await prisma.user.deleteMany();

  // Create 20 random roles
  const roles = Array.from({ length: 20 }, () => ({
    id: randomUUID(),
    name: faker.helpers.unique(faker.company.catchPhraseNoun),
  })) satisfies Prisma.RoleCreateManyInput[];

  // Create 10000 random users
  const users = Array.from({ length: 10000 }, () => ({
    id: randomUUID(),
    email: faker.internet.email(),
  })) satisfies Prisma.UserCreateManyInput[];

  // Create between 1 and 10 roles per user
  const userRoles = users.flatMap((user) => {
    const count = faker.datatype.number({ min: 1, max: 10 });
    const selectedRoles = faker.helpers.arrayElements(roles, count);
    return selectedRoles.map((role) => ({
      userId: user.id,
      roleId: role.id,
    }));
  }) satisfies Prisma.UserRoleCreateManyInput[];

  // Seed the database
  await prisma.$transaction([
    prisma.role.createMany({ data: roles }),
    prisma.user.createMany({ data: users }),
    prisma.userRole.createMany({ data: userRoles }),
  ]);

  console.log(`Database has been seeded. 🌱`);
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
