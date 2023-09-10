import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import useLayout from "@/components/Layout";
import DenseDisplay from "@/components/DenseDisplay";
import type { Company } from "@/libs/Database";
import Config from "@/config";
import CardHeader from "@/components/CardHeader";
import { HiPencil } from "react-icons/hi2";

const ViewCompanies = () => {
  const session = useSessionContext();
  useLayout().dashboard();
  const router = useRouter();

  const defaultCompanyData: Company = {
    id: "",
    name: "",
    branch: "",
    address: "",
    sub_district: "",
    city: "",
    province: "",
    zip_code: 0,
    user_id: "",
  };

  const [companyData, setCompanyData] = useState<Company>(defaultCompanyData);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (session.user?.permission.company_read == true && router.isReady) {
      const { id: query_id } = router.query;

      let id = query_id as string;
      if (query_id == undefined) return;
      if (Array.isArray(query_id[0])) id = query_id[0];

      session.database.company.getsById(id).then((items) => {
        if (items.error) {
          return;
        }
        setCompanyData(items.data[0]);
      });
    }

    setLoading(false);
  }, [session]);

  const handleEdit = () => {
    if (!router.isReady) return;
    router.push({
      pathname: "/dashboard/companies/edit",
      query: { id: companyData.id },
    });
  };

  return (
    <ProtectedPage
      hasAccess={session.user?.permission.company_read == true}
      isReady={session.user !== undefined && !loading}
      redirectUrl={Config.Url.SignIn}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <Typography
                data-testid="company-name"
                variant="h3"
                as="h1"
                color="blue-gray"
              >
                {companyData.name}
              </Typography>
              <Typography
                data-testid="company-branch"
                variant="h5"
                as="h2"
                color="blue-gray"
              >
                {companyData.branch}
              </Typography>
            </div>
            <div>
              <Button variant="text" size="sm" onClick={handleEdit}>
                <HiPencil className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
          <DenseDisplay
            variant="column"
            keys={{
              address: "Address",
              sub_district: "Sub District",
              city: "City",
              province: "Province",
              zip_code: "Zip Code",
            }}
            values={companyData}
          />
        </CardBody>
      </Card>
    </ProtectedPage>
  );
};

export default ViewCompanies;
