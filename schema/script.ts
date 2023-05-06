import { prisma } from "./index";

async function main() {
  // ... you will write your Prisma Client queries here
  const users = await prisma.user.findMany({ where: { username: { startsWith: "t" } } });
  console.log(users);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
  });
