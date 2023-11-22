import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "@/layout/Dashboard";
import { useAlertsContext } from "@/contexts/Alerts";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import { useSessionContext } from "@/contexts/Session";
import Config from "@/config";
import InsertCompanyForm, {
  InsertCompanyData,
} from "@/features/company/InsertCompanyForm";
import type { Company } from "@/services/database";

const EditCompany = () => {
  const session = useSessionContext();
  const router = useRouter();
  const alert = useAlertsContext();

  const [companyData, setCompanyData] = useState<Company | undefined>(
    undefined,
  );
  const [loading, setLoading] = useState<boolean>(false);

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
  }, [session, router]);

  const handleSubmit = async (data: InsertCompanyData) => {
    setLoading(true);
    if (!session.user) {
      alert.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: "Unauthorize user.",
      });
      setLoading(false);
      return;
    }

    if (!companyData) {
      alert.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: "No company to edit",
      });
      setLoading(false);
      return;
    }

    const result = await session.database.company.update(companyData.id, {
      user_id: session.user.id,
      ...data,
    });
    if (result.error == null) {
      alert.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "success",
        message: "Edit the company successful.",
      });
      router.push({
        pathname: "/company/view",
        query: { id: companyData.id },
      });
      return;
    } else {
      alert.dispatch({
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
    <DashboardLayout>
      <ProtectedPage
        hasAccess={
          session.user?.permission.company_read == true &&
          session.user?.permission.company_update == true
        }
        isReady={session.user !== undefined && !loading && router.isReady}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Edit Company</h1>
            <InsertCompanyForm
              onSubmit={handleSubmit}
              defaultValues={companyData}
            />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default EditCompany;
