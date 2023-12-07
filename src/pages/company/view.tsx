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
    sub_district: "",
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
  }, [router.query.id]);

  return (
    <ProtectedPage
      hasAccess={user.permission?.data?.company_read == true}
      isReady={user.permission?.data != null && loading == false}
      redirectUrl={Config.Url.Dashboard}
    >
      <DashboardLayout>
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
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
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
};

export default ViewCompanies;
