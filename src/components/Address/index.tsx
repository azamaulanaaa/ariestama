import { Typography } from '@material-tailwind/react';

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
    if (address) address = address.replaceAll(/,\s/g, '\r\n');

    return (
        <div data-testid="address">
            <Typography className="whitespace-pre-wrap">{address}</Typography>
            <Typography>
                Kec. {props.sub_district}, {props.city}
            </Typography>
            <Typography>
                {props.province} - {props.zip_code}
            </Typography>
        </div>
    );
};

export default Address;
