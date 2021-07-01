const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  const postedBy = await prisma.link
    .findUnique({ where: { id: 4 } })
    .postedBy();

  console.log(postedBy);
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect;
  });
