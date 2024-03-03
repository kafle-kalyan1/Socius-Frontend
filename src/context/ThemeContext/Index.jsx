import React, { createContext, useEffect, useState } from 'react';
import APICall from '../../Library/API/APICall';
import { useThemeDetector } from '../../Library/Others/Others';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   // State to track the theme
   const [isDarkTheme, setIsDarkTheme] = useState(false);
   const auto_theme = useThemeDetector();

   useEffect(() => {
      document.documentElement.className = isDarkTheme ? 'dark' : '';
   }, [isDarkTheme]);

   useEffect(() => {
      getSetting()
   }, [])

   const getSetting = async () => {
      let response = await APICall("/api/utils/getSettings/", "GET", {})
      if (response.status === 200) {
         setDarkOrNot(response.data.dark_mode)

      }
   }

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

   // Function to toggle the theme
   const toggleTheme = () => {
      setIsDarkTheme(!isDarkTheme);
   };

   // Determine the background color based on the theme
   const backgroundColor = isDarkTheme ? '#000000' : '#ffffff';

   // Determine the primary color based on the theme
   const primaryColor = isDarkTheme ? '#ffffff' : '#000000';

   // Create the context value
   const themeContextValue = {
      isDarkTheme,
      toggleTheme,
      backgroundColor,
      primaryColor
   };

   // Render the provider with the context value
   return (
      <ThemeContext.Provider value={themeContextValue}>
         {children}
      </ThemeContext.Provider>
   );
};