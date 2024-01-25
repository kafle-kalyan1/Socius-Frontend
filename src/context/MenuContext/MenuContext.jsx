
import React, { createContext, useLayoutEffect, useState } from 'react';

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    console.log(window.innerWidth);
    function updateSize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
        console.log(open);
        if(open){
          setOpen(false);
        }
      } else {
        setIsMobile(false);
        if(!open){
          setOpen(true);
        }
      }
    }
    window.addEventListener('resize', updateSize);
    updateSize();
    return () => window.removeEventListener('resize', updateSize);
  });

  return (
    <MenuContext.Provider value={{ open, setOpen, isMobile, setIsMobile, }}>
      {children}
    </MenuContext.Provider>
  );
};

export { MenuContext, MenuContextProvider };
