import { FormEvent, useState } from "react";
import { useRouter } from "next/router";

import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";
import { useSessionContext } from "@/contexts/Session";
import useUserSession from "@/hooks/useUserSession";
import DashboardLayout from "@/layout/Dashboard";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import CompanyForm from "@/features/company/CompanyForm";
import Loading from "@/features/authentication/Loading";
import ProtectedContent from "@/features/authentication/ProtectedContent";

const InsertCompany = () => {
  const alerts = useAlertsContext();
  const session = useSessionContext();
  const user = useUserSession(session.database);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setLoading(true);

    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = Object.fromEntries(formData.entries());

    if (user.session && user.session.data.session) {
      session.database
        .from("company")
        .insert({
          name: data.name.toString(),
          branch: data.branch.toString(),
          address: data.address.toString(),
          district: data.district.toString(),
          city: data.city.toString(),
          province: data.province.toString(),
          zip_code: parseInt(data.zip_code.toString()),
          user_id: user.session.data.session.user.id,
        })
        .select()
        .then(({ data, error }) => {
          if (error) {
            alerts.dispatch({
              kind: "add",
              id: Date.now().toString(),
              type: "error",
              message: error.message,
            });
          }

          if (data && data.length > 0) {
            alerts.dispatch({
              kind: "add",
              id: Date.now().toString(),
              type: "success",
              message: "Success insert a new company.",
            });
            router.push({
              pathname: Config.Url.Company + "/view",
              query: { id: data[0].id },
            });
          }

          setLoading(false);
        });
    }
  };

  return (
    <ProtectedPage
      hasAccess={user.session?.data.session != null || !user.isReady}
      redirectUrl={Config.Url.SignIn}
    >
      <DashboardLayout>
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose max-w-none">
            <h1>Insert Company</h1>
            <ProtectedContent
              isLocked={user.permission?.data?.company_insert === false}
            >
              <Loading isLoading={loading}>
                <CompanyForm onSubmit={handleSubmit} />
              </Loading>
            </ProtectedContent>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default InsertCompany;
