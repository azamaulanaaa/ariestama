import DashboardLayout from "@/components/Layout/dashboard";
import { useAlertsSystem } from "@/components/AlertsSystem";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import Config from "@/config";
import { useState } from "react";
import { useRouter } from "next/router";
import InsertUnitForm, { InsertUnitData } from "@/components/InsertUnitForm";

const InsertCompany = () => {
  const session = useSessionContext();
  const alertSystem = useAlertsSystem();
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (data: InsertUnitData) => {
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

    const result = await session.database.unit.insert({
      user_id: session.user.id,
      extra: {},
      ...data,
    });
    if (result.error == null) {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "success",
        message: "Insert a unit successful.",
      });
      router.push(Config.Url.Dashboard + "/units");
    } else {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: result.error.text,
      });
      setLoading(false);
    }
  };

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={session.user?.permission.unit_insert == true}
        isReady={session.user !== undefined && !loading}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Insert Unit</h1>
            <InsertUnitForm onSubmit={handleSubmit} />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default InsertCompany;
