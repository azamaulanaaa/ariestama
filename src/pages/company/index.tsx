import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { BiSolidPlusSquare } from "react-icons/bi";

import { useSessionContext } from "@/contexts/Session";
import { useAlertsContext } from "@/contexts/Alerts";
import useUserSession from "@/hooks/useUserSession";
import Config from "@/config";
import DashboardLayout from "@/layout/Dashboard";
import ProtectedPage from "@/features/authentication/ProtectedPage";
import CompaniesTable, {
  CompaniesItemData,
} from "@/features/company/CompaniesTable";
import { TableData } from "@/components/Table";

function Companies() {
  const alerts = useAlertsContext();
  const session = useSessionContext();
  const user = useUserSession(session.database);
  const router = useRouter();

  const [items, setItems] = useState<CompaniesItemData[]>([]);

  useEffect(() => {
    session.database
      .from("company")
      .select()
      .then(({ data, error }) => {
        if (data) {
          setItems(data);
        }
        if (error) {
          alerts.dispatch({
            kind: "add",
            id: Date.now().toString(),
            type: "error",
            message: error.message,
          });
        }
      });
  }, [session.database]);

  const handleClick = (data: TableData<keyof CompaniesItemData>) => {
    if (!router.isReady) return;
    router.push({
      pathname: Config.Url + "/view",
      query: { id: data.id?.toString() },
    });
  };

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={user.permission?.data?.company_read == true}
        isReady={user.permission?.data != null && router.isReady}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
            <div className="flex flex-row justify-between">
              <h1>Companies</h1>
              <div>
                <Link
                  href={Config.Url.Company + "/insert"}
                  passHref
                  legacyBehavior
                >
                  <a className="btn">
                    <BiSolidPlusSquare className="h-5 w-5" />
                  </a>
                </Link>
              </div>
            </div>
            <CompaniesTable items={items} onClick={handleClick} />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
}

export default Companies;
