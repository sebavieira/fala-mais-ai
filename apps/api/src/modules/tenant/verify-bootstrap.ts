import { Prisma } from "@prisma/client";
import { prisma } from "@repo/db";

const tenantSchemaRegex = /^tenant_[0-9a-f-]{36}$/i;

const tenantId = process.env.TENANT_ID;
const adminEmail = process.env.ADMIN_EMAIL;

if (!process.env.DATABASE_URL || !tenantId || !adminEmail) {
  console.log(
    "Skipping bootstrap verification. Set DATABASE_URL, TENANT_ID, and ADMIN_EMAIL to run checks."
  );
  process.exit(0);
}

async function verify() {
  const tenant = await prisma.tenant.findUnique({ where: { id: tenantId } });
  if (!tenant) {
    throw new Error("Tenant record not found in public schema");
  }

  const schemaName = tenant.schemaName;
  if (!tenantSchemaRegex.test(schemaName)) {
    throw new Error("Invalid tenant schema name format");
  }
  const schemaRows = await prisma.$queryRaw(
    Prisma.sql`SELECT schema_name FROM information_schema.schemata WHERE schema_name = ${schemaName}`
  );

  if (!Array.isArray(schemaRows) || schemaRows.length === 0) {
    throw new Error(`Tenant schema ${schemaName} does not exist`);
  }

  const adminUsers = await prisma.$queryRaw<
    Array<{ id: string; email: string; tenant_id: string }>
  >(
    Prisma.sql`SELECT id, email, tenant_id FROM ${Prisma.raw(
      `"${schemaName}"."users"`
    )} WHERE email = ${adminEmail} LIMIT 1`
  );

  if (!Array.isArray(adminUsers) || adminUsers.length === 0) {
    throw new Error("Admin user not found in tenant schema");
  }

  if (adminUsers[0].tenant_id !== tenantId) {
    throw new Error("Admin user not associated with tenant");
  }

  console.log("Bootstrap verification passed.");
}

verify()
  .catch((error) => {
    console.error("Bootstrap verification failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
