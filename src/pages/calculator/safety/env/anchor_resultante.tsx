import Head from "next/head";

import DashboardLayout from "@/layout/Dashboard";
import AnchorResultanteCalculator from "@/features/calculator/safety/env/anchor_reslutante";

const AnchorResultante = () => {
  return (
    <DashboardLayout mobile>
      <Head>
        <title>Anchor Resultante</title>
      </Head>
      <div className="card card-bordered bg-base-100 shadow-md">
        <div className="card-body prose max-w-none">
          <h1>Anchor Resultante</h1>
          <AnchorResultanteCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default AnchorResultante;
