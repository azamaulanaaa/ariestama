create table "public"."company_snapshot" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "company_id" uuid not null,
    "user_id" uuid not null,
    "data" jsonb not null
);


alter table "public"."company_snapshot" enable row level security;

CREATE UNIQUE INDEX company_snapshot_pkey ON public.company_snapshot USING btree (id);

alter table "public"."company_snapshot" add constraint "company_snapshot_pkey" PRIMARY KEY using index "company_snapshot_pkey";

alter table "public"."company_snapshot" add constraint "company_snapshot_company_id_fkey" FOREIGN KEY (company_id) REFERENCES company(id) not valid;

alter table "public"."company_snapshot" validate constraint "company_snapshot_company_id_fkey";

alter table "public"."company_snapshot" add constraint "company_snapshot_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."company_snapshot" validate constraint "company_snapshot_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_company_snapshot()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO public.company_snapshot (
    company_id,
    user_id,
    created_at,
    data
  )
  VALUES (
    NEW.id, 
    NEW.user_id, 
    NEW.created_at,
    jsonb_build_object(
      'name', NEW.name, 
      'branch', NEW.branch,
      'address', NEW.address,
      'sub_district', NEW.sub_district,
      'city', NEW.city,
      'province', NEW.province,
      'zip_code', NEW.zip_code
    )
  );

  RETURN NEW;
END;$function$
;


CREATE OR REPLACE FUNCTION public.reset_company_created_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  NEW.created_at = now();
  RETURN NEW;
END;$function$
;

create policy "user with company_insert or company_update can insert data"
on "public"."company_snapshot"
as permissive
for insert
to authenticated
with check ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND (((("user".permission -> 'company_insert'::text))::boolean = true) OR ((("user".permission -> 'company_insert'::text))::boolean = true))))));


create policy "user with company_read permission can read data"
on "public"."company_snapshot"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'company_read'::text))::boolean = true)))));


CREATE TRIGGER on_company_changes AFTER INSERT OR UPDATE ON public.company FOR EACH ROW EXECUTE FUNCTION create_company_snapshot();

CREATE TRIGGER on_company_update BEFORE UPDATE ON public.company FOR EACH ROW EXECUTE FUNCTION reset_company_created_at();


