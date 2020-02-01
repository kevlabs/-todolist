import React, { useContext, useCallback } from 'react';
import { ActionMenuContext } from './ActionMenu'

export default function ActionMenuItem({ onClick, children }) {

  // retrieve toggle open menu fn from parent ActionMenu context
  const toggleIsOpen = useContext(ActionMenuContext);

  const handleClick = useCallback((e) => {
    e.preventDefault();

    // close menu only if item is clickable (i.e. has onClick prop)
    if (onClick) {
      toggleIsOpen(e);
      onClick(e);
    }
  }, [onClick, toggleIsOpen])
  
  return (
    <li onClick={handleClick} title={children} className={onClick && 'clickable'}>
      {children}
    </li>

  );

}