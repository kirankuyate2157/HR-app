import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  return (
    <>
      <div className=' flex  sm:hidden w-[100vw] bg-red-500 h-12 justify-between'>

      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      </div>
    </>
  );
};

export default Navbar;
