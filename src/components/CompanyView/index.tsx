import { Card, CardBody, Typography } from '@material-tailwind/react';

export type CompanyViewProps = {
    name: string;
    branch: string;
    address: string;
    sub_district: string;
    city: string;
    province: string;
    zip_code: number;
};

const CompanyView = (props: CompanyViewProps) => {
    if (props == ({} as any)) return null;

    let address = props.address;
    if (address) address = address.replaceAll(/,\s/g, '\r\n');

    return (
        <Card>
            <CardBody>
                <Typography variant="h3" as="h1">
                    {props.name}
                </Typography>
                <Typography variant="h4">{props.branch}</Typography>
                <Typography className="whitespace-pre-wrap">
                    {address}
                </Typography>
                <Typography>
                    Kec. {props.sub_district}, {props.city}
                </Typography>
                <Typography>
                    {props.province} - {props.zip_code}
                </Typography>
            </CardBody>
        </Card>
    );
};

export default CompanyView;
