create table "public"."company" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "branch" text not null,
    "address" text not null,
    "sub_district" text not null,
    "city" text not null,
    "province" text not null,
    "zip_code" bigint not null,
    "user_id" uuid not null
);


alter table "public"."company" enable row level security;

CREATE UNIQUE INDEX company_pkey ON public.company USING btree (id);

alter table "public"."company" add constraint "company_pkey" PRIMARY KEY using index "company_pkey";

alter table "public"."company" add constraint "company_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."company" validate constraint "company_user_id_fkey";

create policy "user with company_insert permission can insert data"
on "public"."company"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'company_insert'::text))::boolean = true))))));


create policy "user with company_read permission can read data"
on "public"."company"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'company_read'::text))::boolean = true)))));


create policy "user with company_update permission can update data"
on "public"."company"
as permissive
for update
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'company_update'::text))::boolean = true)))))
with check ((user_id = auth.uid()));



