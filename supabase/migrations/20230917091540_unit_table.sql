create table "public"."unit" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "serial_number" text not null,
    "series" text not null,
    "brand" text not null,
    "oem" text not null,
    "made_in" text not null,
    "yom" integer not null,
    "extra" jsonb not null default '{}'::jsonb,
    "user_id" uuid not null
);


alter table "public"."unit" enable row level security;

CREATE UNIQUE INDEX unit_pkey ON public.unit USING btree (id);

alter table "public"."unit" add constraint "unit_pkey" PRIMARY KEY using index "unit_pkey";

alter table "public"."unit" add constraint "unit_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."unit" validate constraint "unit_user_id_fkey";

create policy "user with unit_insert permission can insert data"
on "public"."unit"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'unit_insert'::text))::boolean = true))))));


create policy "user with unit_read permission can read data"
on "public"."unit"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'unit_read'::text))::boolean = true)))));


create policy "user with unit_update permission can update data"
on "public"."unit"
as permissive
for update
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'unit_update'::text))::boolean = true)))))
with check ((user_id = auth.uid()));



