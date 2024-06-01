import "./App.css";
import { Route, Routes } from "react-router";
import { TabsDemo } from "./components/Auth/Auth";
import { Toaster } from "@/components/ui/sonner";
import HomeLayout from "./layouts/HomeLayout";
import Employee from "./components/Employee";
import Details from "./components/Employee/Details";
import Selection from "./components/Selection";




function App() {
  return (
    <div className='flex dark p-0 m-0 w-[100vw] h-[100vh]'>
      <Toaster />

      <Routes>
        <Route path='/auth' element={<TabsDemo />} />

        <Route path='/' element={<HomeLayout />}>
           {/* Define child routes here */}
           <Route index element={<h1>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>} />
           <Route path="/employee" element={<Employee/>} />
           <Route path="/employee/:id" element={<Details/>} />
           <Route path="/selection" element={<Selection/>} />
           <Route path="/home" element={<h1>ghgvvhvvgvgvg</h1>} />
           <Route path="*" element={<h1>No content</h1>} />
          {/* Add more routes as needed */}
        </Route>
      </Routes>
    </div>
  );
}
export default App;
