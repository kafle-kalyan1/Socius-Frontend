import React, { useContext } from 'react'
import { MenuContext } from '../../context/MenuContext/MenuContext'
import Sidebar from './Sidebar'
import Button  from '/src/components/Button/Button';

const GeneralSettings = () => {
   const {isMobile} = useContext(MenuContext)
  return (
   <div className={`flex w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-5`}>
   <div className={`flex justify-left w-full m-auto flex-wrap gap-10  mb-20`}>
      <div className='w-52 max-md:w-40 h-screen fixed'>
      <Sidebar />

      </div>
      <div className='mt-8 ml-56 max-md:ml-48'>
      <span className="w-full flex justify-center text-3xl text-center">General Settings</span>

      
      
      </div>         
         <div className=' flex gap-3 fixed bottom-16 right-4'>
         <Button
         type='primary'
         text='Save'
         width='24'
         />

         </div>

      </div>
      </div>
   )
}

export default GeneralSettings