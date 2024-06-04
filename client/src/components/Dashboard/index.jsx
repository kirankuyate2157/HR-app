import React from "react";
import DashboardSkeleton from "./DashboardSkeleton";

const Dashboard = () => {
  return (
    <div className='w-full py-6 pb-20 flex  flex-col h-[100vh]  overflow-auto'>
      <DashboardSkeleton />
    </div>
  );
};

export default Dashboard;
