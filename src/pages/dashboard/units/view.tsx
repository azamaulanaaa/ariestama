import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, Card, CardBody, Typography } from "@material-tailwind/react";

import ProtectedPage from "@/components/ProtectedPage";
import { useSessionContext } from "@/components/SessionContext";
import useLayout from "@/components/Layout";
import type { Unit } from "@/libs/Database";
import Config from "@/config";
import CardHeader from "@/components/CardHeader";
import { HiPencil } from "react-icons/hi2";
import DenseDisplay from "@/components/DenseDisplay";

const ViewUnits = () => {
  const session = useSessionContext();
  useLayout().dashboard();
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

  const handleEdit = () => {
    if (!router.isReady) return;
    router.push({
      pathname: "/dashboard/units/edit",
      query: { id: unitData.id },
    });
  };

  return (
    <ProtectedPage
      hasAccess={session.user?.permission.unit_read == true}
      isReady={session.user !== undefined && !loading}
      redirectUrl={Config.Url.SignIn}
    >
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <div>
              <Typography data-testid="serial-number" variant="h3">
                {unitData.serial_number}
              </Typography>
            </div>
            <div>
              <Button variant="text" size="sm" onClick={handleEdit}>
                <HiPencil className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardBody>
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
        </CardBody>
      </Card>
    </ProtectedPage>
  );
};

export default ViewUnits;
