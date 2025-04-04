const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

// Mocha globals
const { before, after } = require('mocha');

before(async () => {
  // Clean the database before all tests
  await prisma.vehicle.deleteMany();
});

after(async () => {
  // Clean the database after all tests
  await prisma.vehicle.deleteMany();
  await prisma.$disconnect();
});
