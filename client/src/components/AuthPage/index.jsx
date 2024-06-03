import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { loginUser } from "./utils/authApi.js";
import { showToast } from "../../utils/showToast.jsx";
import Register from "./Register.jsx";
import { useNavigate } from "react-router";
import BackButton from "../BackButton.jsx";

export default function AuthPage() {
  const [open, setOpen] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [username2, setUsername2] = useState("");
  const [password2, setPassword2] = useState("");
  const [tabValue, setTabValue] = useState("member");

  const nav = useNavigate();
  const handleLoginSubmit = async () => {
    try {
      const userData = { username, password };
      const user = await loginUser(userData);
      showToast("Logged in successfully", "success");
      localStorage.setItem("accessToken", user.accessToken);
      nav("/home");
    } catch (error) {
      showToast(error, "error");
    }
  };

  const handleAdminSubmit = async () => {
    try {
      const userData = {
        username: username2,
        password: password2,
        isAdmin: "admin",
      };
      const user = await loginUser(userData);
      localStorage.setItem("accessToken", user.accessToken);
      showToast("Logged in successfully", "success");
      nav("/home");
    } catch (error) {
      showToast(error, "error");
    }
  };

  return (
    <div className='flex flex-col space-y-5 w-full justify-center items-center'>
      <BackButton />
      <Register open={open} setOpen={setOpen} isAdmin={tabValue} />
      <div>
        <h2 className='capitalize font-mono text-3xl'>Hiring Platform</h2>
        <hr className='border-pink-600 border-2 w-10 self-end' />
      </div>
      <Tabs defaultValue='member' className='w-[400px]'>
        <TabsList className='grid gap-1 w-full grid-cols-2'>
          <TabsTrigger value='member' onClick={() => setTabValue("member")}>
            Members
          </TabsTrigger>
          <TabsTrigger value='admin' onClick={() => setTabValue("admin")}>
            Admin
          </TabsTrigger>
        </TabsList>
        <TabsContent value='member'>
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Members Account</CardTitle>
              <CardDescription>
                {`Login to your account here. After login, you will be redirected to the home page.`}
              </CardDescription>
            </CardHeader>

            <CardContent className='space-y-2'>
              <div className='space-y-1 text-start  text-sm'>
                <Label
                  htmlFor='name'
                  className='flex text-orange-800 justify-start py-1'
                >
                  Test Credentials
                </Label>

                <div className='pl-2 flex flex-wrap items-center  text-xs gap-2 '>
                  username :{" "}
                  <span className='bg-gray-900 p-1 px-2 rounded-md'>
                    test85
                  </span>{" "}
                  password :{" "}
                  <span className='bg-gray-900 p-1 px-2 rounded-md'>
                    12345678
                  </span>
                  admin username :{" "}
                  <span className='bg-gray-900 p-1 px-2 rounded-md'>
                    demo85
                  </span>{" "}
                </div>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='name' className='flex justify-start py-1'>
                  Username
                </Label>
                <Input
                  id='name'
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='password' className='flex justify-start py-1'>
                  Password
                </Label>
                <Input
                  id='password'
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className='space-x-2 flex justify-end'>
              <Button className='w-full' onClick={handleLoginSubmit}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='admin'>
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Admin Account</CardTitle>
              <CardDescription>
                {`Login to your account here. After login, you will be redirected to the admin page.`}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1 text-start  text-sm'>
                <Label
                  htmlFor='name'
                  className='flex text-orange-800 justify-start py-1'
                >
                  Test Credentials
                </Label>

                <div className='pl-2 flex flex-wrap items-center  text-xs gap-2 '>
                  username :{" "}
                  <span className='bg-gray-900 p-1 px-2 rounded-md'>
                    demo85
                  </span>{" "}
                  password :{" "}
                  <span className='bg-gray-900 p-1 px-2 rounded-md'>
                    12345678
                  </span>
                </div>
              </div>
              <div className='space-y-1'>
                <Label htmlFor='Username' className='flex justify-start py-1'>
                  Username
                </Label>
                <Input
                  id='Username'
                  type='text'
                  value={username2}
                  onChange={(e) => setUsername2(e.target.value)}
                />
              </div>
              <div className='space-y-1'>
                <Label htmlFor='new' className='flex justify-start py-1'>
                  Password
                </Label>
                <Input
                  id='new'
                  type='password'
                  value={password2}
                  onChange={(e) => setPassword2(e.target.value)}
                />
              </div>
            </CardContent>
            <CardFooter className='space-x-2 flex justify-end'>
              <Button className='w-full' onClick={handleAdminSubmit}>
                Login
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <div className='flex justify-center text-xs'>
        <p>
          if you have not account already?{" "}
          <span
            className='p-2 px-3 mx-1 text-primary cursor-pointer font-bold'
            onClick={() => setOpen(!open)}
          >
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
}
