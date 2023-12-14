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
      'district', NEW.district,
      'city', NEW.city,
      'province', NEW.province,
      'zip_code', NEW.zip_code
    )
  );

  RETURN NEW;
END;$function$
;


