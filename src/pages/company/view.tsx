import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { BiSolidPencil } from "react-icons/bi";

import DashboardLayout from "@/layout/Dashboard";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import { useSessionContext } from "@/contexts/Session";
import DenseDisplay from "@/components/DenseDisplay";
import type { Company } from "@/services/database";
import Config from "@/config";

const ViewCompanies = () => {
  const session = useSessionContext();
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
  }, [session, router]);

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={session.user?.permission.company_read == true}
        isReady={session.user !== undefined && !loading}
        redirectUrl={Config.Url.SignIn}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
            <div className="flex flex-row justify-between items-start">
              <div>
                <h1 data-testid="company-name">{companyData.name}</h1>
                <h2 data-testid="company-branch">{companyData.branch}</h2>
              </div>
              <Link
                href={"/company/edit?id=" + companyData.id}
                passHref
                legacyBehavior
              >
                <a className="btn">
                  <BiSolidPencil className="w-5 h-5" />
                </a>
              </Link>
            </div>
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
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default ViewCompanies;
