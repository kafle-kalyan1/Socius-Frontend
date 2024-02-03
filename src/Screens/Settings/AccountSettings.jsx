import React, { useContext } from 'react'
import Sidebar from './Sidebar'
import { MenuContext } from '/src/context/MenuContext/MenuContext';

const AccountSettings = () => {
   const {isMobile} = useContext(MenuContext)

  return (
   <div className={`flex ${!isMobile ? " ml-8" : "ml-0"} scroll-bar`}>
   <div className={`block lg:ml-[14%] w-4/6 h-screen font-primary_font gap-5  max-lg:w-full max-lg:m-0 m-auto max-sm:w-full`}>
      <div className='w-52 h-screen fixed'>
      <Sidebar />

      </div>
      <div className='mt-8 ml-64'>
asd
      </div>
      </div>
      </div>  )
}

export default AccountSettings