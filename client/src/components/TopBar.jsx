import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const TopBar = () => {
  return (
    <div className='hidden sm:flex px-10 justify-between items-center w-full py-1 gap-5 border-slate-200 bg-background  dark:border-slate-700  h-12'>
      <Input type='text' placeholder='Search' className='rounded max-w-md bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent' />
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
  );
};

export default TopBar;
