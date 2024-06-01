import { Outlet } from "react-router";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";


const HomeLayout = () => {
    return (
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel defaultSize={12} maxSize={12} minSize={4}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <div className='w-full'>
            <TopBar />
            <Navbar />
            <Outlet />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };
  export default HomeLayout;