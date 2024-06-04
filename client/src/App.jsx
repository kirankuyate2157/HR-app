import "./App.css";
import { Route, Routes, useNavigate } from "react-router";
import AuthPage from "./components/AuthPage";
import { Toaster } from "@/components/ui/sonner";
import HomeLayout from "./layouts/HomeLayout";
import Employee from "./components/Employee";
import Details from "./components/Employee/Details";
import Selection from "./components/Selection";
import Notification from "./components/Notification";
import Forms from "./components/Forms";
import axios from "axios";
import { useEffect, useState } from "react";
import { currentUser } from "./utils/apis";
import { showToast } from "./utils/showToast";
import Applicant from "./components/Applicant";
import { TbLoader2 } from "react-icons/tb";

function App() {
  axios.defaults.baseURL = import.meta.env.VITE_APP_API_URL;
  axios.defaults.params = {};
  axios.defaults.withCredentials = true;

  const [user, setUser] = useState(null);
  const nav = useNavigate();

  useEffect(() => {
    // Fetch user data from your API endpoint
    const fetchUserData = async () => {
      try {
        const userData = await currentUser(); // Adjust the URL to your API endpoint
        setUser(userData);
        if (!userData) {
          nav("/auth");
          return;
        }
        console.log("user data : ", userData);
      } catch (error) {
        showToast(error.message || "unauthorized or Something went wrong ");
        console.error("Error fetching user data:", error);
        nav("/auth");
      }
    };

    fetchUserData();
  }, []);
  return (
    <div className='flex dark p-0 m-0 w-[100vw] h-[100vh] '>
      <Toaster />

      <Routes>
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/applicant/job/:id' element={<Applicant />} />
        {user && (
          <Route path='/' element={<HomeLayout />}>
            <Route index element={<h1>Hero inProgress...</h1>} />
            <Route path='/employee' element={<Employee />} />
            <Route path='/employee/:id' element={<Details />} />
            <Route path='/selection' element={<Selection />} />
            <Route path='/notification' element={<Notification />} />
            {/* <Route path='/reports' element={<Forms />} /> */}
            <Route path='/forms' element={<Forms />} />
            <Route path='/home' element={<h1>Home inProgress..</h1>} />
            <Route
              path='/setting'
              element={
                <div onClick={() => nav("/auth")}>Setting inProgress..</div>
              }
            />
            <Route path='*' element={<h1>No content</h1>} />
          </Route>
        )}

        <Route
          path='*'
          element={
  
              <div className='w-full flex flex-col justify-center '>
                <div className='w-full flex justify-center items-center gap-3 text-white'>
                  <TbLoader2 className='animate-spin' />{" "}
                  <p className='animate-pulse'>Loading ...</p>
                </div>
              </div>
          }
        />
      </Routes>
    </div>
  );
}
export default App;
