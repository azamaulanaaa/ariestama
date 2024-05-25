import Head from "next/head";

import DashboardLayout from "@/layout/Dashboard";
import PetirKonvensionalCalculator from "@/features/calculator/safety/electricity/petir_konvensional";

const Pinter = () => {
  return (
    <DashboardLayout mobile>
      <Head>
        <title>Petir Konvensional (ver.1)</title>
      </Head>
      <div className="card card-bordered bg-base-100 shadow-md">
        <div className="card-body prose max-w-none">
          <h1>Petir Konvensional (ver.1)</h1>
          <PetirKonvensionalCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Pinter;
