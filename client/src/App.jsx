import "./App.css";
import { Route, Routes } from "react-router";
import { Auth } from "./components/Auth/Auth";
import { Toaster } from "@/components/ui/sonner";
import HomeLayout from "./layouts/HomeLayout";
import Employee from "./components/Employee";
import Details from "./components/Employee/Details";
import Selection from "./components/Selection";
import Notification from "./components/Notification";
import Forms from "./components/Forms";
import axios from "axios";

function App() {
  axios.defaults.baseURL = "http://localhost:8080/api/v1"; // "https://kways-hr.onrender.com/api/v1";
  axios.defaults.params = {};

  return (
    <div className='flex dark p-0 m-0 w-[100vw] h-full '>
      <Toaster />

      <Routes>
        <Route path='/auth' element={<Auth />} />

        <Route path='/' element={<HomeLayout />} >
          <Route index element={<h1>hiiiiiiiiiiiiiiiiiiiiiiiiiiiiii</h1>} />
          <Route path='/employee' element={<Employee />} />
          <Route path='/employee/:id' element={<Details />} />
          <Route path='/selection' element={<Selection />} />
          <Route path='/notification' element={<Notification />} />
          <Route path='/reports' element={<Forms />} />
          <Route path='/forms' element={<Forms />} />
          <Route path='/home' element={<h1>Home</h1>} />
          <Route path='*' element={<h1>No content</h1>} />
        </Route>
        <Route path='*' element={<h1>No content</h1>} />
      </Routes>
    </div>
  );
}
export default App;
