import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { registerUser } from "./utils/authApi.js";
import { showToast } from "../../utils/showToast";

function Register({ open, setOpen, isAdmin }) {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [adminId, setAdminId] = useState("");

  const handleSubmit = async () => {
    if (!fullName || !email || !password || password !== confirmPassword) {
      showToast("All fields are required and passwords must match", "error");
      return;
    }

    setLoading(true);
    try {
      const userData = { fullName, email, password,isAdmin,adminId };
      const res= await registerUser(userData);
      showToast("User registered successfully. Please login.", "success");
      setOpen(false);
    } catch (error) {
      showToast(error, "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className='dark sm:max-w-[425px] border-border'>
        <DialogHeader>
          <DialogTitle>Register</DialogTitle>
          <DialogDescription>
            Create a new {" "}
            <span>{`${isAdmin == "admin" ? "admin" : ""}`} account</span>
          </DialogDescription>
          
        </DialogHeader>
        <div className='grid text-left leading-4 gap-4 py-4'>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='fullName' className='text-left'>
              full name
            </Label>
            <Input
              id='fullName'
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className='col-span-3'
              placeholder='e.g., kiran kuyate'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='email' className='text-left'>
              Email
            </Label>
            <Input
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='col-span-3'
              placeholder='e.g., test@gmail.com'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='password' className='text-left leading-4'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='col-span-3'
              placeholder='Minimum 8 characters..'
            />
          </div>
          <div className='grid grid-cols-4 items-center gap-4'>
            <Label htmlFor='confirmPassword' className='text-left leading-4'>
              Confirm Password
            </Label>
            <Input
              id='confirmPassword'
              type='password'
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className='col-span-3'
              placeholder='same password.. '
            />
          </div>
          {isAdmin !== "admin" && (
            <div className='grid grid-cols-4 items-center gap-4'>
              <Label htmlFor='adminId' className='text-left leading-4'>
                Admin Details
              </Label>
              <Input
                id='adminId'
                type='text'
                value={adminId}
                onChange={(e) => setAdminId(e.target.value)}
                className='col-span-3'
                placeholder='Email or username ..'
              />
            </div>
          )}
        </div>
        <DialogFooter>
          <Button onClick={handleSubmit} disabled={loading}>
            Register
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default Register;
