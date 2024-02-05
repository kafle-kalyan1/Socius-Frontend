import React, { useContext } from 'react'
import { MenuContext } from '../../context/MenuContext/MenuContext'
import Sidebar from './Sidebar'
import Button  from '/src/components/Button/Button';
import { ThemeContext } from '../../context/ThemeContext/Index';
import { Switch } from 'antd';

const GeneralSettings = () => {
   const { isDarkTheme,toggleTheme } = useContext(ThemeContext);
  return (
   <div className={`flex w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-5 dark:bg-slate-600`}>
   <div className={`flex justify-left w-full m-auto flex-wrap gap-10  mb-20 dark:bg-slate-600`}>

  <div className='w-52 max-md:w-40 h-screen fixed'>
      <Sidebar />
      </div>
   
      
      <div className='flex w-full text-center mt-8 ml-56 max-md:ml-0'>
      <span className="w-full flex justify-center text-3xl text-center">General Settings</span>

      <Switch
      checked={isDarkTheme}
      onChange={() => toggleTheme()}
      />
      
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