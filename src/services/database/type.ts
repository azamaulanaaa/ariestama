export type Error = {
  code: string;
  text: string;
};

export type Result<T> = {
  error: Error | null;
  data: T[];
  count: number;
};

export type User = {
  id: string;
  name: string;
  permission: UserPermission;
};

export type UserPermission = {
  bookkeeping_account_read?: boolean;
  bookkeeping_account_insert?: boolean;
  bookkeeping_acocunt_update?: boolean;
  bookkeeping_trans_read?: boolean;
  bookkeeping_trans_insert?: boolean;
  bookkeeping_trans_update?: boolean;
  company_read?: boolean;
  company_insert?: boolean;
  company_update?: boolean;
  unit_read?: boolean;
  unit_insert?: boolean;
  unit_update?: boolean;
  calculators_safety?: boolean;
};

export type Company = {
  id: string;
  name: string;
  branch: string;
  address: string;
  sub_district: string;
  city: string;
  province: string;
  zip_code: number;
  user_id: string;
};

export type Unit = {
  id: string;
  serial_number: string;
  series: string;
  brand: string;
  oem: string;
  yom: number;
  made_in: string;
  user_id: string;
  extra: {};
};
