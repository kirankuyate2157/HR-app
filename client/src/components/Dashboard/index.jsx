import React from "react";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  return (
    <div className='w-full py-10 flex pb-32 flex-col h-[100vh] overflow-auto'>
      <DashboardSkeleton />
    </div>
  );
};

export default Dashboard;
