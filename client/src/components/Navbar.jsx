import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "./ui/input";

const Navbar = () => {
  return (
    <>
  
      <div className='flex px-4 md:px-10 justify-between items-center w-full py-1 gap-5 border-slate-200 bg-background  dark:border-slate-700  h-12'>
      <svg
              className='h-5 w-5 '
              aria-hidden='true'
              xmlns='http://www.w3.org/2000/svg'
              width='24'
              height='24'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              stroke-width='2'
              stroke-linecap='round'
              stroke-linejoin='round'
              className='lucide lucide-command'
            >
              <path d='M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3' />
            </svg>
      <Input type='text' placeholder='Search' className='rounded max-w-md bg-gray-50 text-gray-500 dark:text-gray-500 dark:bg-transparent' />
      <Avatar>
        <AvatarImage src='https://github.com/shadcn.png' alt='@shadcn' />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
    </div>
    

    </>
  );
};

export default Navbar;
