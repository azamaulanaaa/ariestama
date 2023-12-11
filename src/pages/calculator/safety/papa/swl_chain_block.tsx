import Head from "next/head";

import DashboardLayout from "@/layout/Dashboard";
import SWLChainBlockCalculator from "@/features/calculator/safety/papa/swl_chain_block";

const SWLChainSling = () => {
  return (
    <DashboardLayout mobile>
      <Head>
        <title>SWL Chain Block Calculator</title>
      </Head>
      <div className="card card-bordered bg-base-100 shadow-md">
        <div className="card-body prose max-w-none">
          <h1>SWL Chain Block Calculator</h1>
          <SWLChainBlockCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SWLChainSling;
