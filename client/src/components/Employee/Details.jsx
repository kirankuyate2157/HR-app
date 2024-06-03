import { Button } from "../ui/button";
import { Card } from "../ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";

const Details = () => {
  return (
    <ScrollArea className='p-4 mb-4  w-full h-[100vh] overflow-auto bg-gray-800 rounded '>
      <div className=''>
        <div className='flex w-full h-48 max-h-48'>
          <img
            src='https://images.unsplash.com/photo-1503455637927-730bce8583c0?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='placeholder'
            className='object-cover w-full'
          />
        </div>

        <div className='flex h-full pb-2 flex-col justify-end items-center min-h-[11rem]  w-full relative'>
          <img
            src='https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
            alt='profile'
            className='w-48 h-48 rounded-full absolute -top-24'
          />
          <h2 className='mt-[4rem] text-2xl font-bold'>Kiran Kuyate</h2>
          <div className=' flex justify-center text-gray-300 gap-2 text-sm '>
            <p>Full stack developer</p>
            <p>
              <span className='bg-green-800 rounded-md px-2 p-[2px]  items-center text-center text-xs'>
                Fresher
              </span>
            </p>
          </div>
          {/* <div className="flex gap-2 mb-2">
            <Button>Portfolio</Button>
            <Button>Follow +</Button>
            </div> */}
        </div>
      </div>
      <hr />
      <div className='flex flex-col gap-4 lg:flex-row justify-between py-6'>
        <div className='flex flex-wrap w-full md:w-[70%] justify-start gap-2'>
          <h2 className='font-bold mt-1'>Experience </h2>
          <p className='w-full ml-3   text-start'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            blanditiis architecto nulla dolore pariatur quam. Aut voluptates
            repudiandae fuga dolores.
          </p>
          <h2 className='font-bold mt-1'>About me </h2>
          <p className='w-full ml-3  text-start'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            blanditiis architecto nulla dolore pariatur quam. Aut voluptates
            repudiandae fuga dolores.
          </p>
          <h2 className='font-bold mt-1'>Skills </h2>
          <p className='w-full ml-3  text-start flex flex-wrap'>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            blanditiis architecto nulla dolore pariatur quam. Aut voluptates
            repudiandae fuga dolores.
          </p>
          <h2 className='font-bold mt-1'>Education </h2>
          <p className='w-full ml-3  text-start flex flex-wrap'>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            blanditiis architecto nulla dolore pariatur quam. Aut voluptates
            repudiandae fuga dolores.
          </p>

          <h2 className='font-bold mt-1'>Projects </h2>
          <p className='w-full ml-3  text-start flex flex-wrap'>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            <span className='p-1 px-2 mx-2 text-sm  bg-pink-900 rounded-lg'>
              {" "}
              ReactJs
            </span>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugiat
            blanditiis architecto nulla dolore pariatur quam. Aut voluptates
            repudiandae fuga dolores.
          </p>

          <h2 className='font-bold mt-1'>Performance review</h2>
          <Card className='w-full ml-3 p-4 border-gray-600   text-start'>
            <p>
              " Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Deleniti omnis fugit doloribus quod sequi possimus odio adipisci
              quas quaerat! Provident."
            </p>
            <h2 className='flex px-2 justify-end'>- Sudarshan Patil</h2>
          </Card>
          <Card className='w-full ml-3 p-4 border-gray-600   text-start'>
            <p>
              " Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Deleniti omnis fugit doloribus quod sequi possimus odio adipisci
              quas quaerat! Provident."
            </p>
            <h2 className='flex px-2 justify-end'>- Sudarshan Patil</h2>
          </Card>
          <Card className='w-full ml-3 p-4 border-gray-600   text-start'>
            <p>
              " Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Deleniti omnis fugit doloribus quod sequi possimus odio adipisci
              quas quaerat! Provident."
            </p>
            <h2 className='flex px-2 justify-end'>- Sudarshan Patil</h2>
          </Card>
        </div>
        <div className='w-full  md:w-[20%] flex flex-col'>
          <Card className='w-full h-auto mr-2 gap-2 border-gray-700  text-sm p-3 flex flex-col items-start justify-start'>
            <h2 className='font-bold'>Github </h2>
            <p className=''>
              http://github.com{" "}
              <pan className='text-pink-600 animate-pulse'>_</pan>
            </p>
            <h2 className='font-bold'>likedin</h2>
            <p className=''>
              http://linkedin.com{" "}
              <pan className='text-pink-600 animate-pulse'>_</pan>
            </p>
            <h2 className='font-bold'>Email</h2>
            <p className=''>
              http://linkedin.com{" "}
              <pan className='text-pink-600 animate-pulse'>_</pan>
            </p>
            <h2 className='font-bold'>Phone</h2>
            <p className=''>+91 8878903478</p>
          </Card>
        </div>
      </div>
    </ScrollArea>
  );
};

export default Details;
