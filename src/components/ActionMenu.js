import React, { useState, useCallback, useEffect, createContext } from 'react';

export const ActionMenuContext = createContext((e) => e.preventDefault());

export default function ActionMenu({ classNamePrefix, children }) {

  // control action menu open state
  const [isOpen, setIsOpen] = useState(false);

  // stop propagation of clicks (used on menu so that window click when the current target is the menu do not close the menu)
  const preventWindowClick = useCallback((e) => {
    console.log('PREVENT WINDOW');
    
    e.preventDefault();
    e.stopPropagation();
  }, []);

  // open/close menu
  const toggleIsOpen = useCallback((e) => {
    e.preventDefault();

    // make sure click event is only handled once
    isOpen && e.stopPropagation();

    setIsOpen((prev) => !prev);
  }, [isOpen]);

  // set up effect so that menu closes when user clicks anywhere on window
  useEffect(() => {
    if (isOpen) {
      window.addEventListener('click', toggleIsOpen);
    } else {
      window.removeEventListener('click', toggleIsOpen);
    }

    // cleanup
    return () => window.removeEventListener('click', toggleIsOpen);

  }, [isOpen, toggleIsOpen]);
  
  return (
    <>
      <div className={`${classNamePrefix}action${isOpen ? ` ${classNamePrefix}action--selected` : ''}`} onClick={toggleIsOpen}>
        {isOpen ? 'X' : '...'}
      </div>
      { isOpen &&  <ul className={`${classNamePrefix}action-menu`} onClick={preventWindowClick}>
        <ActionMenuContext.Provider value={toggleIsOpen}>
          {children}
        </ActionMenuContext.Provider>
      </ul>}
    </>

  );

}