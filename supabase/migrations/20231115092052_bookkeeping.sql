create table "public"."bookkeeping_account" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "name" text not null,
    "user_id" uuid not null
);


alter table "public"."bookkeeping_account" enable row level security;

create table "public"."bookkeeping_transaction" (
    "id" uuid not null default gen_random_uuid(),
    "created_at" timestamp with time zone not null default now(),
    "source" uuid,
    "destination" uuid,
    "value" numeric not null,
    "description" text not null,
    "date" date not null default now(),
    "user_id" uuid not null
);


alter table "public"."bookkeeping_transaction" enable row level security;

CREATE UNIQUE INDEX bookkeeping_account_pkey ON public.bookkeeping_account USING btree (id);

CREATE UNIQUE INDEX bookkeeping_transaction_pkey ON public.bookkeeping_transaction USING btree (id);

alter table "public"."bookkeeping_account" add constraint "bookkeeping_account_pkey" PRIMARY KEY using index "bookkeeping_account_pkey";

alter table "public"."bookkeeping_transaction" add constraint "bookkeeping_transaction_pkey" PRIMARY KEY using index "bookkeeping_transaction_pkey";

alter table "public"."bookkeeping_account" add constraint "bookkeeping_account_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."bookkeeping_account" validate constraint "bookkeeping_account_user_id_fkey";

alter table "public"."bookkeeping_transaction" add constraint "bookkeeping_transaction_destination_fkey" FOREIGN KEY (destination) REFERENCES bookkeeping_account(id) not valid;

alter table "public"."bookkeeping_transaction" validate constraint "bookkeeping_transaction_destination_fkey";

alter table "public"."bookkeeping_transaction" add constraint "bookkeeping_transaction_source_fkey" FOREIGN KEY (source) REFERENCES bookkeeping_account(id) not valid;

alter table "public"."bookkeeping_transaction" validate constraint "bookkeeping_transaction_source_fkey";

alter table "public"."bookkeeping_transaction" add constraint "bookkeeping_transaction_user_id_fkey" FOREIGN KEY (user_id) REFERENCES "user"(id) not valid;

alter table "public"."bookkeeping_transaction" validate constraint "bookkeeping_transaction_user_id_fkey";

create policy "user with bookkeeping_account_insert permission can insert data"
on "public"."bookkeeping_account"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_account_insert'::text))::boolean = true))))));


create policy "user with bookkeeping_account_read permission can read data"
on "public"."bookkeeping_account"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_account_read'::text))::boolean = true)))));


create policy "user with bookkeeping_account_update permission can update data"
on "public"."bookkeeping_account"
as permissive
for update
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_account_update'::text))::boolean = true)))))
with check ((user_id = auth.uid()));


create policy "user with bookkeeping_trans_insert permission can insert data"
on "public"."bookkeeping_transaction"
as permissive
for insert
to authenticated
with check (((user_id = auth.uid()) AND (1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_trans_insert'::text))::boolean = true))))));


create policy "user with bookkeeping_trans_read permission can read data"
on "public"."bookkeeping_transaction"
as permissive
for select
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_trans_read'::text))::boolean = true)))));


create policy "user with bookkeeping_trans_update permission can update data"
on "public"."bookkeeping_transaction"
as permissive
for update
to authenticated
using ((1 = ( SELECT count("user".id) AS count
   FROM "user"
  WHERE (("user".id = auth.uid()) AND ((("user".permission -> 'bookkeeping_trans_update'::text))::boolean = true)))))
with check ((user_id = auth.uid()));



