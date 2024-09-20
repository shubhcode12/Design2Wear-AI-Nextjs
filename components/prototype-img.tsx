import React from 'react'

function PrototypeImg() {
  return (
    <div className='flex-col justify-center items-center mx-auto relative hidden lg:block mb-32'>
        <img src="/linear-bg.svg" className='absolute inset-0 z-0 bg-transparent' alt="" />
        <img src="/aimockup-black.png" className='border-2 border-gray-500 rounded-2xl max-w-[1000px] z-10 relative mt-20 top-[200px]' alt="" />
    </div>
  )
}

export default PrototypeImg