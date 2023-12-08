import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiSolidPencil } from "react-icons/bi";

import Config from "@/config";
import { useAlertsContext } from "@/contexts/Alerts";
import { useSessionContext } from "@/contexts/Session";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import DashboardLayout from "@/layout/Dashboard";
import DenseDisplay from "@/components/DenseDisplay";
import type { DatabaseRaw } from "@/services/database";
import useUserSession from "@/hooks/useUserSession";
import Loading from "@/features/authentication/Loading";
import ProtectedContent from "@/features/authentication/ProtectedContent";

const ViewCompanies = () => {
  const alerts = useAlertsContext();
  const session = useSessionContext();
  const user = useUserSession(session.database);
  const router = useRouter();

  const [loading, setLoading] = useState<boolean>(true);
  const [companyData, setCompanyData] = useState<
    DatabaseRaw["public"]["Tables"]["company"]["Row"]
  >({
    id: "",
    name: "",
    branch: "",
    address: "",
    district: "",
    city: "",
    province: "",
    zip_code: 0,
    user_id: "",
    created_at: "",
  });

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
          if (data != null) {
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
  }, [alerts, router.query.id]);

  return (
    <ProtectedPage
      hasAccess={user.session?.data.session != null || !user.isReady}
      redirectUrl={Config.Url.SignIn}
    >
      <DashboardLayout>
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
            <ProtectedContent
              isLocked={user.permission?.data?.company_read === false}
            >
              <Loading isLoading={loading}>
                <div className="flex flex-row justify-between items-start">
                  <div>
                    <h1 data-testid="company-name" className="m-0">
                      {companyData.name}
                    </h1>
                    <h2 data-testid="company-branch" className="m-0">
                      {companyData.branch}
                    </h2>
                  </div>
                  <Link
                    href={Config.Url.Company + "/edit?id=" + companyData.id}
                    passHref
                    legacyBehavior
                  >
                    <a className="btn btn-sm">
                      <BiSolidPencil />
                    </a>
                  </Link>
                </div>
                <DenseDisplay
                  keys={{
                    address: "Address",
                    sub_district: "Sub District",
                    city: "City",
                    province: "Province",
                    zip_code: "Zip Code",
                  }}
                  values={companyData}
                />
              </Loading>
            </ProtectedContent>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default ViewCompanies;
