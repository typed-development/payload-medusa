import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_product_categories_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_categories_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "product_categories_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "product_categories" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"slug" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_product_categories_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_product_categories_v_version_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_product_categories_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_slug" varchar,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__product_categories_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "product_categories_id" integer;
  DO $$ BEGIN
   ALTER TABLE "product_categories_products" ADD CONSTRAINT "product_categories_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_product_categories_v_version_products" ADD CONSTRAINT "_product_categories_v_version_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_categories_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_product_categories_v" ADD CONSTRAINT "_product_categories_v_parent_id_product_categories_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."product_categories"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "product_categories_products_order_idx" ON "product_categories_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "product_categories_products_parent_id_idx" ON "product_categories_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "product_categories_slug_idx" ON "product_categories" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "product_categories_updated_at_idx" ON "product_categories" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "product_categories_created_at_idx" ON "product_categories" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "product_categories__status_idx" ON "product_categories" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_products_order_idx" ON "_product_categories_v_version_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_products_parent_id_idx" ON "_product_categories_v_version_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_parent_idx" ON "_product_categories_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_version_slug_idx" ON "_product_categories_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_version_updated_at_idx" ON "_product_categories_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_version_created_at_idx" ON "_product_categories_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_version_version__status_idx" ON "_product_categories_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_created_at_idx" ON "_product_categories_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_updated_at_idx" ON "_product_categories_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_product_categories_v_latest_idx" ON "_product_categories_v" USING btree ("latest");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_product_categories_fk" FOREIGN KEY ("product_categories_id") REFERENCES "public"."product_categories"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_product_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("product_categories_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "product_categories_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "product_categories" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_categories_v_version_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_product_categories_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "product_categories_products" CASCADE;
  DROP TABLE "product_categories" CASCADE;
  DROP TABLE "_product_categories_v_version_products" CASCADE;
  DROP TABLE "_product_categories_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_product_categories_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_product_categories_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "product_categories_id";
  DROP TYPE "public"."enum_product_categories_status";
  DROP TYPE "public"."enum__product_categories_v_version_status";`)
}
