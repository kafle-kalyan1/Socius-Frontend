import React, { useContext } from 'react'
import { MenuContext } from '../../context/MenuContext/MenuContext'
import Sidebar from './Sidebar'
import Button  from '/src/components/Button/Button';
import { ThemeContext } from '../../context/ThemeContext/Index';
import { Select, Switch } from 'antd';
import { useThemeDetector } from '../../Library/Others/Others';

const GeneralSettings = () => {
   const { isDarkTheme,toggleTheme } = useContext(ThemeContext);
   const auto_theme = useThemeDetector();

   const setDarkOrNot = (value) => {
      if(value == 'dark' && !isDarkTheme ) {
         toggleTheme();
      }
      else if(value == 'light' && isDarkTheme) {
         toggleTheme();
      }
      else if(value == 'auto') {
         if(auto_theme && !isDarkTheme) {
            toggleTheme();
         }
         else  if(!auto_theme && isDarkTheme) {
            toggleTheme();
         }
      }
   }
   
  return (
   <div className={`flex w-full font-primary_font justify-center items-center  m-auto overflow-auto max-sm:w-full mt-0`}>
   <div className={`flex justify-left w-full m-auto flex-wrap gap-10  mb-20 `}>

  <div className='w-52 max-md:w-40 h-screen fixed'>
      <Sidebar />
      </div>
   
      
      <div className='flex flex-col border-2 justify-center items-center w-full text-center  text-text1 dark:text-text2 mt-8 ml-56 max-md:ml-0'>
      <span className="w-full justify-center items-center text-3xl text-center">General Settings</span>
      <hr className='text-text1 dark:text-text2 dark:bg-cardBg bg-darkcardBg w-1/3'/>


      <div className=' p-6 w-1/3 flex justify-around'>
         <p>Theme</p>
         <Select
         defaultValue={isDarkTheme ? 'dark' : 'light' }
         style={{ width: 120 }}
         options={[
            { label: 'Dark', value: 'dark' },
            { label: 'Light', value: 'light' },
            { label: 'Auto', value: 'auto' },
         ]}
         onChange={(value) => setDarkOrNot(value)}
         />
         </div>
      <div className='p-6 w-1/3 flex justify-around'>

         <p>Langauge</p>
         <Select
         defaultValue="english"
         style={{ width: 120 }}
         options={[
            { label: 'English', value: 'english',disabled: false},
            {label:'Nepali', value: 'nepali',disabled: true},
            { label: 'Spanish', value: 'spanish',disabled: true},
            { label: 'Hindi', value: 'hindi',disabled: true},
         ]}
         />

      </div>

      
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