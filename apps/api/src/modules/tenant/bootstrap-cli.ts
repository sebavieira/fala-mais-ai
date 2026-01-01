import { bootstrapTenant } from "./bootstrap.js";

const tenantName = process.env.TENANT_NAME;
const adminEmail = process.env.ADMIN_EMAIL;
const adminName = process.env.ADMIN_NAME;
const adminRole = process.env.ADMIN_ROLE;

if (!tenantName || !adminEmail || !adminName) {
  console.error(
    "Missing required inputs. Provide TENANT_NAME, ADMIN_EMAIL, and ADMIN_NAME via env."
  );
  process.exit(1);
}

type BootstrapResult = Awaited<ReturnType<typeof bootstrapTenant>>;

bootstrapTenant({
  tenantName,
  adminEmail,
  adminName,
  adminRole: adminRole || "admin",
})
  .then(({ tenant, adminUser, schemaName }: BootstrapResult) => {
    console.log("Tenant bootstrap completed.");
    console.log({
      tenantId: tenant.id,
      tenantName: tenant.name,
      schemaName,
      adminUserId: adminUser?.id,
      adminEmail: adminUser?.email,
    });
  })
  .catch((error: unknown) => {
    console.error("Tenant bootstrap failed.");
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    const { prisma } = await import("@repo/db");
    await prisma.$disconnect();
  });
