import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/router";

import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";
import { useSessionContext } from "@/contexts/Session";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import DashboardLayout from "@/layout/Dashboard";
import useUserSession from "@/hooks/useUserSession";
import { DatabaseRaw } from "@/services/database";
import CompanyForm from "@/features/company/CompanyForm";

const EditCompany = () => {
  const alerts = useAlertsContext();
  const session = useSessionContext();
  const user = useUserSession(session.database);
  const router = useRouter();

  const [companyData, setCompanyData] = useState<
    DatabaseRaw["public"]["Tables"]["company"]["Row"]
  >({
    id: "",
    name: "",
    branch: "",
    address: "",
    sub_district: "",
    city: "",
    province: "",
    zip_code: NaN,
    user_id: "",
    created_at: "",
  });
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const { id } = router.query;
    if (id) {
      session.database
        .from("company")
        .select()
        .eq("id", id.toString())
        .then(({ data, error }) => {
          if (error) {
            alerts.dispatch({
              kind: "add",
              id: Date.now().toString(),
              type: "error",
              message: error.message,
            });
          }

          if (data) {
            if (data.length > 0) {
              setCompanyData(data[0]);
              setLoading(false);
            } else {
              alerts.dispatch({
                kind: "add",
                id: Date.now().toString(),
                type: "error",
                message: "No company data is found.",
              });
            }
          }
        });
    }
  }, [router.query.id]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (companyData) {
      session.database
        .from("company")
        .update({
          name: data.name.toString(),
          branch: data.branch.toString(),
          address: data.address.toString(),
          sub_district: data.sub_district.toString(),
          city: data.city.toString(),
          province: data.province.toString(),
          zip_code: parseInt(data.zip_code.toString()),
        })
        .eq("id", companyData.id)
        .then(({ error }) => {
          if (error) {
            alerts.dispatch({
              kind: "add",
              id: Date.now().toString(),
              type: "error",
              message: error.message,
            });
            setLoading(false);
          } else {
            alerts.dispatch({
              kind: "add",
              id: Date.now().toString(),
              type: "success",
              message: "Company update success",
            });
            router.push({
              pathname: "/company/view",
              query: {
                id: companyData.id,
              },
            });
          }
        });
    }
  };

  return (
    <ProtectedPage
      hasAccess={
        user.permission?.data?.company_read == true &&
        user.permission?.data?.company_update == true
      }
      isReady={user.permission?.data != null && !loading && router.isReady}
      redirectUrl={Config.Url.Dashboard}
    >
      <DashboardLayout>
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Edit Company</h1>
            <CompanyForm
              onSubmit={handleSubmit}
              defaultValue={{
                ...companyData,
                zip_code: companyData.zip_code
                  ? String(companyData.zip_code)
                  : "",
              }}
            />
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default EditCompany;
