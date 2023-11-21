export type AddressProps = {
  address: string;
  sub_district: string;
  city: string;
  province: string;
  zip_code: number;
};

const Address = (props: AddressProps) => {
  if (props == ({} as any)) return null;

  let address = props.address;
  if (address) address = address.replaceAll(/,\s/g, "\r\n");

  return (
    <div data-testid="address" className="prose">
      <p className="whitespace-pre-wrap">{address}</p>
      <p>
        Kec. {props.sub_district}, {props.city}
      </p>
      <p>
        {props.province} - {props.zip_code}
      </p>
    </div>
  );
};

export default Address;
