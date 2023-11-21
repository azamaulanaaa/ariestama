import { useEffect, useState } from "react";
import { useRouter } from "next/router";

import DashboardLayout from "@/components/Layout/dashboard";
import { useAlertsSystem } from "@/components/AlertsSystem";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import Config from "@/config";
import InsertUnitForm, { InsertUnitData } from "@/components/InsertUnitForm";
import type { Unit } from "@/libs/Database";

const EditUnit = () => {
  const session = useSessionContext();
  const alertSystem = useAlertsSystem();
  const router = useRouter();

  const [unitData, setUnitData] = useState<Unit | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (session.user?.permission.unit_read == true && router.isReady) {
      const { id: query_id } = router.query;

      let id = query_id as string;
      if (query_id == undefined) return;
      if (Array.isArray(query_id[0])) id = query_id[0];

      session.database.unit.getsById(id).then((items) => {
        if (items.error) {
          return;
        }
        setUnitData(items.data[0]);
      });
    }

    setLoading(false);
  }, [session, router]);

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

    if (!unitData) {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "error",
        message: "No Unit to edit",
      });
      setLoading(false);
      return;
    }

    const result = await session.database.unit.update(unitData.id, {
      user_id: session.user.id,
      ...data,
    });
    if (result.error == null) {
      alertSystem.dispatch({
        kind: "add",
        id: new Date().toString(),
        type: "success",
        message: "Edit the unit successful.",
      });
      router.push({
        pathname: Config.Url.Dashboard + "/units/view",
        query: { id: unitData.id },
      });
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
    <DashboardLayout>
      <ProtectedPage
        hasAccess={
          session.user?.permission.unit_read == true &&
          session.user?.permission.unit_update == true
        }
        isReady={session.user !== undefined && !loading && router.isReady}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Edit Unit</h1>
            <InsertUnitForm onSubmit={handleSubmit} defaultValues={unitData} />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default EditUnit;
