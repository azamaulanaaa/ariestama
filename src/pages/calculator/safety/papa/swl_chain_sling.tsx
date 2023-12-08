import SWLChainSlingCalculator from "@/features/calculator/safety/papa/swl_chain_sling";
import DashboardLayout from "@/layout/Dashboard";

const SWLChainSling = () => {
  return (
    <DashboardLayout mobile>
      <div className="card card-bordered bg-base-100 shadow-md">
        <div className="card-body prose max-w-none">
          <h1>SWL Chain Sling Calculator</h1>
          <SWLChainSlingCalculator />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default SWLChainSling;
