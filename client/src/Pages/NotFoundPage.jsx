import React from 'react'
import notFoundImage from "../assets/notfound.jpg"

const NotFoundPage = () => {
  return (
    <div className='bg-[#E9FCFF] min-h-screen flex justify-center items-center'>
     <div className='flex flex-col items-center gap-2'>
      <img className='rounded-2xl w-96' src={notFoundImage} alt="404_Image" />
      <h1 className='font-black text-8xl text-opacity-60 text-cyan-500' >Page Not Found</h1>
      <button className='bg-cyan-900 px-6 border rounded-lg py-3 text-lg text-white font-medium mt-5'></button>
     </div>
    </div>
  )
}

export default NotFoundPage