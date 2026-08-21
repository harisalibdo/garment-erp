"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const connectionString = process.env.DATABASE_URL;
if (!connectionString) {
    throw new Error('DATABASE_URL is not configured');
}
const prisma = new client_1.PrismaClient({
    adapter: new adapter_pg_1.PrismaPg({ connectionString }),
});
const fabricTypes = [
    { code: 'JACQUARD_LAWN', name: 'Jacquard Lawn' },
    { code: 'DOBBY_LAWN', name: 'Dobby Lawn' },
    { code: 'COTTON', name: 'Cotton' },
    { code: 'CHIFFON', name: 'Chiffon' },
    { code: 'JACQUARD_VISCOSE', name: 'Jacquard Viscose' },
    { code: 'VISCOSE', name: 'Viscose' },
    { code: 'SILK', name: 'Silk' },
    { code: 'NET', name: 'Net' },
    { code: 'MALAI', name: 'Malai' },
    { code: 'RAW_SILK', name: 'Raw Silk' },
];
async function seed() {
    await prisma.$transaction(fabricTypes.map((fabricType) => prisma.fabricType.upsert({
        where: { code: fabricType.code },
        create: fabricType,
        update: { name: fabricType.name, active: true },
    })));
}
seed()
    .then(() => prisma.$disconnect())
    .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exitCode = 1;
});
//# sourceMappingURL=seed.js.map