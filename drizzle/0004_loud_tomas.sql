CREATE TABLE "medias" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "medias_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar,
	"url" varchar,
	"mimeType" varchar,
	"size" integer
);
--> statement-breakpoint
CREATE TABLE "folders" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "folders_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar,
	"parentId" integer
);
--> statement-breakpoint
ALTER TABLE "folders" ADD CONSTRAINT "parent_fk" FOREIGN KEY ("parentId") REFERENCES "public"."folders"("id") ON DELETE cascade ON UPDATE cascade;