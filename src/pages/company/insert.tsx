import { useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "@/layout/Dashboard";
import { useAlertsContext } from "@/contexts/Alerts";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import { useSessionContext } from "@/contexts/Session";
import Config from "@/config";
import InsertCompanyForm, {
  InsertCompanyData,
} from "@/features/company/InsertCompanyForm";

const InsertCompany = () => {
  const session = useSessionContext();
  const router = useRouter();
  const alert = useAlertsContext();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: InsertCompanyData) => {
    setLoading(true);
    if (!session.user) {
      alert.dispatch({
        kind: "add",
        id: Date.now().toString(),
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
      alert.dispatch({
        kind: "add",
        id: Date.now().toString(),
        type: "success",
        message: "Insert a company successful.",
      });
      router.push("/company");
      return;
    } else {
      alert.dispatch({
        kind: "add",
        id: Date.now().toString(),
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
        hasAccess={session.user?.permission.company_insert == true}
        isReady={session.user !== undefined && !loading}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Insert Company</h1>
            <InsertCompanyForm onSubmit={handleSubmit} />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default InsertCompany;
