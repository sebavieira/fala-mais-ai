import crypto from "node:crypto";
import { Prisma } from "@prisma/client";
import { prisma } from "@repo/db";
import { z } from "zod";

const inputSchema = z.object({
  tenantName: z.string().min(1, "tenantName is required"),
  adminEmail: z.string().email(),
  adminName: z.string().min(1, "adminName is required"),
  adminRole: z.string().min(1).default("admin"),
});

export type BootstrapInput = z.infer<typeof inputSchema>;

const tenantSchemaRegex = /^tenant_[0-9a-f-]{36}$/i;

type AdminUserRecord = {
  id: string;
  tenant_id: string;
  email: string;
  name: string;
  role: string;
  created_at: Date;
};

function assertTenantSchemaName(schemaName: string) {
  if (!tenantSchemaRegex.test(schemaName)) {
    throw new Error("Invalid tenant schema name format");
  }
}

function buildSchemaName(tenantId: string) {
  const schemaName = `tenant_${tenantId}`;
  assertTenantSchemaName(schemaName);
  return schemaName;
}

export async function bootstrapTenant(input: BootstrapInput) {
  const data = inputSchema.parse(input);
  const tenantId = crypto.randomUUID();
  const adminId = crypto.randomUUID();
  const schemaName = buildSchemaName(tenantId);

  const { tenant, adminUser } = await prisma.$transaction(async (tx) => {
    await tx.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS "${schemaName}"`);

    const tenant = await tx.tenant.create({
      data: {
        id: tenantId,
        name: data.tenantName,
        schemaName,
      },
    });

    await tx.$executeRawUnsafe(
      `CREATE TABLE IF NOT EXISTS "${schemaName}"."users" (
        id uuid PRIMARY KEY,
        tenant_id uuid NOT NULL REFERENCES public.tenants(id) ON DELETE CASCADE,
        email text NOT NULL UNIQUE,
        name text NOT NULL,
        role text NOT NULL,
        created_at timestamptz NOT NULL DEFAULT now()
      )`
    );

    const adminUsers = await tx.$queryRaw<AdminUserRecord[]>(
      Prisma.sql`INSERT INTO ${Prisma.raw(
        `"${schemaName}"."users"`
      )} ("id", "tenant_id", "email", "name", "role")
      VALUES (${adminId}, ${tenantId}, ${data.adminEmail}, ${data.adminName}, ${
        data.adminRole
      })
      RETURNING "id", "tenant_id", "email", "name", "role", "created_at"`
    );

    if (!adminUsers[0]) {
      throw new Error("Failed to create admin user in tenant schema");
    }

    return { tenant, adminUser: adminUsers[0] };
  });

  return {
    tenant,
    adminUser,
    schemaName,
  };
}
