import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ payload, req }: MigrateUpArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   CREATE TYPE "public"."enum_products_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__products_v_version_status" AS ENUM('draft', 'published');
  CREATE TABLE IF NOT EXISTS "products_variants_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_image" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_variant" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_related_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_id" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_product_options_option_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_option_value" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products_product_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"product_option" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "products" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"medusa_product_id" varchar,
  	"title" varchar,
  	"description" jsonb,
  	"published_at" timestamp(3) with time zone,
  	"slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_products_status" DEFAULT 'draft'
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_variants_images" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_image" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_variants" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_variant" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_related_products" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_id" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_product_options_option_values" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_option_value" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v_version_product_options" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_option" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE IF NOT EXISTS "_products_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_medusa_product_id" varchar,
  	"version_title" varchar,
  	"version_description" jsonb,
  	"version_published_at" timestamp(3) with time zone,
  	"version_slug" varchar,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__products_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "products_id" integer;
  DO $$ BEGIN
   ALTER TABLE "products_variants_images" ADD CONSTRAINT "products_variants_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_variants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_variants" ADD CONSTRAINT "products_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_related_products" ADD CONSTRAINT "products_related_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_product_options_option_values" ADD CONSTRAINT "products_product_options_option_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products_product_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "products_product_options" ADD CONSTRAINT "products_product_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_variants_images" ADD CONSTRAINT "_products_v_version_variants_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_variants"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_variants" ADD CONSTRAINT "_products_v_version_variants_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_related_products" ADD CONSTRAINT "_products_v_version_related_products_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_product_options_option_values" ADD CONSTRAINT "_products_v_version_product_options_option_values_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v_version_product_options"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v_version_product_options" ADD CONSTRAINT "_products_v_version_product_options_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_products_v"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  DO $$ BEGIN
   ALTER TABLE "_products_v" ADD CONSTRAINT "_products_v_parent_id_products_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."products"("id") ON DELETE set null ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "products_variants_images_order_idx" ON "products_variants_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_variants_images_parent_id_idx" ON "products_variants_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_variants_order_idx" ON "products_variants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_variants_parent_id_idx" ON "products_variants" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_related_products_order_idx" ON "products_related_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_related_products_parent_id_idx" ON "products_related_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_product_options_option_values_order_idx" ON "products_product_options_option_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_product_options_option_values_parent_id_idx" ON "products_product_options_option_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_product_options_order_idx" ON "products_product_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "products_product_options_parent_id_idx" ON "products_product_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "products_slug_idx" ON "products" USING btree ("slug");
  CREATE INDEX IF NOT EXISTS "products_updated_at_idx" ON "products" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "products_created_at_idx" ON "products" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "products__status_idx" ON "products" USING btree ("_status");
  CREATE INDEX IF NOT EXISTS "_products_v_version_variants_images_order_idx" ON "_products_v_version_variants_images" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_variants_images_parent_id_idx" ON "_products_v_version_variants_images" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_variants_order_idx" ON "_products_v_version_variants" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_variants_parent_id_idx" ON "_products_v_version_variants" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_related_products_order_idx" ON "_products_v_version_related_products" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_related_products_parent_id_idx" ON "_products_v_version_related_products" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_product_options_option_values_order_idx" ON "_products_v_version_product_options_option_values" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_product_options_option_values_parent_id_idx" ON "_products_v_version_product_options_option_values" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_product_options_order_idx" ON "_products_v_version_product_options" USING btree ("_order");
  CREATE INDEX IF NOT EXISTS "_products_v_version_product_options_parent_id_idx" ON "_products_v_version_product_options" USING btree ("_parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_parent_idx" ON "_products_v" USING btree ("parent_id");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_slug_idx" ON "_products_v" USING btree ("version_slug");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_updated_at_idx" ON "_products_v" USING btree ("version_updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version_created_at_idx" ON "_products_v" USING btree ("version_created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_version_version__status_idx" ON "_products_v" USING btree ("version__status");
  CREATE INDEX IF NOT EXISTS "_products_v_created_at_idx" ON "_products_v" USING btree ("created_at");
  CREATE INDEX IF NOT EXISTS "_products_v_updated_at_idx" ON "_products_v" USING btree ("updated_at");
  CREATE INDEX IF NOT EXISTS "_products_v_latest_idx" ON "_products_v" USING btree ("latest");
  DO $$ BEGIN
   ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_products_fk" FOREIGN KEY ("products_id") REFERENCES "public"."products"("id") ON DELETE cascade ON UPDATE no action;
  EXCEPTION
   WHEN duplicate_object THEN null;
  END $$;
  
  CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_products_id_idx" ON "payload_locked_documents_rels" USING btree ("products_id");`)
}

export async function down({ payload, req }: MigrateDownArgs): Promise<void> {
  await payload.db.drizzle.execute(sql`
   ALTER TABLE "products_variants_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_related_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_product_options_option_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products_product_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_variants_images" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_variants" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_related_products" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_product_options_option_values" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v_version_product_options" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_products_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "products_variants_images" CASCADE;
  DROP TABLE "products_variants" CASCADE;
  DROP TABLE "products_related_products" CASCADE;
  DROP TABLE "products_product_options_option_values" CASCADE;
  DROP TABLE "products_product_options" CASCADE;
  DROP TABLE "products" CASCADE;
  DROP TABLE "_products_v_version_variants_images" CASCADE;
  DROP TABLE "_products_v_version_variants" CASCADE;
  DROP TABLE "_products_v_version_related_products" CASCADE;
  DROP TABLE "_products_v_version_product_options_option_values" CASCADE;
  DROP TABLE "_products_v_version_product_options" CASCADE;
  DROP TABLE "_products_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_products_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_products_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "products_id";
  DROP TYPE "public"."enum_products_status";
  DROP TYPE "public"."enum__products_v_version_status";`)
}
