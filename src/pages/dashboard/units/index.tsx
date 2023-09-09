import { Button, Card, CardBody, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";

import useLayout from "@/components/Layout";
import ProtectedPage from "@/components/ProtectedPage";

import { useSessionContext } from "@/components/SessionContext";
import UnitsTable, { UnitsItemData } from "@/components/UnitsTable";
import Config from "@/config";
import { TableData } from "@/components/Table";

function Units() {
  const session = useSessionContext();
  useLayout().dashboard();

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
    <ProtectedPage
      hasAccess={session.user?.permission.unit_read == true}
      isReady={session.user !== undefined}
      redirectUrl={Config.Url.Dashboard}
    >
      <Card>
        <CardBody className="flex flex-col gap-4">
          <div className="flex justify-between">
            <Typography variant="h3" as="h1" color="blue-gray">
              Units
            </Typography>
            <Link href="/dashboard/units/insert" passHref legacyBehavior>
              <Button size="md" variant="gradient">
                Insert
              </Button>
            </Link>
          </div>
          <UnitsTable items={items} onClick={handleClick} />
        </CardBody>
      </Card>
    </ProtectedPage>
  );
}

export default Units;
