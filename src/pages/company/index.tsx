import { useEffect, useState } from "react";
import Link from "next/link";
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
import ProtectedContent from "@/features/authentication/ProtectedContent";

function Companies() {
  const alerts = useAlertsContext();
  const session = useSessionContext();
  const user = useUserSession(session.database);

  const [items, setItems] = useState<CompaniesItemData[]>([]);

  useEffect(() => {
    session.database
      .from("company")
      .select()
      .then(({ data, error }) => {
        if (data) {
          const displayItem = data.map((item) => ({
            ...item,
            view_url: Config.Url.Company + "/view?id=" + item.id,
          }));
          setItems(displayItem);
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
  }, [alerts, session.database]);

  return (
    <ProtectedPage
      hasAccess={user.session?.data.session != null || !user.isReady}
      redirectUrl={Config.Url.SignIn}
    >
      <DashboardLayout>
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
            <ProtectedContent
              isLocked={user.permission?.data?.company_read === false}
            >
              <CompaniesTable items={items} />
            </ProtectedContent>
          </div>
        </div>
      </DashboardLayout>
    </ProtectedPage>
  );
}

export default Companies;
