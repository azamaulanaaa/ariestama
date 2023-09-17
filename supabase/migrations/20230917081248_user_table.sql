create table "public"."user" (
    "id" uuid not null,
    "created_at" timestamp with time zone not null default now(),
    "permission" jsonb not null default '{}'::jsonb,
    "name" text not null
);


alter table "public"."user" enable row level security;

CREATE UNIQUE INDEX user_pkey ON public."user" USING btree (id);

alter table "public"."user" add constraint "user_pkey" PRIMARY KEY using index "user_pkey";

alter table "public"."user" add constraint "user_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) not valid;

alter table "public"."user" validate constraint "user_id_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.new_user_data()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
AS $function$BEGIN
  INSERT INTO public.user (id, name) VALUES (NEW.id, NEW.email);
  RETURN NEW;
END;$function$
;

CREATE OR REPLACE TRIGGER on_new_user
 AFTER INSERT ON auth.users
 FOR EACH ROW
 EXECUTE FUNCTION public.new_user_data();

create policy "Enable read access for all users"
on "public"."user"
as permissive
for select
to authenticated
using (true);



