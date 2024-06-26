import React from 'react'

const Report = () => {
  return (
    <div className='w-full py-6 pb-20 flex  flex-col h-[100vh]  overflow-auto'>
    
    <div className='flex max-w-full flex-col lg:flex-row px-4 py-2 gap-3'>
        <div
          className={`w-full lg:w-[60%] bg-gray-900 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <div className='h-3 m-4 w-[40%] bg-gray-800 rounded-md' />
              <div className='h-3 m-4 w-[30%] bg-gray-800 rounded-md' />
            </div>
            <div className='h-[70%] m-4 w-[95%] bg-gray-800/50  animate-pulse   rounded-md' />
          </div>
        </div>
        <div
          className={`w-full lg:w-[40%] bg-gray-900 rounded-md animate-pulse`}
          style={{ height: "300px" }}>
          <div className='h-full w-full flex flex-col justify-between'>
            <div className='w-full h-[30%]'>
              <div className='h-3 m-4 w-[40%] bg-gray-800 rounded-md' />
              <div className='h-3 m-4 w-[30%] bg-gray-800 rounded-md' />
            </div>
            <div className='h-[70%] m-4 w-[95%] bg-gray-800/50  animate-pulse   rounded-md' />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Report
