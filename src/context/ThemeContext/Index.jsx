import React, { createContext, useEffect, useState } from 'react';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
   // State to track the theme
   const [isDarkTheme, setIsDarkTheme] = useState(false);

   useEffect(() => {
      document.documentElement.className = isDarkTheme ? 'dark' : '';
   }, [isDarkTheme]);

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