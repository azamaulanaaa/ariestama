create table "public"."unit_snapshot" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "unit_id" uuid not null,
    "user_id" uuid not null,
    "data" jsonb not null
);


alter table "public"."unit_snapshot" enable row level security;

CREATE UNIQUE INDEX unit_snapshot_pkey ON public.unit_snapshot USING btree (id);

alter table "public"."unit_snapshot" add constraint "unit_snapshot_pkey" PRIMARY KEY using index "unit_snapshot_pkey";

alter table "public"."unit_snapshot" add constraint "unit_snapshot_unit_id_fkey" FOREIGN KEY (unit_id) REFERENCES unit(id) not valid;

alter table "public"."unit_snapshot" validate constraint "unit_snapshot_unit_id_fkey";

alter table "public"."unit_snapshot" add constraint "unit_snapshot_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."unit_snapshot" validate constraint "unit_snapshot_user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.create_unit_snapshot()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  INSERT INTO public.unit_snapshot (
    unit_id,
    user_id,
    created_at,
    data
  )
  VALUES (
    NEW.id, 
    NEW.user_id, 
    NEW.created_at, 
    jsonb_build_object(
      'serial_number', NEW.serial_number,
      'series', NEW.series, 
      'brand', NEW.brand,
      'oem', NEW.oem,
      'made_in', NEW.made_in,
      'yom', NEW.yom,
      'extra', NEW.extra
    )
  );
  
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE FUNCTION public.reset_unit_created_at()
 RETURNS trigger
 LANGUAGE plpgsql
AS $function$BEGIN
  NEW.created_at = now();
  RETURN NEW;
END;$function$
;

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

create policy "user with unit_insert or unit_update permission can insert data"
on "public"."unit_snapshot"
as permissive
for insert
to authenticated
with check ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND (((("user".permission -> 'unit_insert'::text))::boolean = true) OR ((("user".permission -> 'unit_update'::text))::boolean = true))))));


create policy "user with unit_read permission can read data"
on "public"."unit_snapshot"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'unit_read'::text))::boolean = true)))));


CREATE TRIGGER on_unit_changes AFTER INSERT OR UPDATE ON public.unit FOR EACH ROW EXECUTE FUNCTION create_unit_snapshot();

CREATE TRIGGER on_unit_update BEFORE UPDATE ON public.unit FOR EACH ROW EXECUTE FUNCTION reset_unit_created_at();


