import { Outlet } from "react-router";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
  } from "@/components/ui/resizable";

import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import TopBar from "../components/TopBar";
import MobileBar from "@/components/Mobilebar";
import BackButton from "@/components/BackButton";


const HomeLayout = () => {
    return (
      <ResizablePanelGroup direction='horizontal'>
        <ResizablePanel className="hidden lg:block" defaultSize={12} maxSize={12} minSize={8}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle  className="hidden lg:block" />
        <ResizablePanel>
          <div className='w-full h-full relative '>
            <TopBar />
            <Navbar />
            <BackButton />
            <div className='px-2 lg:px-10 '>
            <Outlet />
            </div>
            <MobileBar/>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    );
  };
  export default HomeLayout;