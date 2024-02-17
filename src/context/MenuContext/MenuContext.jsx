
import React, { createContext, useEffect, useLayoutEffect, useState } from 'react';

const MenuContext = createContext();

const MenuContextProvider = ({ children }) => {
  const [open, setOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useLayoutEffect(() => {
    function updateSize() {
      if (window.innerWidth <= 768) {
        setIsMobile(true);
      } else {
        setIsMobile(false);
      
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
