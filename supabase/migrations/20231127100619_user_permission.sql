drop policy "user with bookkeeping_account_insert permission can insert data" on "public"."bookkeeping_account";

drop policy "user with bookkeeping_account_read permission can read data" on "public"."bookkeeping_account";

drop policy "user with bookkeeping_account_update permission can update data" on "public"."bookkeeping_account";

drop policy "user with bookkeeping_trans_insert permission can insert data" on "public"."bookkeeping_transaction";

drop policy "user with bookkeeping_trans_read permission can read data" on "public"."bookkeeping_transaction";

drop policy "user with bookkeeping_trans_update permission can update data" on "public"."bookkeeping_transaction";

drop policy "user with company_insert permission can insert data" on "public"."company";

drop policy "user with company_read permission can read data" on "public"."company";

drop policy "user with company_update permission can update data" on "public"."company";

drop policy "user with company_insert or company_update can insert data" on "public"."company_snapshot";

drop policy "user with company_read permission can read data" on "public"."company_snapshot";

drop policy "user with unit_insert permission can insert data" on "public"."unit";

drop policy "user with unit_read permission can read data" on "public"."unit";

drop policy "user with unit_update permission can update data" on "public"."unit";

drop policy "user with unit_insert or unit_update permission can insert data" on "public"."unit_snapshot";

drop policy "user with unit_read permission can read data" on "public"."unit_snapshot";

create table "public"."user_permission" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "company_read" boolean not null default false,
    "company_insert" boolean not null default false,
    "company_update" boolean not null default false,
    "unit_read" boolean not null default false,
    "unit_insert" boolean not null default false,
    "unit_update" boolean not null default false,
    "bookkeeping_account_read" boolean not null default false,
    "bookkeeping_account_insert" boolean not null default false,
    "bookkeeping_account_update" boolean not null default false,
    "bookkeeping_transaction_read" boolean not null default false,
    "bookkeeping_transaction_insert" boolean not null default false,
    "bookkeeping_transaction_update" boolean not null default false,
    "caculators_safety" boolean not null default false,
    "user_permission_update" boolean not null default false
);


alter table "public"."user_permission" enable row level security;

alter table "public"."user" drop column "permission";

CREATE UNIQUE INDEX user_permission_pkey ON public.user_permission USING btree (id);

alter table "public"."user_permission" add constraint "user_permission_pkey" PRIMARY KEY using index "user_permission_pkey";

alter table "public"."user_permission" add constraint "user_permission_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user_permission" validate constraint "user_permission_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.new_user_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.user (id, name) VALUES (NEW.id, NEW.email);
  INSERT INTO public.user_permission (id) VALUES (NEW.id);
  RETURN NEW;
END;$function$
;

create policy "bookkeeping_account_insert"
on "public"."bookkeeping_account"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_account_insert = true))))));


create policy "bookkeeping_account_read"
on "public"."bookkeeping_account"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_account_read = true)))));


create policy "bookkeeping_account_update"
on "public"."bookkeeping_account"
as permissive
for update
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_account_update = true)))))
with check ((user_id = auth.uid()));


create policy "bookkeeping_transaction_insert"
on "public"."bookkeeping_transaction"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_transaction_insert = true))))));


create policy "bookkeeping_transaction_read"
on "public"."bookkeeping_transaction"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_transaction_read = true)))));


create policy "bookkeeping_transaction_update"
on "public"."bookkeeping_transaction"
as permissive
for update
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.bookkeeping_transaction_update = true)))))
with check ((user_id = auth.uid()));


create policy "company_insert"
on "public"."company"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.company_insert = true))))));


create policy "company_read"
on "public"."company"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.company_read = true)))));


create policy "company_update"
on "public"."company"
as permissive
for update
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.company_update = true)))))
with check ((user_id = auth.uid()));


create policy "company_insert or company_update"
on "public"."company_snapshot"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND ((user_permission.company_insert = true) OR (user_permission.company_update = true)))))));


create policy "company_read"
on "public"."company_snapshot"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.company_read = true)))));


create policy "unit_insert"
on "public"."unit"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.unit_insert = true))))));


create policy "unit_read"
on "public"."unit"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.unit_read = true)))));


create policy "unit_update"
on "public"."unit"
as permissive
for update
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.unit_update = true)))))
with check ((user_id = auth.uid()));


create policy "unit_insert or unit_update"
on "public"."unit_snapshot"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND ((user_permission.unit_insert = true) OR (user_permission.unit_update = true)))))));


create policy "unit_read"
on "public"."unit_snapshot"
as permissive
for select
to authenticated
using ((1 = ( SELECT count(user_permission.id) AS count
   FROM user_permission
  WHERE ((user_permission.id = auth.uid()) AND (user_permission.unit_read = true)))));


create policy "user can know its own permission"
on "public"."user_permission"
as permissive
for select
to authenticated
using ((id = auth.uid()));


create policy "user_permission_update"
on "public"."user_permission"
as permissive
for update
to authenticated
using ((1 = ( SELECT count(user_permission_1.id) AS count
   FROM user_permission user_permission_1
  WHERE ((user_permission_1.id = auth.uid()) AND (user_permission_1.user_permission_update = true)))))
with check (true);



