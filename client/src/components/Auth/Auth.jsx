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

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";

import { useState } from "react";

function DialogDemo({ open, setOpen, value }) {
  const [username, setUsername] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");
  const [disable, setDisable] = useState(false);

  const HandleSubmit = async () => {
    console.log("Submit");
    setDisable(true);
    if (password1 && password1 === password2 && username) {
      console.log("Submit called");
      // const res = await createUser(username, password1);
      // if (res.status == (200 || 201)) {
      //   toast("User has been created.✅ login now..");
      //   setUsername("");
      //   setPassword1("");
      //   setPassword2("");
      // } else {
      //   if (res) {
      //     toast(res);
      //   } else {
      //     toast("Something went Wrong!");
      //   }
      // }
    } else {
      toast("field required or password nat matching !");
    }
    setDisable(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='dark sm:max-w-[425px] border-border'>
        <DialogHeader>
          <DialogTitle>{`Register as ${
            value == "member" ? "Member" : "Admin"
          }`}</DialogTitle>
          <DialogDescription>{`
            Register as ${
              value == "member" ? "Member" : "Admin"
            } and manage human resources..`}
          </DialogDescription>
        </DialogHeader>
        <div className='grid gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='name' className='text-right'>
              Username
            </Label>
            <Input
              id='name'
              value={username}
              className='col-span-3'
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password1' className='text-right'>
              Password
            </Label>
            <Input
              id='password1'
              type='password'
              value={password1}
              onChange={(e) => setPassword1(e.target.value)}
              className='col-span-3'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password2' className='text-right pr-2'>
              Confirm
            </Label>
            <Input
              id='password2'
              type='password'
              value={password2}
              onChange={(e) => setPassword2(e.target.value)}
              className='col-span-3'
            />
          </div>
        </div>
        <DialogFooter>
          <Button onClick={HandleSubmit} disable={disable}>
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function TabsDemo() {
  const [open, setOpen] = useState(false);
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [userName2, setUserName2] = useState("");
  const [password2, setPassword2] = useState("");
  const [tabValue, setTabValue] = useState("member");
  const handleAdminSubmit = async () => {
    console.log("Submit");
    if (password2 && userName2) {
      console.log("Submit called");
      const res = await createUser(userName2, password2);
      if (res.status == (200 || 201)) {
        toast("User has been created.✅ login now..");
        setUserName2("");
        setPassword2("");
      } else {
        if (res) {
          toast(res);
        } else {
          toast("Something went Wrong!");
        }
      }
    } else {
      toast("field required!");
    }
  };
  return (
    <div className='flex flex-col space-y-5 w-full justify-center items-center'>
      <DialogDemo open={open} setOpen={setOpen} value={tabValue} />
      <div>
        <h2 className='capitalize font-mono text-3xl '>Hiring platform</h2>
        <hr className=' border-pink-600 border-2 w-10 self-end ' />
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
                {` login your account here. After login, you'll be you will redirect to  Home page.`}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='name' className='flex justify-start py-1'>
                  Username
                </Label>
                <Input
                  id='name'
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
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
              <Button className='w-full'>Login</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value='admin'>
          <Card className='border-border'>
            <CardHeader>
              <CardTitle>Admin Account</CardTitle>
              <CardDescription>
                {` login your account here. After login, you'll be you will redirect to admin page.`}
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-2'>
              <div className='space-y-1'>
                <Label htmlFor='Username' className='flex justify-start py-1'>
                  Username
                </Label>
                <Input
                  id='Username'
                  type='text'
                  value={userName2}
                  onChange={(e) => setUserName2(e.target.value)}
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
