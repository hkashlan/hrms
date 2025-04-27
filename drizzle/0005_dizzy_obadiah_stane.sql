ALTER TABLE "users" ADD COLUMN "name" varchar(255);--> statement-breakpoint
ALTER TABLE "users" ADD COLUMN "lastName" varchar(255) ;
UPDATE "users" SET "name" = "username" WHERE "name" IS NULL;--> statement-breakpoint
UPDATE "users" SET "lastName" = "username" WHERE "lastName" IS NULL;--> statement-breakpoint
ALTER TABLE "users" modify COLUMN "name" varchar(255) NOT NULL;--> statement-breakpoint
ALTER TABLE "users" modify COLUMN "lastName" varchar(255) NOT NULL;
