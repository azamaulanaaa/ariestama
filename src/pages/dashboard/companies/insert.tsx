import { Card, CardBody, Typography } from "@material-tailwind/react";

import useLayout from "@/components/Layout";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import Config from "@/config";
import { useState } from "react";
import { useRouter } from "next/router";
import InsertCompanyForm, {
  InsertCompanyData,
} from "@/components/InsertCompanyForm";

const InsertCompany = () => {
  const session = useSessionContext();
  const router = useRouter();
  const alertSystem = useLayout().dashboard().useAlertsSystem();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: InsertCompanyData) => {
    setLoading(true);
    if (!session.user) {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: "Unauthorize user.",
      });
      setLoading(false);
      return;
    }

    const result = await session.database.company.insert({
      user_id: session.user.id,
      ...data,
    });
    if (result.error == null) {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "success",
        message: "Insert a company successful.",
      });
      router.push(Config.Url.Dashboard + "/companies");
      return;
    } else {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: result.error.text,
      });
      setLoading(false);
      return;
    }
  };

  return (
    <ProtectedPage
      hasAccess={session.user?.permission.company_insert == true}
      isReady={session.user !== undefined && !loading}
      redirectUrl={Config.Url.Dashboard}
    >
      <Card>
        <CardBody className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Typography variant="h3" as="h1" color="blue-gray">
              Insert Company
            </Typography>
          </div>
          <InsertCompanyForm onSubmit={handleSubmit} />
        </CardBody>
      </Card>
    </ProtectedPage>
  );
};

export default InsertCompany;
