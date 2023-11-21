import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import DashboardLayout from "@/components/Layout/dashboard";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import UnitsTable, { UnitsItemData } from "@/components/UnitsTable";
import Config from "@/config";
import { TableData } from "@/components/Table";
import { BiSolidPlusSquare } from "react-icons/bi";

function Units() {
  const session = useSessionContext();

  const router = useRouter();

  const [items, setItems] = useState<UnitsItemData[]>([]);

  useEffect(() => {
    if (session.user?.permission.unit_read == true)
      session.database.unit.gets().then((items) => {
        if (items.data) {
          setItems(items.data);
        }
      });
  }, [session]);

  const handleClick = (data: TableData<keyof UnitsItemData>) => {
    if (!router.isReady) return;
    router.push({
      pathname: "/dashboard/units/view",
      query: { id: data.id?.toString() },
    });
  };

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={session.user?.permission.unit_read == true}
        isReady={session.user !== undefined}
        redirectUrl={Config.Url.Dashboard}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no_underline max-w-none">
            <div className="flex justify-between">
              <h1>Units</h1>
              <Link href="/dashboard/units/insert" passHref legacyBehavior>
                <a className="btn">
                  <BiSolidPlusSquare className="h-5 w-5" />
                </a>
              </Link>
            </div>
            <UnitsTable items={items} onClick={handleClick} />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
}

export default Units;
