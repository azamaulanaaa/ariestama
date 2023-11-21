import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DashboardLayout from "@/components/Layout/dashboard";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import CompaniesTable, { CompaniesItemData } from "@/components/CompaniesTable";
import Config from "@/config";
import { TableData } from "@/components/Table";
import { BiSolidPlusSquare } from "react-icons/bi";

function Companies() {
  const session = useSessionContext();
  const router = useRouter();

  const [items, setItems] = useState<CompaniesItemData[]>([]);

  useEffect(() => {
    if (session.user?.permission.company_read == true)
      session.database.company.gets().then((items) => {
        if (items.data) {
          setItems(items.data);
        }
      });
  }, [session]);

  const handleClick = (data: TableData<keyof CompaniesItemData>) => {
    if (!router.isReady) return;
    router.push({
      pathname: "/dashboard/companies/view",
      query: { id: data.id?.toString() },
    });
  };

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={session.user?.permission.company_read == true}
        isReady={session.user !== undefined && router.isReady}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
            <div className="flex flex-row justify-between">
              <h1>Companies</h1>
              <div>
                <Link
                  href="/dashboard/companies/insert"
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
