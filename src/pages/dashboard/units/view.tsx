import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import DashboardLayout from "@/components/Layout/dashboard";
import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import type { Unit } from "@/libs/Database";
import Config from "@/config";
import DenseDisplay from "@/components/DenseDisplay";
import { BiSolidPencil } from "react-icons/bi";

const ViewUnits = () => {
  const session = useSessionContext();
  const router = useRouter();

  const defaultUnitData: Unit = {
    id: "",
    serial_number: "",
    series: "",
    brand: "",
    oem: "",
    yom: 0,
    made_in: "",
    user_id: "",
    extra: {},
  };

  const [unitData, setUnitData] = useState<Unit>(defaultUnitData);
  const [loading, setLoading] = useState<boolean>(true);

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

  return (
    <DashboardLayout>
      <ProtectedPage
        hasAccess={session.user?.permission.unit_read == true}
        isReady={session.user !== undefined && !loading}
        redirectUrl={Config.Url.SignIn}
      >
        <div className="card card-bordered bg-base-100 shadow-md">
          <div className="card-body prose prose-a:no-underline max-w-none">
            <div className="flex flex-row justify-between items-start">
              <h1 data-testid="serial-number">{unitData.serial_number}</h1>
              <Link
                href={"/dashboard/units/edit?id=" + unitData.id}
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
                series: "Series",
                brand: "Brand",
                oem: "Original Equipment Manufacture",
                yom: "Year of Manufacture",
                made_in: "Made In",
              }}
              values={unitData as any}
            />
          </div>
        </div>
      </ProtectedPage>
    </DashboardLayout>
  );
};

export default ViewUnits;
