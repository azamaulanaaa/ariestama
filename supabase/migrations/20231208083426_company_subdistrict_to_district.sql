alter table "public"."company" drop column "sub_district";

alter table "public"."company" add column "district" text not null;


